class Rk9Tournament < ApplicationRecord
  validates :name, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :rk9_id, presence: true, uniqueness: true

  validate :start_date_before_end_date
  has_many :rk9_profiles

  scope :active, -> { where('start_date <= ? AND end_date >= ?', Date.today, Date.today) }
  scope :upcoming, -> { where('start_date > ?', Date.today) }
  scope :past, -> { where('end_date < ?', Date.today) }

  def active?
    start_date <= Date.today && end_date >= Date.today
  end

  def upcoming?
    start_date > Date.today
  end

  def past?
    end_date < Date.today
  end
  private

  def start_date_before_end_date
    return if start_date.blank? || end_date.blank?

    if start_date > end_date
      errors.add(:start_date, "must be before end date")
    end
  end
end
