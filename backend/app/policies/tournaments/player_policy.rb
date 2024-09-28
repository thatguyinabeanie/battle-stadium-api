module Tournaments
  class PlayerPolicy < ApplicationPolicy
    def create?
      admin? || true
    end

    def update?
      admin? || user == record.profile.user || Pundit.policy(user, record.tournament).update?
    end

    def destroy?

      admin? || user == record.profile.user || Pundit.policy(user, record.tournament).update?
    end
  end
end
