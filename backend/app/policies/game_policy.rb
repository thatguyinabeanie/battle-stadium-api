class GamePolicy < ApplicationPolicy
  def create?
    admin?
  end

  def update?
    user.admin?
  end

  def destroy?
    admin?
  end
end
