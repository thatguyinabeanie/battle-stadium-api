FactoryBot.define do
  factory :phase, class: 'Phases::BasePhase' do
    name { 'Epic Swiss Rounds' }
    tournament factory: :tournament
    type { 'Phases::BasePhase' }
    number_of_rounds { 5 }
    criteria { 'this is a criteria' }

    # Define specific factories that inherit from the abstract phase
    factory :swiss_phase, class: 'Phases::Swiss' do
      name { 'Epic Swiss Rounds' }
      type { 'Phases::Swiss' }
      number_of_rounds { 5 }
      criteria { 'this is a criteria for swiss phase' }
    end

    factory :elimination_phase, class: 'Phases::SingleEliminationBracket' do
      name { 'Intense Single Elimination' }
      type { 'Phases::SingleEliminationBracket' }
      number_of_rounds { 3 }
      criteria { 'this is a criteria for elimination phase' }
    end
  end
end
