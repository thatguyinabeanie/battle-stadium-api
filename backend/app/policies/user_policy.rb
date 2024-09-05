class UserPolicy < ApplicationPolicy
  def index?
    true
  end

  def password_login?
    true
  end

  def show?
    user == record
  end

  def me?
    user.admin? || user == record
  end

  def patch_password?
    user == record
  end

  def create?
    user&.admin?
  end
end
