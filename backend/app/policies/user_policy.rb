class UserPolicy < ApplicationPolicy
  def show?
    user == record
  end

  def me?
    user.admin? || user == record
  end

  def authorize?
    binding.break
    user == record
  end
end
