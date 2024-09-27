require "rails_helper"

RSpec.describe ChatMessage do
  describe "validations" do

    let(:match_hash) do
      player_one = create(:player)
      player_two = create(:player)
      organization = create(:organization)
      organization.staff << create(:user)
      tournament = create(:tournament, organization:)
      phase = create(:swiss_phase, tournament:)
      round = create(:round, phase:)
      match = create(:match, round:, player_one:, player_two:)
      match_game = create(:match_game, match:)
      { match_game:, tournament:, organization:, match:, phase:, round:, player_one: match.player_one, player_two: match.player_two,
        staff_member: organization.staff.first }
    end

    let(:profile_id) { match_hash[:player_one].profile.id }
    let(:match_id) { match_hash[:match].id }

    it "is valid with valid attributes" do
      chat_message = described_class.new(content: "Hello", profile_id:, match_id:)
      expect(chat_message).to be_valid
    end

    it "is not valid without content" do
      chat_message = described_class.new(content: nil, profile_id:, match_id:)
      expect(chat_message).not_to be_valid
    end

    it "is not valid without a user_id" do
      chat_message = described_class.new(content: "Hello", profile_id: nil, match_id:)
      expect(chat_message).not_to be_valid
    end

    it "is not valid without a match_id" do
      chat_message = described_class.new(content: "Hello", profile_id:, match_id: nil)
      expect(chat_message).not_to be_valid
    end
  end

  describe "associations" do
    it { is_expected.to belong_to(:profile).class_name("Profile").optional(false).validate(true) }
    it { is_expected.to delegate_method(:user).to(:profile) }
    it { is_expected.to belong_to(:match).class_name("Tournaments::Match").optional(false).validate(true) }
    it { is_expected.to validate_presence_of(:content) }
  end
end
