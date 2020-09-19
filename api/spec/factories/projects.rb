FactoryBot.define do
  factory :project do
    sequence(:name) { |n| "Project #{n}" }

    team
  end
end
