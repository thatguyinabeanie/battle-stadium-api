FactoryBot.define do
  factory :organization, class: "Organization" do
    name { "Totally Real Organization #{Faker::Company.unique.name}" }
    description { "This is a very deep and meaningful description." }
    owner factory: :account

    after(:create) do |organization, evaluator|
      create_list(:organization_staff_member, 5, organization:)
    end
  end
end
