# spec/support/clerk_sdk_mock.rb

module ClerkSdkMock
  extend ActiveSupport::Concern

  included do
    let(:clerk_sdk_instance) { instance_double(Clerk::SDK) }
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
        allow(Clerk::SDK).to receive(:new).and_return(clerk_sdk_instance)
        allow(clerk_sdk_instance).to receive_messages(verify_token: session, decode_token: session)
      end
    end
  end
end
