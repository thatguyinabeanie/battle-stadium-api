require "rails_helper"

RSpec.describe Math::SwissResistance do
  let(:tournament) { create(:tournament, :with_phases, :with_players_with_team, :with_players_checked_in, :with_players_with_team_and_checked_in) }

  let(:phase) { tournament.phases.first }

  let(:player) { phase.players.first }
  let(:opponent_one) { phase.players.second }
  let(:opponent_two) { phase.players.third }
  let(:opponent_three) { phase.players.fourth }
  let(:opponent_four) { phase.players.fifth }


  describe ".calculate" do
    context "when player is not a Tournaments::Player" do
      it "raises an ArgumentError" do
        expect { described_class.calculate(player: "not a player", phase:) }.to raise_error(ArgumentError, "player must be a Tournaments::Player")
      end
    end

    context "when phase is not a Phases::Swiss" do
      it "raises an ArgumentError" do
        expect { described_class.calculate(player:, phase: "not a phase") }.to raise_error(ArgumentError, "phase must be a Phases::Swiss")
      end
    end

    context "when player is not part of the phase" do
      let(:different_phase) { create(:swiss_phase) }

      it "raises an ArgumentError" do
        tournament.start!
        expect { described_class.calculate(player:, phase: different_phase) }.to raise_error(ArgumentError, "player must be part of the phase")
      end
    end

    context "when player has no matches" do
      let(:player) { create(:player) }
      let(:phase) { create(:swiss_phase, players: [player]) }

      it "returns 0" do
        expect(described_class.calculate(player:, phase:)).to eq(0)
      end
    end

    def resolve_match_2_0(match:)
      game_one = match.match_games.create!(game_number: 1, ended_at: Time.current, match:)

      puts "Game One Errors: #{game_one.errors.full_messages}" unless game_one.persisted?

      game_one.report!(winner: match.player_one, loser: match.player_two, reporter: match.player_one)

      game_two = match.match_games.create!(game_number: 2, ended_at: Time.current, match:)

      puts "Game Two Errors: #{game_two.errors.full_messages}" unless game_two.persisted?

      game_two.report!(winner: match.player_one, loser: match.player_two, reporter: match.player_one)

      match.update_status
    end

    def resolve_match_2_1(match:)
      game_one = match.match_games.create!(game_number: 1, ended_at: Time.current, match:)
      puts "Game One Errors: #{game_one.errors.full_messages}" unless game_one.persisted?

      game_one.report!(winner: match.player_one, loser: match.player_two, reporter: match.player_one)

      game_two = match.match_games.create!(game_number: 2, ended_at: Time.current, match:)
      puts "Game Two Errors: #{game_two.errors.full_messages}" unless game_two.persisted?

      game_two.report!(winner: match.player_two, loser: match.player_one, reporter: match.player_two)

      game_three = match.match_games.create!(game_number: 3, ended_at: Time.current, match:)
      puts "Game Three Errors: #{game_three.errors.full_messages}" unless game_three.persisted?

      game_three.report!(winner: match.player_one, loser: match.player_two, reporter: match.player_one)

    end

    context "when player has matches" do
      it "calculates the correct resistance" do
        tournament.start!
        phase = tournament.phases.first
        phase.reload
        round =  phase.current_round
        player = phase.players.first
        opponent_one = phase.players.second
        opponent_two = phase.players.third
        opponent_three = phase.players.fourth
        opponent_four = phase.players.fifth

        match_one = round.matches.create!(player_one: player, player_two: opponent_one)
        resolve_match_2_0(match: match_one)
        match_one.reload

        match_two = round.matches.create!(player_one: opponent_two, player_two: opponent_three)
        resolve_match_2_1(match: match_two)
        match_two.reload

        match_three = round.matches.create!(player_one: opponent_four, player_two: nil, bye: true, winner: opponent_four, loser: nil, ended_at: Time.current)

        round.matches = [match_one, match_two, match_three]
        round.save!

        phase.end_current_round

        phase.create_round
        phase.current_round.matches.filter(&:bye).each { |match| resolve_match_2_0(match:) }

        phase.current_round.reload
        # binding.break

        expect(described_class.calculate(player:, phase:)).to eq(0)
        expect(described_class.calculate(player: opponent_one, phase:)).to eq(0)
        expect(described_class.calculate(player: opponent_two, phase:)).to eq(0)
        expect(described_class.calculate(player: opponent_three, phase:)).to eq(0)
        expect(described_class.calculate(player: opponent_three, phase:)).to eq(0)
      end
    end
  end
end
