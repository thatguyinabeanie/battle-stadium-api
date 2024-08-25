module Helpers
  module JWT
    class TokenHandler
      def jwt_payload!(request)
        return nil if request.headers['Authorization'].blank?

        decode!(request.headers['Authorization'].split.last)
      end

      def jwt_secret_key
        current_env = Rails.env

        # Fetch the credentials for the current environment
        credentials = Rails.application.credentials[current_env.to_sym]

        # Access the secret_key_base and jwt_secret_key
        credentials.dig(:devise, :jwt_secret_key) || ENV.fetch('DEVISE_JWT_SECRET_KEY', nil)
      end

      def decode!(token)
        # Get the current Rails environment
        JWT.decode(token, jwt_secret_key, true, { algorithm: 'HS256' })
      rescue JWT::DecodeError => e
        Rails.logger.error "JWT::DecodeError: #{e.message}"
        raise
      end
    end
  end
end
