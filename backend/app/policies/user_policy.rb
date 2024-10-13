class UserPolicy < ApplicationPolicy
  def me?
    user.admin? || user == record
  end

  def create?
    user&.admin?
  end

  def create_profile?
    user&.admin? || me?
  end
end
