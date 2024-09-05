module Tournaments
  class PhasePolicy < ApplicationPolicy
    def index?
      true
    end

    def create?
      user.admin? || Organization.find_by(owner: user).present?
    end

    def update?
      user.admin? || record.tournament.organization.owner == user
    end

    def destroy?
      user.admin? || record.tournament.organization.owner == user
    end
  end
end
