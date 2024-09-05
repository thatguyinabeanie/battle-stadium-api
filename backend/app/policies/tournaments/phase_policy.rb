module Tournaments
  class PhasePolicy < ApplicationPolicy
    def update?
      user.admin? || Pundit.policy(user, record.tournament).update?
    end

    def destroy?
      user.admin? || Pundit.policy(user, record.tournament).update?
    end
  end
end
