require "rails_helper"

RSpec.describe Match do
  let(:match_hash) do
    player_one = create(:player)
    player_two = create(:player)
    organization = create(:organization)
    organization.staff << create(:account)
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
    it { is_expected.to belong_to(:round).class_name("Round") }
    it { is_expected.to belong_to(:player_one).class_name("Player").required(true) }
    it { is_expected.to belong_to(:player_two).class_name("Player").optional(true) }
    it { is_expected.to belong_to(:winner).class_name("Player").optional(true) }
    it { is_expected.to belong_to(:loser).class_name("Player").optional(true) }
    it { is_expected.to have_many(:match_games).class_name("MatchGame").dependent(:destroy).inverse_of(:match) }
    it { is_expected.to have_many(:chat_messages).class_name("ChatMessage").dependent(:nullify).inverse_of(:match) }
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
      expect { match.check_in(player: create(:account)) }.to raise_error(ArgumentError)
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

  describe "#update_status" do
    let(:match_game_one) { create(:match_game, :with_winner_player_one, match:, game_number: 1) }
    let(:match_game_two) { create(:match_game, :with_winner_player_two, match:, game_number: 2) }

    before do
      match_game_one
      match_game_two
    end

    it "sets the winner and loser when player one wins enough games" do
      allow(match).to receive(:best_of).and_return(3)
      create(:match_game, :with_winner_player_one, match:)
      match.update_status
      expect(match.winner).to eq(player_one)
      expect(match.loser).to eq(player_two)
      expect(match.ended_at).not_to be_nil
    end

    it "sets the winner and loser when player two wins enough games" do
      allow(match).to receive(:best_of).and_return(3)
      create(:match_game, :with_winner_player_two, match:)
      create(:match_game, :with_winner_player_two, match:)
      match.update_status
      expect(match.winner).to eq(player_two)
      expect(match.loser).to eq(player_one)
      expect(match.ended_at).not_to be_nil
    end

    it "creates a new match game if the match is not yet decided" do
      allow(match).to receive(:best_of).and_return(3)
      expect { match.update_status }.to change { match.match_games.count }.by(1)
    end
  end

  describe "#checked_in?" do
    it "returns true if player one is checked in" do
      match.check_in(player: player_one)
      expect(match.checked_in?(player: player_one)).to be true
    end

    it "returns false if player one is not checked in" do
      expect(match.checked_in?(player: player_one)).to be false
    end

    it "returns true if player two is checked in" do
      match.check_in(player: player_two)
      expect(match.checked_in?(player: player_two)).to be true
    end

    it "returns false if player two is not checked in" do
      expect(match.checked_in?(player: player_two)).to be false
    end

    it "raises an error if the player is not part of the match" do
      expect { match.checked_in?(player: create(:account)) }.to raise_error(ArgumentError)
    end
  end
end
