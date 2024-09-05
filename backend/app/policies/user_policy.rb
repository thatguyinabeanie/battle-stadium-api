class UserPolicy < ApplicationPolicy
  def password_login?
    true
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
