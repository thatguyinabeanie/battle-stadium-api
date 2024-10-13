require "rails_helper"

class MockModel
  include ActiveModel::Validations
  include MatchPlayersConcern

  attr_accessor :winner, :loser, :ended_at, :player_one, :player_two, :reporter

  def initialize(player_one:, player_two:)
    @player_one = player_one
    @player_two = player_two
  end

  # Mock the update! method used in the concern
  def update!(args)
    args.each { |k, v| send("#{k}=", v) }
  end
end

RSpec.describe MatchPlayersConcern do
  let(:player_one) { create(:account) }
  let(:player_two) { create(:account) }
  let(:match_mock) { MockModel.new(player_one:, player_two:) }

  describe "#opponent_for" do
    it "returns the opponent for player_one" do
      expect(match_mock.opponent_for(player: player_one)).to eq(player_two)
    end

    it "returns the opponent for player_two" do
      expect(match_mock.opponent_for(player: player_two)).to eq(player_one)
    end
  end

  context "when reporting game results" do
    before do
      allow(match_mock).to receive(:update!).with(winner: player_one, loser: player_two, reporter: player_one, ended_at: anything)
    end

    describe "#report_winner!" do
      it "reports the winner and loser" do
        match_mock.report_winner!(player: player_one, reporter: player_one)
        expect(match_mock).to have_received(:update!).with(winner: player_one, loser: player_two, reporter: player_one, ended_at: anything)
      end
    end

    describe "#report_loser!" do
      it "reports the loser and winner" do
        match_mock.report_loser!(player: player_two, reporter: player_one)
        expect(match_mock).to have_received(:update!).with(winner: player_one, loser: player_two, reporter: player_one, ended_at: anything)
      end
    end

    describe "#report!" do
      it "updates the winner, loser, reporter, and ended_at" do
        match_mock.report!(winner: player_one, loser: player_two, reporter: player_one)
        expect(match_mock).to have_received(:update!).with(winner: player_one, loser: player_two, reporter: player_one, ended_at: anything)
      end
    end
  end
end
