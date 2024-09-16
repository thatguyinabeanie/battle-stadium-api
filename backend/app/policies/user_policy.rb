class UserPolicy < ApplicationPolicy
  def me?
    user.admin? || user == record
  end

  def create?
    user&.admin?
  end
end
