require "rails_helper"

RSpec.describe Tournaments::Round do
  let(:phase) { create(:swiss_phase) }
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
end
