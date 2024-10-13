class UserProfilePolicy < ApplicationPolicy
  def show?
    (record.archived_at.nil?) || account == record.account || account.admin?
  end

  def create_pokemon_team?
    account == record.account
  end
end
