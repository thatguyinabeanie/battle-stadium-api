# Assuming you have factories for tournament, player, and round defined elsewhere
FactoryBot.define do
  factory :match, class: 'Tournaments::Match' do
    round factory: :swiss_round
    table_number { 1 }

    player_one factory: :player
    player_two factory: :player

    player_one_check_in { nil }
    player_two_check_in { nil }

    winner { nil }
    loser { nil }
  end
end
