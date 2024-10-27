class Rk9Tournament < ApplicationRecord
  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :rk9_id, presence: true, uniqueness: true
end
