class OrganizationStaffMember < ApplicationRecord
  self.table_name = "organization_staff_members"
  belongs_to :organization, class_name: "Organization"
  belongs_to :account, class_name: "Account"
end
