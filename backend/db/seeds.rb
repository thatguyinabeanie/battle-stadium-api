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

def create_battlestadium_bot
  User.find_or_create_by!(username: 'battlestadiumbot') do |user|
    password = SecurePassword.generate_secure_password
    user.email = 'battlestadium@beanie.gg'
    user.password = password
    user.password_confirmation = password
    user.pronouns = 'they/them'
    user.first_name = 'Battle'
    user.last_name = 'Stadium'
    user.admin = true
  end
end

def create_user(username: nil, password: nil, first_name: nil, last_name: nil, email: nil, pronouns: nil)
  username ||= Faker::Internet.unique.username
  password ||= SecurePassword.generate_secure_password
  first_name ||= Faker::Name.first_name
  last_name ||= Faker::Name.last_name
  email || "#{username}@beanie.com"
  pronouns ||= 'they/them'

  # Check if user already exists
  User.find_or_create_by!(username:) do |user|
    user.email = "#{user.username}@beanie.gg"
    user.password = password
    user.password_confirmation = password
    user.pronouns = pronouns
    user.first_name = last_name
    user.last_name = first_name
    user.email_verified_at = Time.zone.now
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
      tournament:
    )
  end
end

def generate_organization_name
  adjective = Faker::Company.buzzword
  noun = Faker::Company.type

  "#{adjective} #{noun} #{rand(1..100)}"
end

def create_format(name:, game:)
  Tournaments::Format.find_or_create_by!(name:, game:)
end

scarlet_violet = Game.find_or_create_by!(name: 'Pokemon Scarlet & Violet')

(1..10).to_a.map { |series| Game.find_or_create_by!(name: "Pokemon Series #{series}") }

format = Tournaments::Format.find_or_create_by!(name: 'Regulation H', game: scarlet_violet)

fuecoco_supremacy_user = create_user(username: 'fuecoco-supremacy', password: 'FuecocoSupremacy777!',
                                     first_name: 'Pablo', last_name: 'Escobar', pronouns: 'he/him')
fuecoco_supremacy_user.admin = true
fuecoco_supremacy_user.save!

org_owners = (1..25).to_a.map { create_user }

orgs = org_owners.map do |owner|
  Organization.find_or_create_by!(owner:) do |org|
    org.description = Faker::Lorem.sentence
    org.staff = (1..5).to_a.map { create_user }
    org.staff << fuecoco_supremacy_user
    org.name = generate_organization_name
  end
end.uniq

count = 0
users = (1..50).to_a.map { create_user }.uniq

future_tournaments = orgs.flat_map do |organization|
  (1..10).to_a.map do
    name = "#{organization.name} # #{organization.tournaments.count + 1}"
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
      player.pokemon_team = PokemonTeam.create(user:).tap do |pokemon_team|
        pokemon_team.pokemon = (1..6).to_a.map do
          Pokemon.create(pokemon_team:)
        end
      end
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
        player.pokemon_team = PokemonTeam.create(user:).tap do |pokemon_team|
          pokemon_team.pokemon = (1..6).to_a.map do
            Pokemon.create(pokemon_team:)
          end
        end
      end
    end
  end
end

in_progress_tournaments.each do |tournament|
  tournament.start_tournament! if tournament.players.checked_in_and_ready.count.positive?
end
