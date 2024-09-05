require "rails_helper"

RSpec.describe Tournaments::Format do
  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(255) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:game_id) }
    it { is_expected.to validate_presence_of(:game) }
  end

  describe "associations" do
    it "belongs to a game" do
      game = create(:game)
      format = create(:format, game:)
      expect(format.game).to eq(game)
    end
  end
end
