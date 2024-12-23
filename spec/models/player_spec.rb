require "rails_helper"

RSpec.describe Player do
  describe "associations" do
    it { is_expected.to belong_to(:profile).class_name("Profile").optional(false).validate(true) }
    it { is_expected.to belong_to(:tournament).class_name("Tournament").inverse_of(:players) }
    it { is_expected.to belong_to(:pokemon_team).class_name("PokemonTeam").optional(true) }
  end

  describe "validations" do
    subject { create(:player) }

    it { is_expected.to validate_presence_of(:profile_id) }

    it { is_expected.to validate_presence_of(:tournament_id) }

    it { is_expected.to validate_presence_of(:in_game_name) }

    describe "custom validations" do
      it "validates uniqueness of account_id within the scope of tournament_id" do
        profile = create(:profile)
        existing_player = create(:player, profile:)
        new_player = build(:player, profile_id: profile.id, tournament: existing_player.tournament)
        new_player.valid?
        expect(new_player.errors[:profile_id]).to include(I18n.t("tournament.registration.profile_already_registered"))
      end
    end
  end

  describe "delegations" do
    it { is_expected.to delegate_method(:username).to(:profile) }
  end

  describe "#checked_in?" do
    subject(:player) { create(:player) }

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

  describe "#ready?" do
    subject(:player) { create(:player) }

    context "when player is checked in and has a pokemon team" do
      before do
        player.check_in!
        player.update!(pokemon_team: create(:pokemon_team))
      end

      it "returns true" do
        expect(player.ready?).to be true
      end
    end

    context "when player is not checked in" do
      it "returns false" do
        expect(player.ready?).to be false
      end
    end

    context "when player does not have a pokemon team" do
      before { player.check_in! }

      it "returns false" do
        expect(player.ready?).to be false
      end
    end
  end

  describe ".checked_in_and_submitted_team_sheet" do
    let!(:checked_in_player_with_team) { create(:player, :checked_in, pokemon_team: create(:pokemon_team)) }
    let!(:checked_in_player_without_team) { create(:player, :checked_in) }
    let!(:not_checked_in_player_with_team) { create(:player, pokemon_team: create(:pokemon_team)) }

    it "returns players who are checked in and have a pokemon team" do
      expect(described_class.checked_in_and_submitted_team_sheet).to include(checked_in_player_with_team)
      expect(described_class.checked_in_and_submitted_team_sheet).not_to include(checked_in_player_without_team)
      expect(described_class.checked_in_and_submitted_team_sheet).not_to include(not_checked_in_player_with_team)
    end
  end

  describe "#submit_team!" do
    subject(:player) { create(:player) }

    let(:pokemon_team) { create(:pokemon_team) }

    it "updates the player's pokemon team" do
      player.submit_team!(pokemon_team:)
      expect(player.pokemon_team).to eq(pokemon_team)
    end
  end
end
