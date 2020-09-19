module Types
  class ResourceType < ApplicationType
    model_class Resource

    attribute :name
    file_field :file, public: true

    field :metadata, Scalars::HashType, null: false, resolve: ->(obj, args, ctx) { obj.file.metadata }

    relationship :project
  end
end
