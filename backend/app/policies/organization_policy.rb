class OrganizationPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def create?
    user.admin?
  end

  def update?
    user.admin? || record.owner == user
  end

  def destroy?
    user.admin?
  end

  def add_staff?
    user.admin? || record.owner == user
  end

  def remove_staff?
    user.admin? || record.owner == user
  end

  def add_tournament?
    user.admin? || record.owner == user
  end

  def remove_tournament?
    user.admin? || record.owner == user
  end
end
