# backend/lib/auth/cookies/signature_test.rb
require "rails_helper"
require "openssl"
require "cgi"
require_relative "../../../../lib/auth/cookies/signature"

RSpec.describe Auth::Cookies::Signature do
  it "raises cookie missing error when cookie is nil" do
    expect {
      described_class.verify(cookie: nil)
    }.to raise_error(Auth::Cookies::Signature::CookieMissingError)
  end

  it "raises invalid cookie error when cookie does not include dot" do
    expect {
      described_class.verify(cookie: "invalidcookie")
    }.to raise_error(Auth::Cookies::Signature::InvalidCookieError)
  end

  it "raises InvalidCookieError when value is empty" do
    expect {
      described_class.verify(cookie: ".signature")
    }.to raise_error(Auth::Cookies::Signature::InvalidCookieError)
  end

  it "raises InvalidCookieError when signature is empty" do
    expect {
      described_class.verify(cookie: "value.")
    }.to raise_error(Auth::Cookies::Signature::InvalidCookieError)

  end

  it "returns value when signature matches" do
    value = "test.value"
    signature = OpenSSL::HMAC.hexdigest("SHA256", ENV["AUTH_SECRET"], value)
    encoded_value = CGI.escape(value).gsub(".", "%2E")
    cookie = "#{encoded_value}.#{signature}"

    expect(described_class.verify(cookie:)).to eq(value)
  end

  it "raises InvalidSignatureError when signature does not match" do
    value = "test.value"
    signature = "invalid_signature"
    encoded_value = CGI.escape(value).gsub(".", "%2E")
    cookie = "#{encoded_value}.#{signature}"

    expect {
      described_class.verify(cookie:)
    }.to raise_error(Auth::Cookies::Signature::InvalidSignatureError)
  end
end
