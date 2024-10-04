require "rails_helper"

# Define a temporary subclass of Phases::BasePhase for testing purposes
module Phases
  class Test < Phases::BasePhase
    self.table_name = "phases"
  end
end

RSpec.describe Phases::BasePhase do
  describe "table name" do
    it "is 'phases'" do
      expect(described_class.table_name).to eq("phases")
    end
  end

  describe "abstract class" do
    it "is true" do
      expect(described_class.abstract_class).to be true
    end
  end

  describe "associations" do
    subject { Phases::Test.new }

    it { is_expected.to have_many(:rounds).class_name("Tournaments::Round").inverse_of(:phase).dependent(:destroy) }
    it { is_expected.to belong_to(:tournament).class_name("Tournaments::Tournament") }
  end

  describe "validations" do
    subject { Phases::Test.new(name: "Test Phase", tournament: create(:tournament), number_of_rounds: 5, type: "Phases::Test") }

    it { is_expected.to validate_uniqueness_of(:order).scoped_to(:tournament_id) }

    it { is_expected.to validate_numericality_of(:best_of).is_greater_than(0).only_integer }
  end

  describe "additional validation" do
    subject(:phase) { Phases::Test.new(best_of:, tournament:, name:, type: "Phases::Test") }

    let(:best_of) { 3 }
    let(:tournament) { create(:tournament) }
    let(:name) { "BassFace" }

    context "when best_of is odd" do
      let(:best_of) { 5 }

      it { is_expected.to be_valid }
    end

    context "when best_of is even" do
      let(:best_of) { 6 }

      it "is invalid" do
        phase.valid?
        expect(phase).not_to be_valid
      end

      it "adds an error to best_of" do
        phase.valid?
        expect(phase.errors[:best_of]).to include(I18n.t("errors.phase.best_of_must_be_odd"))
      end
    end
  end

  describe "default values" do
    subject(:phase) { Phases::Test.new }

    it "sets the default name" do
      phase.valid?
      expect(phase.name).to eq("Phases::Test")
    end

    it "sets the default best_of" do
      phase.valid?
      expect(phase.best_of).to eq(3)
    end

    it "sets the default type" do
      phase.valid?
      expect(phase.type).to eq("Phases::Test")
    end

    it "sets the default number_of_rounds" do
      phase.valid?
      expect(phase.number_of_rounds).to eq(0)
    end
  end

  describe "delegations" do
    subject(:phase) { Phases::Test.new }

    it { is_expected.to delegate_method(:organization).to(:tournament) }
  end

  describe "#accept_players" do
    let(:tournament) { create(:tournament, :with_phases, :with_players_with_team, :with_players_checked_in, :with_players_with_team_and_checked_in) }
    let(:phase) { tournament.phases.first }

    context "when players are checked in and have submitted team sheets" do
      it "sets the players and updates the phase" do
        expect { phase.accept_players(players: tournament.players) }
          .to change { phase.players.count }.to(tournament.players&.checked_in_and_submitted_team_sheet.count)
          .and change(phase, :started_at).from(nil)
          .and change(phase, :number_of_rounds).from(5)
      end
    end

    context "when no players are checked in" do
      it "raises an error" do
        expect { phase.accept_players(players: nil) }.to raise_error("Number of players must be greater than zero")
      end
    end
  end

  describe "player scopes" do
    let(:tournament) { create(:tournament, :with_phases, :with_players_with_team, :with_players_checked_in, :with_players_with_team_and_checked_in) }
    let(:phase) { tournament.phases.first }

    describe "#players_ready" do
      it "returns players who are checked in and have submitted team sheets" do
        expect(phase.players_ready).to match_array(tournament.players&.checked_in_and_submitted_team_sheet)
      end
    end

    describe "#players_checked_in" do
      it "returns players who are checked in" do
        expect(phase.players_checked_in).to match_array(tournament.players.checked_in)
      end
    end

    describe "#players_not_checked_in_has_team_sheet" do
      it "returns players who are not checked in but have submitted team sheets" do
        expect(phase.players_not_checked_in_has_team_sheet).to match_array(tournament.players.not_checked_in_and_submitted_team_sheet)
      end
    end

    describe "#players_not_checked_in" do
      it "returns players who are not checked in" do
        expect(phase.players_not_checked_in).to match_array(tournament.players.not_checked_in)
      end
    end

    describe "#players_checked_in_no_team_sheet" do
      it "returns players who are checked in but have not submitted team sheets" do
        expect(phase.players_checked_in_no_team_sheet).to match_array(tournament.players.checked_in_and_not_submitted_team_sheet)
      end
    end

    describe "#players_not_checked_in_or_no_team_sheet" do
      it "returns players who are not checked in or have not submitted team sheets" do
        expect(phase.players_not_checked_in_or_no_team_sheet).to match_array(tournament.players.not_checked_in_or_not_submitted_team_sheet)
      end
    end
  end
end
