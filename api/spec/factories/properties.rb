FactoryBot.define do
  factory :property do
    record
    field

    sequence(:value) { |n| "Property Name #{n}" }
  end
end
