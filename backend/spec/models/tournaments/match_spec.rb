require "rails_helper"

RSpec.describe Tournaments::Match do
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

  let(:match) { match_hash[:match] }
  let(:player_one) { match_hash[:player_one] }
  let(:player_two) { match_hash[:player_two] }

  describe "associations" do
    it { is_expected.to belong_to(:round).class_name("Tournaments::Round") }
    it { is_expected.to belong_to(:player_one).class_name("Tournaments::Player") }
    it { is_expected.to belong_to(:player_two).class_name("Tournaments::Player") }
    # Add other associations here
  end

  describe "validations" do
    it "is valid with valid attributes" do
      expect(match).to be_valid
    end

    it "is not valid without a round" do
      match.round = nil
      expect(match).not_to be_valid
    end

    # Add other validations here
  end

  describe "#check_in(player:)" do
    it "raises an error if the player is not part of the match" do
      expect { match.check_in(player: create(:user)) }.to raise_error(ArgumentError)
    end

    # Player One
    it "does not check in player one by default" do
      expect(match.player_one_check_in).to be_nil
    end

    it "checks in player_one" do
      match.check_in(player: player_one)
      expect(match.player_one_check_in).not_to be_nil
    end

    it "checks in player_one does not check in player two" do
      match.check_in(player: player_one)
      expect(match.player_two_check_in).to be_nil
    end

    # Player Two

    it "does not check in player two by default" do
      expect(match.player_two_check_in).to be_nil
    end

    it "checks in player_two" do
      match.check_in(player: player_two)
      expect(match.player_two_check_in).not_to be_nil
    end

    it "checking in player_two does not check in player one" do
      match.check_in(player: player_two)
      expect(match.player_one_check_in).to be_nil
    end
  end

  describe "match reporting" do
    # Example: Testing a method that determines the winner
    describe "#report_winner!" do
      it "correctly identifies the winner" do
        # Assuming there's a method to set a match's outcome
        match.report_winner!(player: player_one, reporter: player_one)
        expect(match.winner).to eq(player_one)
      end

      it "correctly identifies the loser" do
        match.report_winner!(player: player_one, reporter: player_one)
        expect(match.loser).to eq(player_two)
      end
    end

    describe "report_loser!" do
      it "correctly identifies the winner" do
        # Assuming there's a method to set a match's outcome
        match.report_loser!(player: player_one, reporter: player_one)
        expect(match.winner).to eq(player_two)
      end

      it "correctly identifies the loser" do
        match.report_loser!(player: player_one, reporter: player_one)
        expect(match.loser).to eq(player_one)
      end
    end
  end
end
