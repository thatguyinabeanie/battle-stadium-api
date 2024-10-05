require "rails_helper"

RSpec.describe Tournaments::Round do
  let(:tournament) { create(:tournament, :with_phases, :with_players_with_team, :with_players_checked_in, :with_players_with_team_and_checked_in) }
  let(:phase) { tournament.phases.first }
  let(:round) { described_class.new(phase:, round_number: 1) }

  describe "validations" do
    subject { round }

    it { is_expected.to validate_presence_of(:phase) }
    it { is_expected.to validate_presence_of(:round_number) }
    it { is_expected.to validate_uniqueness_of(:round_number).scoped_to(:phase_id) }
    it { is_expected.to validate_uniqueness_of(:phase).scoped_to(:round_number) }
  end

  describe "associations" do
    it "belongs to a phase" do
      expect(round.phase).to eq(phase)
    end

    it "has many matches" do
      match1 = create(:match, round:)
      match2 = create(:match, round:)

      expect(round.matches).to contain_exactly(match1, match2)
    end
  end

  describe "class methods" do
    let(:phase) { create(:swiss_phase) }

    describe ".create_initial_round" do
      it "creates the initial round with matches" do
        phase.accept_players(players: tournament.players)
        round = described_class.create_initial_round(phase)

        expect(round.round_number).to eq(1)
        expect(round.matches.count).to eq(3)
      end
    end

    describe ".create_round" do
      it "creates the next round with matches based on player records" do
        phase.accept_players(players: tournament.players)
        described_class.create_initial_round(phase)
        round = described_class.create_round(phase)

        expect(round.round_number).to eq(2)
        expect(phase.players.count).to eq(5)
        expect(round.matches.count).to eq(3)
      end
    end

    describe ".create_matches" do
      it "creates matches for the given players" do
        players = create_list(:player, 4)
        round = create(:round, phase:)
        described_class.create_matches(round:, players:)

        expect(round.matches.count).to eq(2)
      end
    end
  end

  describe "#end!" do
    let(:phase) { create(:swiss_phase, best_of: 1) }

    it "ends the round" do
      round = create(:round, phase:)
      match = create(:match, round:, phase:, tournament:)
      player_one = match.player_one
      player_two = match.player_two

      match.match_games << create(:match_game, match:, game_number: 1)
      match.match_games.first.report!(winner: player_one, loser: player_two, reporter: player_one)

      round.end!
      expect(round.ended_at).not_to be_nil
    end

    it "raises an error if the round has already ended" do
      round = create(:round, phase:, ended_at: Time.current)

      expect { round.end! }.to raise_error("Round has already ended")
    end

    it "raises an error if matches are still in progress" do
      round = create(:round, phase:)
      create(:match, round:)

      expect { round.end! }.to raise_error("Matches are still in progress")
    end
  end

  describe "#end" do
    let(:phase) { create(:swiss_phase, best_of: 1) }

    it "ends the round" do
      round = create(:round, phase:)
      match = create(:match, round:, phase:, tournament:)
      player_one = match.player_one
      player_two = match.player_two

      match.match_games << create(:match_game, match:, game_number: 1)
      match.match_games.first.report!(winner: player_one, loser: player_two, reporter: player_one)
      round.end
      expect(round.ended_at).not_to be_nil
    end

    it "does nothing if the round has already ended" do
      round = create(:round, phase:, ended_at: Time.current)

      expect { round.end }.not_to change(round, :ended_at)
    end

    it "does nothing if matches are still in progress" do
      round = create(:round, phase:)
      create(:match, round:)

      expect { round.end }.not_to change(round, :ended_at)
    end
  end
end
