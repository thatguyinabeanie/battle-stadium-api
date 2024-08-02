require_relative 'user_serializer'
require_relative 'pokemon_set_serializer'

module Serializer
  module PlayerMixin
    extend ActiveSupport::Concern
    included do
      include SerializerMixin::Id

      attributes :in_game_name
      # attributes :checked_in_at, :checked_in
      # attributes :team_sheet_submitted, :team_sheet_submitted_at
      belongs_to :user, serializer: Serializer::User

      def checked_in
        object.checked_in_at.present?
      end
    end
  end

  class Player < ActiveModel::Serializer
    include PlayerMixin
  end

  class PlayerDetails < ActiveModel::Serializer
    include PlayerMixin
  end
end
