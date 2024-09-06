# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def admin?
    user&.admin?
  end

  def index?
    true
  end

  def list?
    index?
  end

  def show?
    true
  end

  def create?
    false || admin?
  end

  def new?
    create? || admin?
  end

  def update?
    false || admin?
  end

  def edit?
    update? || admin?
  end

  def destroy?
    false || admin?
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
