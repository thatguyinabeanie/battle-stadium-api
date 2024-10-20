class ProfilePolicy < ApplicationPolicy
  def show?
    record.archived_at.nil? || account == record.account || account.admin?
  end

  def profile_owner?
    account == record.account
  end

  def create_pokemon_team?
    profile_owner?
  end

  def register_for_tournament?
    profile_owner?
  end
end
