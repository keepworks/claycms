FactoryBot.define do
  sequence(:email) { |n| "user#{n}@example.com" }

  factory :user do
    email
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
  end
end
