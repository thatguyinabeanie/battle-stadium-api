require "rails_helper"

# require_relative '../../app/models/phase' # Adjust the path according to your project structure

RSpec.describe Phases::SingleEliminationBracket do
  describe "#table_name" do
    it "returns the correct table name" do
      expect(described_class.table_name).to eq("phases")
    end
  end

  describe "#create" do
    it "creates a new single elimination bracket phase" do
      phase = described_class.create
      expect(phase).to be_a(described_class)
    end
  end

  describe "#update" do
    it "updates the attributes of a single elimination bracket phase" do
      phase = described_class.create
      phase.update(name: "Updated Phase")
      expect(phase.name).to eq("Updated Phase")
    end
  end

  describe "#destroy" do
    it "destroys a single elimination bracket phase" do
      phase = described_class.create
      phase.destroy
      expect(described_class).not_to exist(phase.id)
    end
  end
end
