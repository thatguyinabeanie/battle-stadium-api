# typed: false

# file deepcode ignore HardcodedCredential: <please specify a reason of ignoring this>

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "faker"

if Rails.env.production?
  puts("Seeding is disabled in production.")
  exit
end

# if ENV.fetch("SEED_DATA", "false") == "false"
  # puts("Seeding is disabled by the SEED_DATA environment variable.")
  # exit
# else
puts("Seeding data...")
PokemonTeam.reset_column_information
Organization.reset_column_information
Account.reset_column_information
# end

require "factory_bot"
require "factory_bot_rails"

def create_account(username: nil, first_name: nil, last_name: nil, email: nil, pronouns: nil, admin: false)
  first_name ||= Faker::Name.first_name
  last_name ||= Faker::Name.last_name
  username ||= Faker::Internet.unique.username
  email ||= "#{username}@beanie.com"
  pronouns ||= "they/them"

  attrs = {
    email:,
    first_name:,
    last_name:,
    admin:,
    pronouns:
  }

  # Check if Account already exists
  account = Account.find_or_create_by_profile_username(username:, **attrs)

  # Check if profile with the given username already exists
  profile = Profile.find_or_create_by!(username:) do |p|
    p.account = account
  end

  account.update!(default_profile: profile)
  account
end

def create_tournament(name:, organization:, format:, game:, start_at:, end_at:)
  Tournament.find_or_create_by!(name:, organization:, format:, game:) do |tournament|
    tournament.published = true
    tournament.start_at = start_at
    tournament.check_in_start_at = start_at - 1.hour
    tournament.end_at = end_at

    tournament.phases << Phases::Swiss.create!(
      name: "#{tournament.name} - Swiss Rounds",
      tournament:,
      number_of_rounds: 5,
      order: 0
    )

    tournament.phases << Phases::SingleEliminationBracket.create!(
      name: "#{tournament.name} - Top Cut!",
      tournament:,
      order: 1
    )
  end
end

def create_format(name:, game:)
  Format.find_or_create_by!(name:, game:)
end

game = Game.find_or_create_by!(name: "Pokemon VGC")

format = Format.find_or_create_by!(name: "Regulation H", game: game)

owner = create_account(username: ENV.fetch("ADMIN_USERNAME", "thatguyinabeanie"), first_name: "Pablo", last_name: "Escobar", pronouns: "he/him", admin: true)

organization =  Organization.find_or_create_by!(name: ENV.fetch("TEST_ORG_NAME", "The Rise of Fuecoco")) do |org|
  org.owner = owner
  org.description = Faker::Lorem.sentence
  org.staff = 5.times.to_a.map { create_account }
  org.staff << owner
  org.hidden = false
  org.partner = true
end

def tournament_name(organization:)
  "#{organization.name} Tournament # #{organization.tournaments.count + 1}"
end

start_at = (1.day.from_now.beginning_of_day + rand(8..20).hours) + 1.week
end_at = start_at + 10.hours

accounts = Account.all
if accounts.count < 50
  needed_accounts = 50 - accounts.count
  accounts = accounts + needed_accounts.times.map { |i| create_account(username: "seed_user_#{i}") }
end

end_at = Time.zone.today + 1.week
game = format.game
start_at = 1.hour.from_now - 5.minutes

pokemon_data = [
  { species: "Butterfree", ability: "ability_1",  position: 1, tera_type: "bug", nature: "timid"    },
  { species: "Clefable", ability: "ability_2", position: 2, tera_type: "fairy", nature: "jolly" },
  { species: "Victreebel", ability: "ability_3", position: 3, tera_type: "grass", nature: "lax" },
  { species: "Sandslash", ability: "ability_4", position: 4, tera_type: "ground", nature: "naughty" },
  { species: "Mew", ability: "ability_5", position: 5, tera_type: "psychic", nature: "bold" },
  { species: "Staryu", ability: "ability_6", position: 6, tera_type: "water", nature: "relaxed" }
]

tournament = create_tournament(name: tournament_name(organization:), organization:, format:, game: format.game, start_at:, end_at:).tap do |tour|
  # Preload profiles to avoid N1 queries
  accounts_with_profiles = accounts.includes(:default_profile)

  # Validate pokemon_data before proceeding
  raise "Invalid pokemon data" unless pokemon_data.all? { |p| p[:species].present? && p[:position].present? }

  tour.players = accounts_with_profiles.map do |account|
    next if tour.players.exists?(account:)

    tour.players.create!(account:, in_game_name: account.default_profile.username, profile: account.default_profile).tap do |player|
      team = PokemonTeam.create(profile: player.profile, format:, game:, published: true).tap do |pokemon_team|
        pokemon_team.pokemon = pokemon_data.map { |pokemon| Pokemon.create!(pokemon_team:, **pokemon) }
        pokemon_team.format = format
        pokemon_team.game = game
        pokemon_team.save!
      end

      player.pokemon_team_id = team.id
      player.save!
    end
  end
end


puts("Seeding data completed.")
