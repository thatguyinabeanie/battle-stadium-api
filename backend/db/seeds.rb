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

require 'faker'

if Rails.env.production?
  Rails.logger.info('Seeding is disabled in production.')
  exit
end

# require 'factory_bot'

def create_user(username: nil)
  username ||= Faker::Internet.unique.username

  # Check if user already exists
  User.find_or_create_by!(username:) do |user|
    password = SecurePassword.generate_secure_password
    user.email = "#{user.username}@example.com"
    user.password = password
    user.password_confirmation = password
    user.pronouns = 'they/them'
    user.first_name = Faker::Name.first_name
    user.last_name = Faker::Name.last_name
  end
end

def create_tournament(name:, organization:, format:, game:, start_at:, end_at:)
  Tournaments::Tournament.find_or_create_by!(name:, organization:, format:, game:) do |tournament|
    tournament.start_at = start_at
    tournament.check_in_start_at = start_at - 1.hour
    tournament.end_at = end_at

    tournament.phases << Phases::Swiss.create!(
      name: "#{tournament.name} - Swiss Rounds",
      tournament:,
      number_of_rounds: 5
    )

    tournament.phases << Phases::SingleEliminationBracket.create!(
      name: "#{tournament.name} - Top Cut!",
      tournament:,
      criteria: 'Top 8'
    )
  end
end

def create_format(name:, game:)
  Tournaments::Format.find_or_create_by!(name:, game:)
end

scarlet_violet = Game.find_or_create_by!(name: 'Pokemon Scarlet & Violet')

(1..10).to_a.map { |series| Game.find_or_create_by!(name: "Pokemon Series #{series}") }

format = Tournaments::Format.find_or_create_by!(name: 'Regulation H', game: scarlet_violet)

org_owners = (1..25).to_a.map { create_user }

orgs = org_owners.map do |owner|
  Organization.find_or_create_by!(owner:) do |org|
    org.description = 'This is an example organization.'
    org.staff = (1..5).to_a.map { create_user }
    org.name = "#{owner[:username].capitalize.gsub('_', ' ')}'s Organization"
  end
end.uniq

count = 0
users = (1..50).to_a.map { create_user }.uniq

future_tournaments = orgs.flat_map do |organization|
  (1..10).to_a.map do
    name = "#{organization.name} Tournament #{organization.tournaments.count + 1}"
    start_at = (1.day.from_now.beginning_of_day + rand(8..20).hours) + (count % 10).weeks
    end_at = start_at + 10.hours
    tour = create_tournament(name:, organization:, format:, game: format.game, start_at:, end_at:)
    count += 1
    tour
  end
end

future_tournaments.flat_map do |tournament|
  users.map do |user|
    next if tournament.players.exists?(user:) || !tournament.registration_open?

    tournament.players.create!(user:, in_game_name: Faker::Games::Pokemon.name).tap do |player|
      player.pokemon_team = PokemonTeam.create(user:).tap { |pokemon_team| pokemon_team.pokemon = (1..6).to_a.map { Pokemon.create(pokemon_team:) } }
    end
  end
end

in_progress_tournaments = orgs.flat_map do |organization|
  name = "#{organization.name} Tournament #{organization.tournaments.count + 1}"
  end_at = Time.zone.today + 1.week
  game = format.game
  start_at = 1.hour.from_now
  create_tournament(name:, organization:, format:, game:, start_at:, end_at:).tap do |tournament|
    tournament.players = users.map do |user|
      next if tournament.players.exists?(user:)

      tournament.players.create!(user:, in_game_name: Faker::Games::Pokemon.name).tap do |player|
        player.pokemon_team = PokemonTeam.create(user:).tap { |pokemon_team| pokemon_team.pokemon = (1..6).to_a.map { Pokemon.create(pokemon_team:) } }
      end
    end
  end
end

in_progress_tournaments.each { |tournament| tournament.start_tournament! if tournament.players.checked_in_and_ready.count.positive? }
