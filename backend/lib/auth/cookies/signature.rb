# lib/auth/cookies/signature.rb
require "openssl"
require "cgi"

module Auth
  module Cookies
    module Signature
      AUTH_SECRET = ENV.fetch("AUTH_SECRET") { raise "AUTH_SECRET must be set for cookie verification!" }
      class InvalidCookieError < StandardError; end
      class CookieMissingError < StandardError; end
      class InvalidSignatureError < StandardError; end

      class << self
        def verify(cookie:)
          Rails.logger.info("Verifying cookie: #{cookie}")
          raise Auth::Cookies::Signature::CookieMissingError, "Cookie is missing" unless cookie
          raise Auth::Cookies::Signature::InvalidCookieError, "Cookie does not include a '.'" unless cookie.include?(".")

          value, signature =  cookie.split(".")
          Rails.logger.info("\n\n*****\nCookie value: #{value} - Signature: #{signature}\n*****\n\n")
          errors = []
          errors << "Missing cookie value" unless value.present?
          errors << "Missing cookie signature" unless signature.present?
          raise Auth::Cookies::Signature::InvalidCookieError, errors.join(", ") if errors.any?

          value = CGI.unescape(value).gsub("%2E", ".")
          expected_signature = OpenSSL::HMAC.hexdigest("SHA256", AUTH_SECRET, value)

          if signature == expected_signature
            Rails.logger.info("Signature matches expected signature")
            value
          else
            raise Auth::Cookies::Signature::InvalidSignatureError, "Signature does not match expected signature"
          end
        end
      end
    end
  end
end
