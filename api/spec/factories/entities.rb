FactoryBot.define do
  factory :entity do
    project

    sequence(:name) { |n| "Entity Name #{n}" }
    sequence(:label) { |n| "Entity Label #{n}" }
  end
end
