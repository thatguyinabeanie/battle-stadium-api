require "rails_helper"

RSpec.describe Math::SwissResistance do
  let(:tournament) { create(:tournament, :with_phases, :with_players_with_team, :with_players_checked_in, :with_players_with_team_and_checked_in) }

  let(:phase) { tournament.phases.first }

  let(:player) { phase.players.first }
  let(:player_two) { phase.players.second }
  let(:player_three) { phase.players.third }
  let(:player_four) { phase.players.fourth }
  let(:player_five) { phase.players.fifth }


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
        player_two = phase.players.second
        player_three = phase.players.third
        player_four = phase.players.fourth
        player_five = phase.players.fifth

        match_one = round.matches.create!(player_one: player, player_two:)
        resolve_match_2_0(match: match_one)
        match_one.reload

        match_two = round.matches.create!(player_one: player_three, player_two: player_four)
        resolve_match_2_1(match: match_two)
        match_two.reload

        match_three = round.matches.create!(player_one: player_five, player_two: nil, bye: true, winner: player_five, loser: nil, ended_at: Time.current)

        round.matches = [match_one, match_two, match_three]
        round.save!

        phase.end_current_round

        expect(described_class.calculate(player:, phase:)).to  be_within(0.001).of(1.0)
        expect(described_class.calculate(player: player_two, phase:)).to   be_within(0.001).of(0.0)
        expect(described_class.calculate(player: player_three, phase:)).to  be_within(0.001).of(0.667)
        expect(described_class.calculate(player: player_four, phase:)).to   be_within(0.001).of(0.333)
        expect(described_class.calculate(player: player_five, phase:)).to   be_within(0.001).of(1.000)

        phase.create_round
        phase.current_round.matches.filter(&:bye).each { |match| resolve_match_2_0(match:) }

        phase.current_round.reload

        expect(described_class.calculate(player:, phase:)).to  be_within(0.001).of(1.0)
        expect(described_class.calculate(player: player_two, phase:)).to   be_within(0.001).of(0.5)
        expect(described_class.calculate(player: player_three, phase:)).to  be_within(0.001).of(0.667)
        expect(described_class.calculate(player: player_four, phase:)).to   be_within(0.001).of(0.333)
        expect(described_class.calculate(player: player_five, phase:)).to   be_within(0.001).of(1.000)
      end
    end
  end
end
