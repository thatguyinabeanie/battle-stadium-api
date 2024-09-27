require "rails_helper"

RSpec.describe Tournaments::Player do
  describe "associations" do
    it { is_expected.to belong_to(:profile).class_name("Profile").optional(false).validate(true) }
    it { is_expected.to belong_to(:tournament).class_name("Tournaments::Tournament").inverse_of(:players) }
    it { is_expected.to belong_to(:pokemon_team).class_name("PokemonTeam").optional(true) }
  end

  describe "validations" do
    subject { create(:player) }

    it { is_expected.to validate_presence_of(:profile_id) }

    it { is_expected.to validate_presence_of(:tournament_id) }

    describe "custom validations" do
      it "validates case-sensitive uniqueness of user_id within the scope of tournament_id" do
        profile = create(:profile)
        existing_player = create(:player, profile:)
        new_player = build(:player, profile_id: profile.id.upcase, tournament: existing_player.tournament)
        new_player.valid?
        expect(new_player.errors[:profile_id]).to include(I18n.t("tournament.registration.already_registered"))
      end
    end
  end

  describe "nested attributes" do
    it { is_expected.to accept_nested_attributes_for(:pokemon_team) }
  end

  describe "delegations" do
    it { is_expected.to delegate_method(:username).to(:profile) }
  end

  describe "#checked_in?" do
    subject(:player) { described_class.new(tournament:, profile:) }

    let(:profile) { create(:profile) }
    let(:tournament) { create(:tournament, start_at: 1.hour.from_now, check_in_start_at: 1.hour.ago) }

    it "returns true if checked_in_at is present" do
      player.check_in!
      expect(player.checked_in?).to be true
    end

    it "returns false if checked_in_at is not present" do
      expect(player.checked_in?).to be false
    end
  end
end
