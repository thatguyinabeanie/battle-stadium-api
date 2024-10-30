# spec/support/auth/token_verifier_mock.rb
require_relative "../../../lib/auth/clerk/token_verifier"
require_relative "../../../lib/auth/vercel/token_verifier"

module Auth
  module TokenVerifier
    module Mock
      extend ActiveSupport::Concern

      included do

        let(:request_account) { create(:account) }
        let(:Authorization) { "Bearer #{SecureRandom.alphanumeric(25)}" }
        let("X-Vercel-OIDC-Token") { SecureRandom.alphanumeric(25) }

        shared_context "with Request Specs - Vercel OIDC Token Verification" do
          before do
            allow_vercel_token_verification
          end
        end

        shared_context "with Request Specs - Clerk JWT + Vercel OIDC Token Verification" do
          before do
            allow_vercel_token_verification
            allow_clerk_token_verification
          end
        end

        shared_context "with Controller Specs - Clerk JWT + Vercel OIDC Token Verification" do
          before do
            allow_vercel_token_verification
            allow_clerk_token_verification
            request.headers["Authorization"] = "Bearer #{SecureRandom.alphanumeric(25)}"
            request.headers["X-Vercel-OIDC-Token"] = SecureRandom.alphanumeric(25)

          end
        end

        def session_data(request_account)
          {
            "userId" => request_account.clerk_users.first&.clerk_user_id,
            "email" => request_account.email,
            "username" => request_account.username,
            "firstName" => request_account.first_name,
            "lastName" => request_account.last_name,
            "imageUrl" => request_account.image_url,
          }
        end

        def allow_vercel_token_verification
          allow(Auth::Vercel::TokenVerifier)
            .to receive(:verify_token)
            .and_return(true)
        end

        def allow_clerk_token_verification
          allow(Auth::Clerk::TokenVerifier)
            .to receive(:verify_token)
            .and_return(session_data(request_account))
        end
      end
    end
  end
end
