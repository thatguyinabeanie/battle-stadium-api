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
end
