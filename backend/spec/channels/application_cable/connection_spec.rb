require "rails_helper"

module ApplicationCable
  RSpec.describe Connection do
    let(:user) { create(:user) }
    let(:clerk_user) { create(:clerk_user, user:) }
    let(:cookies) { { userId: Auth::Cookies::Signature.sign(cookie: clerk_user.clerk_user_id) } }

    before do
      # Stub the cookies method directly on the connection object
      allow(connection).to receive(:cookies).and_return(cookies)
    end

    it "successfully connects with a verified user" do
      connect "/cable"

      expect(connection.current_user).to eq(user)
    end
  end
end
