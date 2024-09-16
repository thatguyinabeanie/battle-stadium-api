# spec/support/clerk_jwt_token_verifier_mock.rb
require_relative "../../../lib/clerk_jwt/token_verifier"

module ClerkJwt
  module TokenVerifier
    module Mock
      extend ActiveSupport::Concern

      included do
        let(:Authorization) { "Bearer #{SecureRandom.alphanumeric(25)}" }

        def session_data(user)
          {
            "userId" => user.clerk_users.first&.clerk_user_id,
            "email" => user.email,
            "username" => user.username,
            "firstName" => user.first_name,
            "lastName" => user.last_name,
            "imageUrl" => user.image_url,
          }
        end

        shared_context "with Clerk SDK Mock" do
          before do
            session = session_data(request_user)
            allow(ClerkJwt::TokenVerifier).to receive(:verify).and_return(session)
          end
        end
      end
    end
  end
end
