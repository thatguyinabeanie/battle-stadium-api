
class PhasePolicy < ApplicationPolicy
  def update?
    account.admin? || Pundit.policy(account, record.tournament).update?
  end

  def destroy?
    account.admin? || Pundit.policy(account, record.tournament).update?
  end
  end
