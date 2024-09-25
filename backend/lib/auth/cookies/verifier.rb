# app/utils/cookie_verifier.rb
require "openssl"

module Auth
  module Cookies
    module CookieVerifier
      SECRET_KEY = ENV["AUTH_SECRET"]

      def self.verify_signed_cookie(cookie:)
        return nil unless cookie

        value, signature = cookie.split(".")
        expected_signature = OpenSSL::HMAC.hexdigest("SHA256", SECRET_KEY, value)

        if signature == expected_signature
          value
        else
          nil
        end
      end
    end
  end
end
