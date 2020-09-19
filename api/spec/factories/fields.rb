FactoryBot.define do
  factory :field do
    entity

    sequence(:name) { |n| "Field Name #{n}" }
    sequence(:label) { |n| "Field Label #{n}" }
    data_type :single_line_text
  end
end
