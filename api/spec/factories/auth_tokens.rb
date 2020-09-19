FactoryBot.define do
  factory :auth_token do
    jti "MyString"
    aud "MyString"
    user nil
  end
end
