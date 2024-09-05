module Tournaments
  class PlayerPolicy < ApplicationPolicy
    def create?
      true
    end

    def update?
      user.admin? || user == record.user || Pundit.policy(user, record.tournament).update?
    end

    def destroy?
      user.admin? || user == record.user || Pundit.policy(user, record.tournament).update?
    end
  end
end
