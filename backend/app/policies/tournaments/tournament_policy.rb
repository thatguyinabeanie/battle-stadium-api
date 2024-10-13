module Tournaments
  class TournamentPolicy < ApplicationPolicy
    def show?
      record.published? || (account && (account.admin? || Pundit.policy(account, record.organization).staff?))
    end

    def update?
      account && (account.admin? || Pundit.policy(account, record.organization).update_tournament?)
    end

    def start_tournament?
      update?
    end

    def create_match?
      account && (account.admin? || Pundit.policy(account, record.organization).update_tournament?)
    end

    def destroy?
      account && (account.admin? || Pundit.policy(account, record.organization).delete_tournament?)
    end
  end
end
