class StartTournamentJob
  include Sidekiq::Job

  def perform(tournament_id)


    # Add any additional logic needed to start the tournament
  end
end
