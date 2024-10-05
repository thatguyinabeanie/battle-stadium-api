require "rails_helper"

RSpec.describe Phases::Swiss do
  let(:tournament) { create(:tournament, :with_phases, :with_players_with_team, :with_players_checked_in, :with_players_with_team_and_checked_in) }

  describe "table_name" do
    it "returns the correct table name" do
      expect(described_class.table_name).to eq("phases")
    end
  end

  describe "inheritance" do
    it "inherits from Phases::BasePhase" do
      expect(described_class.superclass).to eq(Phases::BasePhase)
    end
  end

  describe "create" do
    it "successfully creates a swiss phase" do
      swiss_phase = create(:swiss_phase, tournament:)
      expect(swiss_phase.persisted?).to be true
    end
  end

  describe "validations" do
    subject(:swiss_phase) { described_class.new(tournament:) }

    it 'validates that :type is "Phases::Swiss"' do
      swiss_phase.type = "InvalidType"
      swiss_phase.valid?
      expect(swiss_phase.errors[:type]).to include("must be equal to Phases::Swiss")
    end
  end

  describe "#create_round" do
    it "creates the next round with incremented round_number" do
      swiss_phase = create(:swiss_phase, tournament:)
      swiss_phase.accept_players(players: tournament.players)
      swiss_phase.current_round = create(:round, phase: swiss_phase, round_number: 1)
      swiss_phase.started_at = Time.current.utc
      swiss_phase.create_round
      expect(swiss_phase.rounds.last.round_number).to eq(2)
    end

    it "raises an error if the phase has not started" do
      swiss_phase = create(:swiss_phase, tournament:)
      expect { swiss_phase.create_round }.to raise_error("The phase has not started")
    end

    it "raises an error if the phase has not accepted players" do
      swiss_phase = create(:swiss_phase, tournament:)
      swiss_phase.started_at = Time.current.utc
      expect { swiss_phase.create_round }.to raise_error("The phase has not accepted players")
    end

    it "raises an error if the phase has not set the number of rounds" do
      swiss_phase = create(:swiss_phase, tournament:)
      swiss_phase.accept_players(players: tournament.players)
      swiss_phase.number_of_rounds = nil
      swiss_phase.started_at = Time.current.utc
      expect { swiss_phase.create_round }.to raise_error("The phase has not set the number of rounds")
    end

    it "raises an error if the phase has already completed all rounds" do
      swiss_phase = create(:swiss_phase, tournament:)
      swiss_phase.accept_players(players: tournament.players)
      swiss_phase.started_at = Time.current.utc
      swiss_phase.number_of_rounds = 1
      swiss_phase.current_round = create(:round, phase: swiss_phase, round_number: 1)
      expect { swiss_phase.create_round }.to raise_error("The phase has already completed all rounds")
    end
  end

  describe "#accept_players" do
    let(:phase) { tournament.phases.first }

    context "when players are checked in and have submitted team sheets" do
      it "sets the players and updates the phase" do
        expect(tournament.players&.checked_in_and_submitted_team_sheet.count).to eq(5)
        expect { phase.accept_players(players: tournament.players) }
          .to change { phase.players.count }.to(tournament.players&.checked_in_and_submitted_team_sheet.count)
          .and change(phase, :number_of_rounds).from(0).to(3)
      end
    end

    context "when no players are checked in" do
      it "raises an error" do
        expect { phase.accept_players(players: tournament.players.not_checked_in) }.to raise_error("Number of players must be greater than zero")
      end
    end
  end

  describe "#start" do
    it "sets the started_at timestamp" do
      swiss_phase = create(:swiss_phase, tournament:)
      swiss_phase.accept_players(players: tournament.players)
      swiss_phase.start!
      expect(swiss_phase.started_at).not_to be_nil
    end

    it "triggers the creation of the initial round" do
      swiss_phase = create(:swiss_phase, tournament:)
      swiss_phase.accept_players(players: tournament.players)
      expect { swiss_phase.start! }.to change { swiss_phase.rounds.count }.by(1)
    end
  end

  describe "#calculate_resistance" do
    let(:swiss_phase) { create(:swiss_phase, :with_accepted_players) }
    let(:player) { swiss_phase.players.first }
    let(:opponent_one) { swiss_phase.players.second }
    let(:opponent_two) { swiss_phase.players.third }

    before do
      swiss_phase.start!
    end

    context "when the player has no matches" do
      it "sets the player's resistance to 0" do
        swiss_phase.calculate_resistance(player:)
        expect(player.resistance).to eq(0)
      end
    end

    # context "when the player has matches" do
    #   before do
    #     create(:match, phase: swiss_phase, player_one: player, player_two: opponent_one, winner: opponent_one)
    #     create(:match, phase: swiss_phase, player_one: player, player_two: opponent_two, winner: player)
    #     create(:match, phase: swiss_phase, player_one: opponent_one, player_two: opponent_two, winner: opponent_two)
    #   end

    #   it "calculates the correct resistance for the player" do
    #     swiss_phase.calculate_resistance(player:)
    #     total_opponent_wins = opponent_one.wins + opponent_two.wins
    #     total_opponent_matches = (opponent_one.wins + opponent_one.losses) + (opponent_two.wins + opponent_two.losses)
    #     expected_resistance = (total_opponent_wins.to_f / total_opponent_matches) * 100
    #     expect(player.resistance).to eq(expected_resistance)
    #   end
    # end
  end
end
