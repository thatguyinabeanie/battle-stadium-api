require "rails_helper"

RSpec.describe Auth::Vercel::TokenVerifier do
  let(:request) { instance_double(ActionDispatch::Request, headers: { "X-Vercel-OIDC-Token" => token }, host: "example.com") }
  let(:token) { "valid.jwt.token" }
  let(:jwks_url) { "https://example.com/.well-known/jwks.json" }
  let(:jwks_response) { { keys: [] }.to_json }
  let(:jwks) { JSON.parse(jwks_response) }

  before do
    allow(ENV).to receive(:[]).with("JWKS_URL").and_return(jwks_url)
    allow(ENV).to receive(:[]).with("ISSUER").and_return("https://example.com/")
    allow(ENV).to receive(:[]).with("AUDIENCE").and_return("TEST_AUDIENCE")
    allow(ENV).to receive(:[]).with("SUBJECT").and_return("your_subject")
    response = instance_double(Net::HTTPResponse, is_a?: true, body: jwks_response)
    allow(Net::HTTP).to receive(:get_response).and_return(response)
  end

  describe ".verify" do
    context "when the token is missing" do
      let(:token) { nil }

      it "raises NoAuthorizationHeader error" do
        expect { described_class.verify(request:) }.to raise_error(Auth::Vercel::TokenVerifier::NoAuthorizationHeader)
      end
    end

    context "when the token is present" do
      it "calls verify_token" do
        allow(described_class).to receive(:verify_token).with(token:, request:)
        described_class.verify(request:)
        expect(described_class).to have_received(:verify_token).with(token:, request:)
      end
    end
  end

  describe ".verify_token" do
    context "when the token is invalid" do
      let(:token) { "invalid.jwt.token" }

      it "raises a JWT::DecodeError" do
        expect { described_class.verify_token(token:, request:) }.to raise_error(RuntimeError, /Unauthorized: Failed Vercel OIDC Authentication/)
      end
    end

    context "when the token is valid" do
      let(:token) { "valid.jwt.token" }
      let(:decoded_token) { [{ "sub" => "your_subject" }, { "alg" => "RS256" }] }

      before do
        allow(JWT).to receive(:decode).and_return(decoded_token)
      end

      it "returns the decoded token" do
        result = described_class.verify_token(token:, request:)
        expect(result).to eq(decoded_token)
      end
    end
  end

  describe ".fetch_jwks" do
    context "when the JWKS cache is empty" do
      before do
        described_class.instance_variable_set(:@jwks_cache, nil)
      end

      it "fetches the JWKS from the URL and caches it" do
        result = described_class.send(:fetch_jwks)
        expect(result).to eq(jwks)
        expect(described_class.instance_variable_get(:@jwks_cache)).to eq(jwks)
      end
    end

    context "when the JWKS cache is not empty" do
      before do
        described_class.instance_variable_set(:@jwks_cache, jwks)
      end

      it "returns the cached JWKS" do
        result = described_class.send(:fetch_jwks)
        expect(result).to eq(jwks)
      end
    end
  end
end
