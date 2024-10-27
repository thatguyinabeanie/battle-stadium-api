require "rails_helper"

RSpec.describe Game do
  describe "validations" do
    it "is valid with a name" do
      game = described_class.new(name: "Pokemon")
      expect(game).to be_valid
    end

    it "is invalid without a name" do
      game = described_class.new(name: nil)
      expect(game).not_to be_valid
    end
  end

  describe "associations" do
    describe "formats" do
      it "has no formats by default" do
        game = described_class.new(name: "Pokemon")
        expect(game.formats).to be_empty
      end

      it "has many formats" do
        game = described_class.new(name: "Pokemon")
        format1 = Format.create(name: "Single Elimination", game:)
        format2 = Format.create(name: "Double Elimination", game:)
        expect(game.formats).to contain_exactly(format1, format2)
      end

      it "does not destroy associated formats when destroyed" do
        game = described_class.create(name: "Pokemon")
        Format.create(name: "Single Elimination", game:)
        expect { game.destroy }.not_to change(Format, :count)
      end
    end

    describe "tournaments" do
      def create_tournament(game:)
        format = create(:format, game:)
        create(:tournament, game:, format:)
      end

      it "has no tournaments by default" do
        game = described_class.new(name: "Pokemon")
        expect(game.tournaments).to be_empty
      end

      it "has many tournaments" do
        game = described_class.new(name: "Pokemon #{Faker::Game.title} Version")
        tournament1 = create_tournament(game:)
        tournament2 = create_tournament(game:)
        expect(game.tournaments).to contain_exactly(tournament1, tournament2)
      end

      it "does not destroys associated tournaments when destroyed" do
        game = described_class.create(name: "Pokemon")
        Tournament.create(name: "World Championship", game:)
        expect { game.destroy }.not_to change(Tournament, :count)
      end
    end
  end
end
