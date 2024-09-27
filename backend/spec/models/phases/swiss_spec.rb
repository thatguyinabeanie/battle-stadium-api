require "rails_helper"

RSpec.describe Phases::Swiss do
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
      tournament = create(:tournament) # Assuming a :tournament factory exists
      swiss_phase = create(:swiss_phase, tournament:)
      expect(swiss_phase.persisted?).to be true
    end
  end

  describe "validations" do
    subject(:swiss_phase) { described_class.new(tournament: create(:tournament), number_of_rounds: 5) }

    it 'validates that :type is "Phases::Swiss"' do
      swiss_phase.type = "InvalidType"
      swiss_phase.valid?
      expect(swiss_phase.errors[:type]).to include("must be equal to Phases::Swiss")
    end
  end

  describe "#create_initial_round" do
    it "creates the first round with round_number 1" do
      tournament = create(:tournament)
      swiss_phase = create(:swiss_phase, tournament:)
      swiss_phase.create_initial_round
      expect(swiss_phase.rounds.first.round_number).to eq(1)
    end
  end

  describe "#create_next_round" do
    it "creates the next round with incremented round_number" do
      tournament = create(:tournament)
      swiss_phase = create(:swiss_phase, tournament:)
      swiss_phase.create_initial_round
      swiss_phase.create_next_round
      expect(swiss_phase.rounds.last.round_number).to eq(2)
    end
  end

  describe "#start" do
    it "sets the started_at timestamp" do
      tournament = create(:tournament)
      swiss_phase = create(:swiss_phase, tournament:)
      swiss_phase.start
      expect(swiss_phase.started_at).not_to be_nil
    end

    it "triggers the creation of the initial round" do
      tournament = create(:tournament)
      swiss_phase = create(:swiss_phase, tournament:)
      expect { swiss_phase.start }.to change { swiss_phase.rounds.count }.by(1)
    end
  end
end
