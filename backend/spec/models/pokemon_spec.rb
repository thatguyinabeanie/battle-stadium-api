require "rails_helper"

RSpec.describe Pokemon do
  describe "associations" do
    it { is_expected.to belong_to(:pokemon_team).class_name("PokemonTeam").inverse_of(:pokemon) }
  end

  describe "validations" do
    subject do
      described_class.create(
        pokemon_team_id: pokemon_team.id,
        name: "Pikachu",
        ability: "Static",
        tera_type: "Electric",
        nature: "Jolly",
        held_item: "Light Ball",
        move1: "Thunderbolt",
        move2: "Quick Attack",
        move3: "Iron Tail",
        move4: "Volt Tackle"
      )
    end

    let(:user) { create(:user) }
    let(:pokemon_team) { create(:pokemon_team, user:) }

    it { is_expected.to validate_presence_of(:pokemon_team_id) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:ability) }
    it { is_expected.to validate_presence_of(:tera_type) }
    it { is_expected.to validate_presence_of(:nature) }
    it { is_expected.to validate_presence_of(:held_item) }
    it { is_expected.to validate_presence_of(:move1) }
    it { is_expected.to validate_presence_of(:move2) }
    it { is_expected.to validate_presence_of(:move3) }
    it { is_expected.to validate_presence_of(:move4) }
  end
end
