
require "rails_helper"

RSpec.describe Rk9Tournament, type: :model do
  subject { described_class.new(name: "Tournament Name", start_date: Date.today, end_date: Date.today + 1, rk9_id: "12345") }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(subject).to be_valid
    end

    it "is not valid without a name" do
      subject.name = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without a start_date" do
      subject.start_date = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without an end_date" do
      subject.end_date = nil
      expect(subject).to_not be_valid
    end

    it "is not valid without an rk9_id" do
      subject.rk9_id = nil
      expect(subject).to_not be_valid
    end

    it "is not valid with a duplicate rk9_id" do
      described_class.create!(name: "Another Tournament", start_date: Date.today, end_date: Date.today + 1, rk9_id: "12345")
      expect(subject).to_not be_valid
    end
  end
end
