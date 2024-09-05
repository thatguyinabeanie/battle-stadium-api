module Tournaments
  class TournamentPolicy < ApplicationPolicy
    def update?
      user.admin? || Pundit.policy(user, record.organization)
    end

    def destroy?
      user.admin? || Pundit.policy(user, record.organization)
    end

    def create_phase?
      user.admin? || Pundit.policy(user, record.organization)
    end
  end
end
