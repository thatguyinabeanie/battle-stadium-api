module Tournaments
  class Round < ApplicationRecord
    self.table_name = 'rounds'
    belongs_to :phase, class_name: 'Phases::BasePhase', inverse_of: :rounds
    has_many :matches, class_name: 'Tournaments::Match', dependent: :destroy, inverse_of: :round

    validates :phase, presence: true
    validates :phase, uniqueness: { scope: :round_number }

    validates :round_number, presence: true
    validates :round_number, uniqueness: { scope: :phase_id }
  end
end
