class UserProfilePolicy < ApplicationPolicy
  def show?
    (record.archived_at.nil?) || user == record.user || user.admin?
  end

  def create_pokemon_team?
    user == record.user
  end
end
