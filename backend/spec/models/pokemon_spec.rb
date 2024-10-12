require "rails_helper"

RSpec.describe Pokemon do
  describe "associations" do
    it { is_expected.to belong_to(:pokemon_team).class_name("PokemonTeam").inverse_of(:pokemon) }
  end

  describe "validations" do
    subject do
      described_class.create(
        pokemon_team_id: create(:pokemon_team).id,
        species: "Pikachu",
        ability: "Static",
        tera_type: "Electric",
        nature: "Jolly",
        item: "Light Ball",
        move1: "Thunderbolt",
        move2: "Quick Attack",
        move3: "Iron Tail",
        move4: "Volt Tackle"
      )
    end

    it { is_expected.to validate_presence_of(:pokemon_team_id) }
    it { is_expected.to validate_presence_of(:species) }
    it { is_expected.to validate_presence_of(:ability) }
    it { is_expected.to validate_presence_of(:tera_type) }
    it { is_expected.to validate_presence_of(:nature) }
    it { is_expected.to validate_presence_of(:form).allow_blank }
    it { is_expected.to validate_presence_of(:item) }
    it { is_expected.to validate_presence_of(:move1) }
    it { is_expected.to validate_presence_of(:move2) }
    it { is_expected.to validate_presence_of(:move3) }
    it { is_expected.to validate_presence_of(:move4) }
  end
end
