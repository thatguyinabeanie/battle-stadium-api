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
end
