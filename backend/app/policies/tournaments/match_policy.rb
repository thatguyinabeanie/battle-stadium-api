module Tournaments
  class MatchPolicy < ApplicationPolicy
    def show?
      admin? || Pundit.policy(user, record.tournament).show?
    end
    def create?
      admin? || Pundit.policy(user, record.tournament).update?
    end

    def update?
      admin? || Pundit.policy(user, record.tournament).update?
    end

    def destroy?
      admin? || Pundit.policy(user, record.tournament).update?
    end

    def join_chat?
      Pundit.policy(user, record.tournament.organization).staff? || is_match_player?
    end

    private

    def is_match_player?
      [record.player_one, record.player_two].any? { |player| player.profile.user == user }
    end
  end
end
