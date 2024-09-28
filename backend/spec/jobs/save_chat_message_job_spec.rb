require "rails_helper"

RSpec.describe SaveChatMessageJob do
  let(:match) { create(:match) }
  let(:match_id) { match.id }
  let(:user_id) { match.player_one.user.id }
  let(:profile_id) {  match.player_one.profile.id }
  let(:content) { "Hello, world!" }
  let(:sent_at) { Time.current }
  let(:message_type) { "text" }

  describe "#perform" do
    it "creates a new ChatMessage" do
      expect {
        described_class.perform_now(
          match_id:,
          profile_id:,
          content:,
          user_id:,
          sent_at:,
          message_type:
        )
      }.to change(ChatMessage, :count).by(1)
    end

    it "creates a ChatMessage with correct attributes" do
      described_class.perform_now(
        match_id:,
        profile_id:,
        content:,
        user_id:,
        sent_at:,
        message_type:
      )

      chat_message = ChatMessage.last
      expect(chat_message.match_id).to eq(match_id)
      expect(chat_message.profile_id).to eq(profile_id)
      expect(chat_message.content).to eq(content)
      expect(chat_message.user_id).to eq(user_id)
      expect(chat_message.sent_at).to be_within(1.second).of(sent_at)
      expect(chat_message.message_type).to eq(message_type)
    end
  end
end
