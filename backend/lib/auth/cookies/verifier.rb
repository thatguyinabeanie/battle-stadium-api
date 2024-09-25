# app/utils/cookie_verifier.rb
require "openssl"
require "cgi"

module Auth
  module Cookies
    module CookieVerifier
      SECRET_KEY = ENV.fetch("AUTH_SECRET") { raise "AUTH_SECRET must be set for cookie verification!" }

      def self.verify_signed_cookie(cookie:)

        return nil unless cookie
        return nil unless cookie.include?(".")

        value, signature =  cookie.split(".")
        value = CGI.unescape(value)

        return nil if value.empty? || signature.empty?

        expected_signature = OpenSSL::HMAC.hexdigest("SHA256", SECRET_KEY, value)

        if signature == expected_signature
          Rails.logger.info("Signature matches expected signature")
          value
        else
          nil
        end
      end
    end
  end
end
