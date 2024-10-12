module Serializers
  class Pokemon < ActiveModel::Serializer
    attributes :pokemon_team_id, :position, :gender
    attributes :nickname, :species
    attributes :ability, :tera_type, :nature, :item, :form
    attributes :move1, :move2, :move3, :move4
  end
end
