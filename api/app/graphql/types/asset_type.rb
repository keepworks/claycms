module Types
  class AssetType < ApplicationType
    model_class Asset

    attribute :name
    file_field :file, :original, public: true

    field :metadata, Scalars::HashType, null: false, method: :metadata

    relationship :project
  end
end
