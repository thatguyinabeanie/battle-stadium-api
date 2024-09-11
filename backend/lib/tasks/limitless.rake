# lib/tasks/limitless.rake
require 'net/http'
require 'json'
require 'dotenv/load'
require 'retries'
require 'date'

namespace :limitless do
  desc "Import tournaments and organizers from the Limitless TCG API"
  task :import, [:limit] => :environment do |t, args|
    env_file = '.env'
    Dotenv.load(env_file) if File.exist?(env_file)

    access_key = ENV.fetch('LIMITLESS_API_KEY')
    limit = args[:limit] || 50000

    base_url = "https://play.limitlesstcg.com/api"

    # Fetch all tournaments
    puts "Fetching tournaments..."
    tournaments = fetch_data("#{base_url}/tournaments?limit=#{limit}&game=VGC", access_key)
    organizers = {}

    @games = {}
    @formats = {}

    def get_game_id(game_name)
      @games[game_name] ||= Game.find_or_create_by(name: game_name).id
      @games[game_name]
    end

    def get_format_id(format_name, game_id)
      @formats[format_name] ||= Tournaments::Format.find_or_create_by(name: format_name, game_id: game_id).id
      @formats[format_name]
    end

    puts "Fetching #{tournaments.count} tournaments..."
    Parallel.map(tournaments, in_threads: 10) do |tournament|
      tour_details = fetch_data("#{base_url}/tournaments/#{tournament['id']}/details", access_key)
      organizer =  tour_details['organizer']

      if organizers[organizer['id']].nil?
        organizers[organizer['id']] =
        {
          'id' => organizer['id'],
          'name' => organizer['name'],
          'logo_url' => organizer['logo'],
          'tournaments' => [tour_details.merge(
            'bs_game_id' => get_game_id(tour_details['game']),
            'bs_format_id' => get_format_id(tour_details['format'], organizer['id']))
          ],
        }
      else
        org = organizers[organizer['id']]
        org['tournaments'] <<   tour_details.merge('bs_game_id' => get_game_id(tour_details['game']),
          'bs_format_id' => get_format_id(tour_details['format'], organizer['id']))
        org['logo_url'] = organizer['logo'] if organizer['logo_url'].nil? && !organizer['logo'].nil?
      end
    end

    errors = []
    puts "Processing Organizers..."
    Parallel.map(organizers, in_threads: 10) do |id, organizer_data|

      puts "Processing organizer: #{organizer_data['name']} (ID: #{id})"
      org = Organization.find_or_create_by(name: organizer_data['name']).tap do |organizer|
        organizer.logo_url = organizer_data['logo']
        organizer.hidden = organizer.logo_url.nil?
        # puts "Done Processing organizer: #{organizer_data['name']} (ID: #{id})"
      end

      puts "Processing Tournaments for organizer: #{organizer_data['name']} (ID: #{id})"
      organizer_data['tournaments'].each do |tournament_data|
        start_at = DateTime.parse(tournament_data['date'])
        name = tournament_data['name']
        organization_id = org.id

        begin
          org.tournaments.find_or_create_by!(name: , start_at:, organization_id:) do |tour|
            tour.limitless_id = tournament_data['id']
            tour.game_id= tournament_data['bs_game_id']
            tour.format_id =tournament_data['bs_format_id']
            tour.check_in_start_at = tour.start_at - 1.hour
          end
        rescue ActiveRecord::RecordInvalid => e
          errors << {
            type: 'already_processed',
            id: tournament_data['id'],
            data: tournament_data,
            error: e.message
          }
        rescue StandardError => e
          errors << {
            type: 'shrug',
            id: tournament_data['id'],
            data: tournament_data,
            error: e.message
          }
        end

      end
    end

    if errors.any?
      puts "Errors occurred during processing:"
      errors.each do |error|
        puts "Error type: #{error[:type]}, ID: #{error[:id]}, Error: #{error[:error]}"
        puts "Data: #{error[:data]}"
      end
    end

    puts "Import completed. Total tournaments processed: #{tournaments.count}"
  end

  def fetch_data(url, access_key)
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.read_timeout = 10 # Set read timeout to 10 seconds
    http.open_timeout = 5  # Set open timeout to 5 seconds


    request = Net::HTTP::Get.new(uri)
    request['X-Access-Key'] = access_key

    response = nil
    with_retries(max_tries: 3, base_sleep_seconds: 1.0, max_sleep_seconds: 5.0) do
      response = http.request(request)
    end


    if response.is_a?(Net::HTTPSuccess)
      JSON.parse(response.body)
    else
      puts "Error: Failed to fetch data from API. URL: #{url}, Status code: #{response.code}"
      puts "Response body: #{response.body}"
      []
    end
  rescue Net::OpenTimeout, Net::ReadTimeout => e
    puts "Error: Timeout while fetching data from API. URL: #{url}, Error: #{e.message}"
    []
  rescue StandardError => e
    puts "Error: An unexpected error occurred. URL: #{url}, Error: #{e.message}"
    []
  end
end
