class OrganizationPolicy < ApplicationPolicy
  def update?
    super || record.owner == user
  end

  def staff?
    true
  end

  def add_staff?
    user.admin? || record.owner == user
  end

  def remove_staff?
    user.admin? || record.owner == user
  end

  def create_tournament?
    user.admin? || record.owner == user || record.staff_members.include?(user)
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
    user.admin? || record.owner == user
  end
end
