require "rails_helper"

RSpec.describe Auth::Clerk::TokenVerifier do
  let(:valid_token) { "valid.jwt.token" }
  let(:invalid_token) { "invalid.jwt.token" }
  let(:expired_token) { "expired.jwt.token" }
  let(:request) { instance_double(ActionDispatch::Request, headers: { "Authorization" => "Bearer #{valid_token}" }) }


  before do
    allow(ENV).to receive(:fetch).with("CLERK_SECRET_KEY").and_return("test_clerk_secret_key")
    allow(ENV).to receive(:fetch).with("CLERK_FRONTEND_API").and_return("https://clerk.example.com")
    allow(ENV).to receive(:fetch).with("CLERK_FRONTEND_API_DEV").and_return("https://clerk.dev.example.com")
  end

  describe ".verify" do
    context "when the authorization header is missing" do
      let(:request) {  instance_double(ActionDispatch::Request, headers: {}) }

      it "raises NoAuthorizationHeader error" do
        expect { described_class.verify(request:) }.to raise_error(Auth::Clerk::TokenVerifier::NoAuthorizationHeader)
      end
    end

    context "when the token is valid" do
      it "returns the claims" do
        allow(described_class).to receive(:verify_token).with(session_token: valid_token).and_return({ "sub" => "user_id" })
        claims = described_class.verify(request:)
        expect(claims).to eq({ "sub" => "user_id" })
      end
    end
  end

  describe ".verify_token" do
    before do
      allow(described_class).to receive(:fetch_jwks).and_return({ "keys" => [] })
    end

    context "when the token is invalid" do
      it "raises InvalidSessionToken error" do
        expect { described_class.verify_token(session_token: invalid_token) }.to raise_error(Auth::Clerk::TokenVerifier::InvalidSessionToken)
      end
    end

    context "when the token is expired" do
      it "raises VerificationError" do
        allow(JWT).to receive(:decode).and_return([{ "exp" => Time.now.to_i - 10 }])
        expect { described_class.verify_token(session_token: expired_token) }.to raise_error(Auth::Clerk::TokenVerifier::VerificationError, /Token has expired/)
      end
    end
  end
end
