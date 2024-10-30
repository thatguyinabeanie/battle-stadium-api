class GamePolicy < ApplicationPolicy
  def create?
    admin?
  end

  def update?
    account.admin?
  end

  def destroy?
    admin?
  end
end
