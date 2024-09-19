# spec/support/auth/clerk/token_verifier_mock.rb
require_relative "../.././../../lib/auth/clerk/token_verifier"

module Auth
  module Clerk
    module TokenVerifier
      module Mock
        extend ActiveSupport::Concern

        included do
          let(:Authorization) { "Bearer #{SecureRandom.alphanumeric(25)}" }

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

          shared_context "with Clerk SDK Mock" do
            before do
              session = session_data(request_user)
              allow(Auth::Clerk::TokenVerifier).to receive(:verify).and_return(session)
            end
          end
        end
      end
    end
  end
end
