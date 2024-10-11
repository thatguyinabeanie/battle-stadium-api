class UserProfilePolicy < ApplicationPolicy
  def show?
    record.archived_at.nil? && record.public?
  end

  def create_pokemon_team?
    user == record.user
  end
end
