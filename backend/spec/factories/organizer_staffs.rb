FactoryBot.define do
  factory :organization_staff_member, class: "OrganizationStaffMember" do
    organization
    user factory: :user
  end
end
