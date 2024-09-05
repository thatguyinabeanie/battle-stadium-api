# lib/tasks/limitless.rake
require 'net/http'
require 'json'
require 'dotenv/load'

namespace :limitless do
  desc "Import tournaments and organizers from the Limitless TCG API"
  task :import => :environment do
    env_file = '.env'
    Dotenv.load(env_file) if File.exist?(env_file)

    access_key = ENV.fetch('LIMITLESS_API_KEY')

    base_url = "https://play.limitlesstcg.com/api"

    # Fetch all tournaments
    puts "Fetching tournaments..."
    tournaments = fetch_data("#{base_url}/tournaments?limit=10000&game=VGC", access_key)
    organizers = {}
    tournament_details = []

    puts "Processing #{tournaments.count} tournaments..."
    # Fetch details for each tournament and collect organizer information
    tournaments.each do |tournament|

      details = fetch_data("#{base_url}/tournaments/#{tournament['id']}/details", access_key)
      tournament_details << details
      organizer = details['organizer']
      organizers[organizer['id']] = organizer
    end

    puts "Rails Environment: #{Rails.env}"

    owners = {}

    organizers.each do |id, organizer_data|
      puts "Processing organizer owner: #{organizer_data['name']} (ID: #{id})"
      User.find_or_create_by(username: organizer_data['name']) do |u|
        u.first_name = organizer_data['name']
        u.last_name = organizer_data['name']
        u.email = "#{id}@beanie.gg"
        u.password = SecurePassword.generate_secure_password
        if u.save
          puts "Successfully saved organizer owner: #{u.username}, email: #{u.email}"
          owners[id] = u
        else
          puts "Failed to save organizer owner: #{u.username} -  email: #{u.email}. Errors: #{u.errors.full_messages.join(', ')}"
        end

      end
    end

    # Create or update organizers
    organizers.each do |id, organizer_data|
      Organization.find_or_initialize_by(id: id).tap do |organizer|

        puts "Processing organizer: #{organizer_data['name']} (ID: #{id})"

        organizer.name = organizer_data['name']
        organizer.logo_url = organizer_data['logo']
        organizer.owner = User.find_by(username: organizer_data['name'])

        if organizer.save
          puts "Successfully saved organizer: #{organizer.name}"
        else
          puts "Failed to save organizer: #{organizer.name}. Errors: #{organizer.errors.full_messages.join(', ')}"
        end
      end
    end


    # Create or update tournaments
    tournament_details.each do |tournament_data|
      Tournaments::Tournament.find_or_initialize_by(id: tournament_data['id']).tap do |tournament|

        tournament.game_id = Game.find_or_create_by(name: tournament_data['game']).id
        tournament.format_id = Tournaments::Format.find_or_create_by(name: tournament_data['format'], game_id: tournament.game_id).id

        # tournament.format = tournament_data['format']
        tournament.name = "#{tournament_data['name']} #{tournament_data['id']}"
        tournament.start_at = tournament_data['date']
        tournament.check_in_start_at = tournament.start_at - 1.hour

        tournament.organization_id = tournament_data['organizer']['id']
        # tournament.platform = tournament_data['platform']
        # tournament.decklists = tournament_data['decklists']
        # tournament.is_public = tournament_data['isPublic']
        # tournament.is_online = tournament_data['isOnline']
        # tournament.phases = tournament_data['phases']

        if tournament.save
          puts "Successfully saved tournament: #{tournament.name}"
        else
          puts "Failed to save tournament: #{tournament.name}. Errors: #{tournament.errors.full_messages.join(', ')}"
        end
      end
    end

    puts "Import completed. Total tournaments processed: #{tournament_details.count}"
  end

  def fetch_data(url, access_key)
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(uri)
    request['X-Access-Key'] = access_key

    response = http.request(request)

    if response.is_a?(Net::HTTPSuccess)
      JSON.parse(response.body)
    else
      puts "Error: Failed to fetch data from API. URL: #{url}, Status code: #{response.code}"
      puts "Response body: #{response.body}"
      []
    end
  end
end
