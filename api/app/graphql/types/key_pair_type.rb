module Types
  class KeyPairType < ApplicationType
    model_class KeyPair

    attribute :public_key

    relationship :project
  end
end
