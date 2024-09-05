FactoryBot.define do
  factory :organization, class: "Organization" do
    name { "Totally Real Organization #{Faker::Company.unique.name}" }
    description { "This is a very deep and meaningful description." }
    owner factory: :user
  end

  factory :organization_with_staff, parent: :organization do
    transient do
      staff_count { 5 }
    end

    after(:create) do |organization, evaluator|
      create_list(:organization_staff_member, evaluator.staff_count, organization:)
    end
  end
end
