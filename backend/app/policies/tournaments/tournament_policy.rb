module Tournaments
  class TournamentPolicy < ApplicationPolicy
    def index?
      true
    end

    def staff?
      user.admin? || record.organization.staff_members.include?(user)
    end

    def post_tournaments?
      user.admin? || record.organization.owner == user
    end

    def patch_tournament?
      user.admin? || record.organization.owner == user
    end
  end
end
