# this is a join table and it is not necessary to test it

class TournamentFormat < ApplicationRecord
  belongs_to :format, class_name: "Format"
  belongs_to :tournament, class_name: "Tournament"
  end
