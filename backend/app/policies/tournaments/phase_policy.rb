module Tournaments
  class PhasePolicy < ApplicationPolicy
    def update?
      user.admin? || Pundit.policy(user, record.tournament)
    end

    def destroy?
      user.admin? || Pundit.policy(user, record.tournament)
    end
  end
end
