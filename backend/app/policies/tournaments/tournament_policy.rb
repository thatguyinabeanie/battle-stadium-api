module Tournaments
  class TournamentPolicy < ApplicationPolicy
    def staff?
      user.admin? || record.organization.staff_members.include?(user)
    end

    def create_tournament?
      user.admin? || record.organization.owner == user
    end

    def update_tournament?
      user.admin? || record.organization.owner == user
    end

    def create?
      user.admin? || record.organization.owner == user
    end

    def update?
      user.admin? || record.organization.owner == user
    end

    def destroy?
      user.admin? || record.organization.owner == user
    end
  end
end
