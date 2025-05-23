require "rails_helper"

RSpec.describe Auth::Clerk::Session do
  describe ".authenticate!" do
    let(:request) { instance_double(ActionDispatch::Request) }
    let(:session_data) do
      {
        "userId" => "123",
        "email" => "test@example.com",
        "username" => "testuser",
        "firstName" => "Test",
        "lastName" => "User"
      }
    end

    before do
      allow(Auth::Clerk::TokenVerifier).to receive(:verify).with(request:).and_return(session_data)
    end

    context "when session token is valid" do
      it "returns the existing account if clerk_user exists" do
        account = create(:account)
        create(:clerk_user, clerk_user_id: session_data["userId"], account:)

        result = described_class.authenticate!(request:)

        expect(result).to eq(account)
      end

      it "creates a new account if clerk_user does not exist" do
        expect {
          described_class.authenticate!(request:)
        }.to change(Account, :count).by(1).and change(ClerkUser, :count).by(1)

        account = Account.last
        expect(account.email).to eq(session_data["email"])
        expect(account.username).to eq(session_data["username"])
        expect(account.first_name).to eq(session_data["firstName"])
        expect(account.last_name).to eq(session_data["lastName"])
      end
    end

    context "when session token is invalid" do
      it "raises an error if session is nil" do
        allow(Auth::Clerk::TokenVerifier).to receive(:verify).with(request:).and_return(nil)

        expect {
          described_class.authenticate!(request:)
        }.to raise_error(Auth::Clerk::TokenVerifier::InvalidSessionToken, "Invalid session token. Missing attributes.")
      end

      it "raises an error if required attributes are missing" do
        session_data.delete("email")

        expect {
          described_class.authenticate!(request:)
        }.to raise_error(Auth::Clerk::TokenVerifier::InvalidSessionToken, "Invalid session token. Missing attributes: email.")
      end
    end
  end
end
