require "rails_helper"

RSpec.describe Auth::Clerk::Webhook do
  let(:secret) { "whsec_testsecret" }
  let(:payload) { { "test" => "data" }.to_json }
  let(:timestamp) { Time.current.to_i.to_s }
  let(:svix_id) { "test_id" }
  let(:signature) do
    signed_payload = "#{svix_id}.#{timestamp}.#{payload}"
    secret_bytes = Base64.decode64(secret.sub(/^whsec_/, ""))
    calculated_signature = Base64.strict_encode64(OpenSSL::HMAC.digest("sha256", secret_bytes, signed_payload))
    "v1,#{calculated_signature}"
  end
  let(:headers) do
    {
      "HTTP_SVIX_ID" => svix_id,
      "HTTP_SVIX_TIMESTAMP" => timestamp,
      "HTTP_SVIX_SIGNATURE" => signature
    }
  end
  let(:request) {  instance_double(ActionDispatch::Request, raw_post: payload, headers:) }

  before do
    allow(ENV).to receive(:[]).with("CLERK_WEBHOOK_SECRET").and_return(secret)
  end

  describe ".validate!" do
    context "when the request is valid" do
      it "returns the parsed payload" do
        result = described_class.validate!(request:)
        expect(result).to eq(JSON.parse(payload))
      end
    end

    context "when the timestamp is invalid" do
      let(:timestamp) { (Time.current.to_i - 600).to_s } # 10 minutes ago

      it "raises an error" do
        expect { described_class.validate!(request:) }.to raise_error("Webhook timestamp is outside of the tolerance zone")
      end
    end

    context "when the signature is invalid" do
      let(:signature) { "v1,invalid_signature" }

      it "raises an error" do
        expect { described_class.validate!(request:) }.to raise_error("No matching signature found")
      end
    end

    context "when required headers are missing" do
      let(:headers) { {} }

      it "raises an error" do
        expect { described_class.validate!(request:) }.to raise_error("Missing required headers")
      end
    end

    context "when the secret is missing" do
      before do
        allow(ENV).to receive(:[]).with("CLERK_WEBHOOK_SECRET").and_return(nil)
      end

      it "raises an error" do
        expect { described_class.validate!(request:) }.to raise_error("Missing CLERK_WEBHOOK_SECRET environment variable")
      end
    end
  end
end
