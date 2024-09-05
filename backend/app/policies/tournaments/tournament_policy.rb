module Tournaments
  class TournamentPolicy < ApplicationPolicy
    def update?
      user.admin? || Pundit.policy(user, record.organization).update_tournament?
    end

    def destroy?
      user.admin? || Pundit.policy(user, record.organization).delete_tournament?
    end
  end
end
