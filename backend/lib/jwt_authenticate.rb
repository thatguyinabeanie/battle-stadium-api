class JwtAuthenticate
  def self.jwt_bearer_token(request:)
    # auth_header = request.headers["Authorization"]
    auth_header = nil
  raise ::Auth::Session::InvalidTokenOrExpiredSession, "Missing token" unless auth_header

    token = auth_header.split.last.gsub(/^["']|["']$/, "")
    JsonWebToken.decrypt(token)
  end

  def self.session_from_decrypted_payload(decrypted_payload:)
    session = begin
      if decrypted_payload.is_a?(String)
        jwt = JSON.parse(decrypted_payload)
        sub = jwt["sub"]
        ::Auth::Session.where(user_id: sub).last

      elsif decrypted_payload["session"]
        session_token = decrypted_payload["session"]["sessionToken"]

        ::Auth::Session.find_by!(token: session_token, user_id: decrypted_payload["session"]["user"]["id"])
      elsif decrypted_payload["user"]
        ::Auth::Session.find_by!(user_id: decrypted_payload["user"]["id"])
      else
        raise ::Auth::Session::InvalidTokenOrExpiredSession, "Invalid token or expired session"
      end
    rescue StandardError => e
      raise ::Auth::Session::InvalidTokenOrExpiredSession, e.message
    end

    session = ::Auth::Session.create user_id: sub unless session&.user

    raise ::Auth::Session::InvalidTokenOrExpiredSession, "Invalid token or expired session" unless session&.active?

    session
  end

  def self.session_from_authorization_header(request:)
    decrypted_payload = jwt_bearer_token(request:)
    session_from_decrypted_payload(decrypted_payload:)
  end

  private_class_method :jwt_bearer_token
end
