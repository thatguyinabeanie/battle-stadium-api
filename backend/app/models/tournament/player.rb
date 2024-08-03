module Tournament
  class Player < ApplicationRecord
    MAX_POKEMON_SUBMISSIONS = 6
    self.table_name = 'players'
    belongs_to :user, class_name: 'User'
    belongs_to :tournament, class_name: 'Tournament::Tournament', inverse_of: :players
    belongs_to :pokemon_team, class_name: 'PokemonTeam', optional: true

    validates :user_id, presence: true
    validates :tournament_id, presence: true
    validates :user_id, uniqueness: { scope: :tournament_id, message: I18n.t('tournament.registration.already_registered') }

    validates :in_game_name, presence: true

    accepts_nested_attributes_for :pokemon_team

    delegate :username, to: :user

    def checked_in?
      checked_in_at.present?
    end
  end
end