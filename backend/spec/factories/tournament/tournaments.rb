FactoryBot.define do
  factory :tournament, class: "Tournaments::Tournament" do
    organization factory: :organization

    format { create(:format) }
    game { format.game }

    name { "#{Faker::Game.title} - #{Faker::Internet.unique.username} - Tournament ##{Faker::Number.unique}" }
    phases { [] }
    start_at   { 1.hour.from_now }
    started_at { nil }
    players { [] }

    end_at { start_at + 1.day }
    ended_at { nil }

    late_registration { true }
    registration_start_at { start_at - 1.week }
    registration_end_at { start_at }

    check_in_start_at { start_at - 2.hours }

    trait :with_phases do
      after(:create) do |tournament|
        tournament.phases = create_list(:swiss_phase, 3, tournament:)
        tournament.save
      end
    end

    trait :with_players_with_team do
      after(:create) do |tournament|
        create_list(:player_with_team, 5, tournament:)
      end
    end

    trait :with_players_checked_in do
      after(:create) do |tournament|
        create_list(:player_checked_in, 5, tournament:)
      end
    end

    trait :with_players_with_team_and_checked_in do
      after(:create) do |tournament|
        create_list(:player_with_team_and_checked_in, 5, tournament:)
      end
    end
  end
end
