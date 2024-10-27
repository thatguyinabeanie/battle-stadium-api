require "rails_helper"

RSpec.describe Rk9Tournament do
  let(:tournament) {  described_class.new(name: "Tournament Name", start_date: Date.new(2024, 1, 1), end_date: Date.new(2024, 1, 2), rk9_id: "12345") }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(tournament).to be_valid
    end

    it "is not valid without an rk9_id" do
      tournament.rk9_id = nil
      expect(tournament).not_to be_valid
    end

    it "is not valid without a name" do
      tournament.name = nil
      expect(tournament).not_to be_valid
    end

    it "is not valid without a start_date" do
      tournament.start_date = nil
      expect(tournament).not_to be_valid
    end

    it "is not valid without an end_date" do
      tournament.end_date = nil
      expect(tournament).not_to be_valid
    end

    it "is valid if start_date is the same as end_date" do
      tournament.start_date = Date.today
      tournament.end_date = Date.today
      expect(tournament).to be_valid
    end
  end

  describe "scopes" do
    let!(:active_tournament) { described_class.create!(name: "Active Tournament", start_date: Date.today - 1, end_date: Date.today + 1, rk9_id: "active123") }
    let!(:upcoming_tournament) { described_class.create!(name: "Upcoming Tournament", start_date: Date.today + 1, end_date: Date.today + 2, rk9_id: "upcoming123") }
    let!(:past_tournament) { described_class.create!(name: "Past Tournament", start_date: Date.today - 3, end_date: Date.today - 1, rk9_id: "past123") }

    it "returns active tournaments" do
      expect(described_class.active).to include(active_tournament)
      expect(described_class.active).not_to include(upcoming_tournament, past_tournament)
    end

    it "returns upcoming tournaments" do
      expect(described_class.upcoming).to include(upcoming_tournament)
      expect(described_class.upcoming).not_to include(active_tournament, past_tournament)
    end

    it "returns past tournaments" do
      expect(described_class.past).to include(past_tournament)
      expect(described_class.past).not_to include(active_tournament, upcoming_tournament)
    end
  end

  describe "status methods" do
    it "returns true for active? if the tournament is currently active" do
      tournament.start_date = Date.today - 1
      tournament.end_date = Date.today + 1
      expect(tournament.active?).to be true
    end

    it "returns false for active? if the tournament is not currently active" do
      tournament.start_date = Date.today + 1
      tournament.end_date = Date.today + 2
      expect(tournament.active?).to be false
    end

    it "returns true for upcoming? if the tournament is upcoming" do
      tournament.start_date = Date.today + 1
      tournament.end_date = Date.today + 2
      expect(tournament.upcoming?).to be true
    end

    it "returns false for upcoming? if the tournament is not upcoming" do
      tournament.start_date = Date.today - 1
      tournament.end_date = Date.today + 1
      expect(tournament.upcoming?).to be false
    end

    it "returns true for past? if the tournament is past" do
      tournament.start_date = Date.today - 3
      tournament.end_date = Date.today - 1
      expect(tournament.past?).to be true
    end

    it "returns false for past? if the tournament is not past" do
      tournament.start_date = Date.today + 1
      tournament.end_date = Date.today + 2
      expect(tournament.past?).to be false
    end
  end
end
