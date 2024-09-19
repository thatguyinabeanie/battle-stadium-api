# spec/support/auth/token_verifier_mock.rb
require_relative "../../../lib/auth/clerk/token_verifier"
require_relative "../../../lib/auth/vercel/token_verifier"

module Auth
  module TokenVerifier
    module Mock
      extend ActiveSupport::Concern

      included do

        let(:Authorization) { "Bearer #{SecureRandom.alphanumeric(25)}, Bearer #{SecureRandom.alphanumeric(25)}" }

        def session_data(request_user)
          {
            "userId" => request_user.clerk_users.first&.clerk_user_id,
            "email" => request_user.email,
            "username" => request_user.username,
            "firstName" => request_user.first_name,
            "lastName" => request_user.last_name,
            "imageUrl" => request_user.image_url,
          }
        end

        shared_context "with Clerk JWT + Vercel OIDC Token Verification" do
          before do
            allow(Auth::Vercel::TokenVerifier)
              .to receive(:verify_token)
              .and_return(true)

            allow(Auth::Clerk::TokenVerifier)
              .to receive(:verify_token)
              .and_return(session_data(request_user))
          end
        end
      end
    end
  end
end
