class AccountPolicy < ApplicationPolicy
  def me?
    account.admin? || account == record
  end

  def create?
    account&.admin?
  end

  def create_profile?
    account&.admin? || me?
  end
end
