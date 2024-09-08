module Tournaments
  class PlayerPolicy < ApplicationPolicy
    def create?
      admin? || record.user.id == user.id
    end

    def update?
      admin? || user == record.user || Pundit.policy(user, record.tournament).update?
    end

    def destroy?
      admin? || user == record.user || Pundit.policy(user, record.tournament).update?
    end
  end
end
