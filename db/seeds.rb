# typed: false

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

def create_user(username: nil, email: nil)
  username ||= "regular_user_#{Faker::Internet.unique.username}"
  email ||= "#{username}@battle-stadium-regular-users.com"
  # Check if user already exists
  User.find_or_create_by!(username:) do |the_user|
    the_user.email = email
    the_user.password = Faker::Internet.password
    the_user.first_name = Faker::Name.first_name
    the_user.last_name = Faker::Name.last_name
  end
end

def generate_pokemon_set(player:)
  Tournament::PokemonSet.new(
    player:,

    name: Faker::Games::Pokemon.name,
    ability: "ability_#{rand(1..3)}", # This is a placeholder for the ability
    tera_type: "type_#{rand(1..18)}", # This is a placeholder for the tera_type
    nature: "nature_#{rand(1..25)}", # This is a placeholder for the nature

    held_item: "item_#{rand(1..10)}", # This is a placeholder for the held_item

    move1: Faker::Games::Pokemon.move,
    move2: Faker::Games::Pokemon.move,
    move3: Faker::Games::Pokemon.move,
    move4: Faker::Games::Pokemon.move
  )
end

def create_tournament(name:, organization:, format:, game:, start_at:, end_at:, check_in_start_at:, registration_start_at:)
  Tournament::Tournament.find_by!(organization:, name:, start_at:)
rescue ActiveRecord::RecordNotFound
  Tournament::Tournament.create!(organization:, name:, start_at:, end_at:, check_in_start_at:, format:, game:, registration_start_at:)
end

scarlet_violet = Game.create!(name: 'Pokemon Scarlet & Violet')
# regulations = %w[G]
regulations = %w[A B C D E F G H]
sv_formats = regulations.map { |regulation| Tournament::Format.create!(name: "Regulation #{regulation}", game: scarlet_violet) }

sword_and_shield = Game.create!(name: 'Pokemon Sword & Shield')
swsh_formats = (1..13).to_a.map { |series| Tournament::Format.create!(name: "Series #{series}", game: sword_and_shield) }

formats = sv_formats + swsh_formats
formats = sv_formats

org_owners = [
  {
    username: 'fuecoco_supremacy'
  },
  {
    username: 'sprigatito_lover'
  },
  {
    username: 'quaxly_enthusiast'
  }
].map { |user| create_user(username: user[:username]) }

orgs = org_owners.map do |owner|
  Organization::Organization.find_by!(owner:)
rescue ActiveRecord::RecordNotFound
  description = 'This is an example organization.'
  staff = (1..5).to_a.map { create_user }
  name = "#{owner[:username].capitalize.gsub('_', ' ')}'s Organization"
  Organization::Organization.create!(name:, owner:, description:, staff:)
end.compact

tournaments = orgs.flat_map do |organization|
  formats.map.with_index do |format, index|
    name = "#{organization.name} #{format.name} Tournament #{index + 1}"
    start_at = Time.zone.today
    end_at = Time.zone.today + 1.week
    check_in_start_at = 1.hour.ago
    game = format.game
    registration_start_at = 1.week.ago

    tour = create_tournament(name:, organization:, format:, game:, start_at:, end_at:, check_in_start_at:, registration_start_at:)

    Phase::Swiss.create!(
      name: "#{organization.name} #{format.name} Tournament #{index + 1} - Swiss Round",
      tournament: tour,
      number_of_rounds: 5
    )

    Phase::SingleEliminationBracket.create!(
      name: "#{organization.name} #{format.name} Tournament #{index + 1} - Top Cut!",
      tournament: tour,
      criteria: 'Top 8'
    )

    tour.save!
    tour
  end
end

players = (1..10).to_a.map { create_user }

tournaments.flat_map do |tournament|
  players.sample(rand(1..10)).map do |user|
    player = Tournament::Player.new(user:)
    player.add_pokemon_sets(Array.new(6) { generate_pokemon_set(player:) })
    tournament.register!(player:)
  end
end
