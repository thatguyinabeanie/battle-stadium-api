# this is a join table and it is not necessary to test it
module Tournaments
  class TournamentFormat < ApplicationRecord
    belongs_to :format, class_name: "Tournaments::Format"
    belongs_to :tournament, class_name: "Tournaments::Tournament"
  end
end
