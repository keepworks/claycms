FactoryBot.define do
  factory :team do
    name { FFaker::Company.name }
  end
end
