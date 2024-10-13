require "rails_helper"

module ApplicationCable
  RSpec.describe Connection do
    let(:account) { create(:account) }
    let(:clerk_user) { create(:clerk_user, account:) }
    let(:cookies) { { userId: Auth::Cookies::Signature.sign(cookie: clerk_user.clerk_user_id) } }

    before do
      # Stub the cookies method directly on the connection object
      allow(connection).to receive(:cookies).and_return(cookies)
    end

    it "successfully connects with a verified account" do
      connect "/cable"

      expect(connection.current_account).to eq(account)
    end
  end
end
