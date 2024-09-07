class ClerkPolicy < ApplicationPolicy

  WEBHOOK_TOLERANCE_IN_SECONDS = 300 # 5 minutes


  def initialize(request)
    @request = request
  end

  def webhook_verify?
    verify_webhook(@request, true)
  end


  private

  def verify_webhook(request, should_raise = false)
    payload = request.raw_post

    headers = {
      "svix-id" => request.headers["HTTP_SVIX_ID"],
      "svix-timestamp" => request.headers["HTTP_SVIX_TIMESTAMP"],
      "svix-signature" => request.headers["HTTP_SVIX_SIGNATURE"]
    }

    return request.body.read if verify_timestamp(headers["svix-timestamp"], should_raise) && verify_signature(payload, headers, should_raise)
  end

  def verify_timestamp(timestamp, should_raise = false)
    webhook_timestamp = timestamp.to_i
    current_timestamp = Time.now.to_i

    if (current_timestamp - webhook_timestamp).abs > WEBHOOK_TOLERANCE_IN_SECONDS
      msg = "Webhook timestamp is outside of the tolerance zone"
      Rails.logger.error(msg) unless should_raise
      raise msg if should_raise
      return false
    end

    true
  end

  def verify_signature(payload, headers, should_raise = false)
    secret = ENV["CLERK_WEBHOOK_SECRET"]
    raise "Missing CLERK_WEBHOOK_SECRET environment variable" if secret.nil?

    # Remove 'whsec_' prefix if present
    secret = secret.sub(/^whsec_/, "")

    svix_id = headers["svix-id"]
    svix_timestamp = headers["svix-timestamp"]
    svix_signature = headers["svix-signature"]

    raise "Missing required headers" if svix_id.nil? || svix_timestamp.nil? || svix_signature.nil?

    # Construct the signed payload
    signed_payload = "#{svix_id}.#{svix_timestamp}.#{payload}"

    # Decode the secret
    secret_bytes = Base64.decode64(secret)

    # Calculate the signature
    signature = Base64.strict_encode64(
      OpenSSL::HMAC.digest("sha256", secret_bytes, signed_payload)
    )

    # Verify against all provided signatures
    signatures = svix_signature.split(" ")
    unless signatures.any? { |sig| verify_individual_signature(sig, signature) }
      msg =  "No matching signature found"
      Rails.logger.error(msg) unless should_raise
      raise msg if should_raise
      return false
    end

    true
  end

  def verify_individual_signature(provided_signature, calculated_signature)
    version, signature = provided_signature.split(",", 2)
    return false unless version == "v1"

    secure_compare(signature, calculated_signature)
  end

  def secure_compare(a, b)
    return false if a.empty? || b.empty? || a.bytesize != b.bytesize
    l = a.unpack "C#{a.bytesize}"

    res = 0
    b.each_byte { |byte| res |= byte ^ l.shift }
    res == 0
  end
end
