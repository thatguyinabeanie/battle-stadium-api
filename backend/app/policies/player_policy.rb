
class PlayerPolicy < ApplicationPolicy
  def create?
    admin? || true
  end

  def update?
    admin? || account == record.profile.account || Pundit.policy(account, record.tournament).update?
  end

  def destroy?
    admin? || account == record.profile.account || Pundit.policy(account, record.tournament).update?
  end
end
