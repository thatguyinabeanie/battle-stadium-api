# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def index?
    true
  end

  def show?
    false || user.admin?
  end

  def create?
    false || user.admin?
  end

  def new?
    create? || user.admin?
  end

  def update?
    false || user.admin?
  end

  def edit?
    update? || user.admin?
  end

  def destroy?
    false || user.admin?
  end

  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      raise NoMethodError, "You must define #resolve in #{self.class}"
    end

    private

    attr_reader :user, :scope
  end
end
