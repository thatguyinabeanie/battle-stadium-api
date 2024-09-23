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

  describe ".subject_environment" do
    context "when in production environment" do
      before { allow(Rails).to receive(:env).and_return(ActiveSupport::StringInquirer.new("production")) }

      it "returns production subject" do
        expect(described_class.subject_environment(request:)).to eq("your_subject:production")
      end

      context "when in preview environment" do
        let(:request) { instance_double(ActionDispatch::Request, host: "battle-stadium-preview-thatguyinabeanie.vercel.app") }

        it "returns preview subject" do
          expect(described_class.subject_environment(request:)).to eq("preview")
        end
      end
    end

    context "when not in production environment" do
      before { allow(Rails).to receive(:env).and_return(ActiveSupport::StringInquirer.new("development")) }

      it "returns development" do
        expect(described_class.subject_environment(request:)).to eq("development")
      end
    end
  end
end
