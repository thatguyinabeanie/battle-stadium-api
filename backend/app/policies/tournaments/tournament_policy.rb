module Tournaments
  class TournamentPolicy < ApplicationPolicy
    def show?
      record.published? || (user && (user.admin? || Pundit.policy(user, record.organization).staff?))
    end

    def update?
      user && (user.admin? || Pundit.policy(user, record.organization).update_tournament?)
    end

    def start_tournament?
      update?
    end

    def destroy?
      user && (user.admin? || Pundit.policy(user, record.organization).delete_tournament?)
    end
  end
end
