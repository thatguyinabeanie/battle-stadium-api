class AddUniqueIndexToRoundsOnPhaseIdAndRoundNumber < ActiveRecord::Migration[7.1]
  def change
    add_index :rounds, %i[phase_id round_number], unique: true
  end
end
