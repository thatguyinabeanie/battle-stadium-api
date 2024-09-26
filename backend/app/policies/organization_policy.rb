class OrganizationPolicy < ApplicationPolicy
  def owner?
    record.owner == user
  end

  def admin?
    super || owner?
  end

  def create?
    user&.admin?
  end

  def update?
    super || admin?
  end

  def staff?
    admin? || record.has_staff_member?(user:)
  end

  def add_staff?
    admin?
  end

  def remove_staff?
    admin?|| owner?
  end

  def create_tournament?
    admin? || record.has_staff_member?(user:)
  end

  def update_tournament?
    create_tournament?
  end

  def create_phase?
    create_tournament?
  end

  def update_phase?
    create_phase?
  end

  def delete_tournament?
    admin?
  end
end
