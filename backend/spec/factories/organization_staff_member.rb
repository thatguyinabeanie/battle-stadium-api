FactoryBot.define do
  factory :organization_staff_member, class: "OrganizationStaffMember" do
    organization
    account factory: :account
  end
end
