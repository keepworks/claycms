FactoryBot.define do
  factory :asset do
    project

    sequence(:name) { |n| "Asset #{n}" }
    file { File.open(Rails.root.join('fixtures', 'assets', 'logo.png')) }
  end
end
