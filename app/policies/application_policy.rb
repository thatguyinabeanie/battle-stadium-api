# frozen_string_literal: true

class ApplicationPolicy
  attr_reader :account, :record

  def initialize(account, record)
    @account = account
    @record = record
  end

  def admin?
    account&.admin?
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
    admin?
  end

  def new?
    create? || admin?
  end

  def update?
    admin?
  end

  def edit?
    update? || admin?
  end

  def destroy?
    admin?
  end

  class Scope
    def initialize(account, scope)
      @account = account
      @scope = scope
    end

    def resolve
      raise NoMethodError, "You must define #resolve in #{self.class}"
    end

    private

    attr_reader :account, :scope
  end
end
