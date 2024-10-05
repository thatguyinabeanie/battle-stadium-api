require "rails_helper"

RSpec.describe Tournaments::MatchGame do
  let(:match_hash) do
    user_one_profile = create(:profile)
    user_two_profile = create(:profile)
    organization = create(:organization)
    organization.staff << create(:user)
    tournament = create(:tournament, organization:)
    player_one = create(:player, profile: user_one_profile, tournament:)
    player_two = create(:player, profile: user_two_profile, tournament:)
    phase = create(:swiss_phase, tournament:)
    round = create(:round, phase:)
    match = create(:match, round:, player_one:, player_two:)
    match_game = create(:match_game, match:)
    { match_game:, tournament:, organization:, match:, phase:, round:, player_one: match.player_one, player_two: match.player_two,
      staff_member: organization.staff.first }
  end

  let(:match_game) { match_hash[:match_game] }
  let(:player_one) { match_hash[:player_one] }
  let(:player_two) { match_hash[:player_two] }

  describe "associations" do
    subject { match_game }

    it { is_expected.to belong_to(:match).class_name("Tournaments::Match") }
    it { is_expected.to belong_to(:winner).class_name("Tournaments::Player").optional }
    it { is_expected.to belong_to(:loser).class_name("Tournaments::Player").optional }
    it { is_expected.to belong_to(:reporter).class_name("Profile").optional }
    it { is_expected.to delegate_method(:player_one).to(:match) }
    it { is_expected.to delegate_method(:player_two).to(:match) }
  end

  describe "validations" do
    let(:cannot_be_black_error) { I18n.t("errors.validation.cannot_be_blank") }

    it "validates presence of :game_number" do
      match_game.game_number = nil
      match_game.valid?(:report!)
      expect(match_game.errors[:game_number]).to include(cannot_be_black_error)
    end

    it "validates presence of :match" do
      match_game.match = nil
      match_game.valid?(:report!)
      expect(match_game.errors[:match]).to include(cannot_be_black_error)
    end

    it "validates presence of :reporter" do
      match_game.ended_at = Time.current.utc
      match_game.winner = player_one
      match_game.valid?(:report!)
      expect(match_game.errors[:reporter]).to include(cannot_be_black_error)
    end

    it "validates presence of :winner" do
      match_game.ended_at = Time.current.utc
      match_game.loser = player_two
      match_game.valid?(:report!)
      expect(match_game.errors[:winner]).to include(cannot_be_black_error)
    end

    it "validates presence of :loser" do
      match_game.ended_at = Time.current.utc
      match_game.winner = player_one
      match_game.valid?(:report!)
      expect(match_game.errors[:loser]).to include(cannot_be_black_error)
    end

    it "validates presence of :ended_at" do
      match_game.winner = player_one
      match_game.valid?(:report!)
      expect(match_game.errors[:ended_at]).to include(cannot_be_black_error)
    end

    it "validates that winner must be either player 1 or player 2" do
      match_game = build(:match_game, winner: create(:player))
      match_game.valid?(:report!)
      expect(match_game.errors[:base]).to include(I18n.t("errors.match_game.winner_must_be_match_player"))
    end

    it "validates that loser must be either player 1 or player 2" do
      match_game = build(:match_game, loser: create(:player))
      match_game.valid?(:report!)
      expect(match_game.errors[:base]).to include(I18n.t("errors.match_game.loser_must_be_match_player"))
    end

    it "validates that winner and loser cannot be the same" do
      match_game = build(:match_game, winner: player_one, loser: player_one)
      match_game.valid?(:report!)
      expect(match_game.errors[:base]).to include(I18n.t("errors.match_game.winner_and_loser_are_the_same"))
    end

    it "validates that winner and loser must be either player 1 or player 2" do
      match_game = build(:match_game, winner: player_one, loser: create(:player))
      match_game.valid?(:report!)
      expect(match_game.errors[:base]).to include(I18n.t("errors.match_game.loser_must_be_match_player"))
    end

    it "does not add any errors when reporter is nil" do
      match_game.reporter = nil
      match_game.send(:reporter_role_validation)
      expect(match_game.errors).to be_empty
    end

    it "does not add any errors when reporter is one of the players" do
      match_game.reporter = match_game.player_one.profile
      match_game.send(:reporter_role_validation)
      expect(match_game.errors).to be_empty
    end

    it "does not add any errors when reporter is a staff member of the tournament organization" do
      match_game.reporter = match_hash[:organization].staff.first.default_profile
      match_game.send(:reporter_role_validation)
      expect(match_game.errors).to be_empty
    end

    it "adds an error when reporter is not a player or staff member" do
      match_game.reporter = create(:profile)
      match_game.send(:reporter_role_validation)
      expect(match_game.errors[:base]).to include(I18n.t("errors.match_game.reporter_must_be_match_player_or_staff"))
    end
  end

  describe "#report!" do
    let(:staff_member) { match_hash[:staff_member] }

    it "reports the game with the winner as the winner" do
      match_game.report!(winner: player_one, loser: player_two, reporter: staff_member)
      expect(match_game.winner).to eq(player_one)
    end

    it "reports the game with the loser as the loser" do
      match_game.report!(winner: player_one, loser: player_two, reporter: staff_member)
      expect(match_game.loser).to eq(player_two)
    end

    it "does not allow a third person to be the winner" do
      expect do
        match_game.report!(winner: create(:player), loser: player_one , reporter: staff_member)
      end.to raise_error(ActiveRecord::RecordInvalid, "Validation failed: #{I18n.t('errors.match_game.winner_must_be_match_player')}")
    end

    it "does not allow a third person to be the loser" do
      expect do
        match_game.report!(winner: player_two, loser: create(:player), reporter: staff_member)
      end.to raise_error(ActiveRecord::RecordInvalid, "Validation failed: #{I18n.t('errors.match_game.loser_must_be_match_player')}")
    end

    it "sets the reporter if the reporter is a tournament staff" do
      match_game.report!(winner: player_one, loser: player_two, reporter: staff_member)
      expect(match_game.reporter).to eq(staff_member.default_profile)
    end

    it "raises an error if the reporter is not a match player or staff member" do
      expect do
        match_game.report!(winner: player_one, loser: player_two, reporter: create(:user))
      end.to raise_error(ActiveRecord::RecordInvalid, "Validation failed: #{I18n.t('errors.match_game.reporter_must_be_match_player_or_staff')}")
    end

    it "sets the ended_at attribute" do
      match_game.report!(winner: player_one, loser: player_two, reporter: staff_member)
      expect(match_game.ended_at).to be_within(10.seconds).of(Time.current.utc)
    end
  end
end
