module Types
  class ExportType < ApplicationType
    model_class Export

    attribute :status

    file_field :file, public: true

    field :metadata, Scalars::HashType, null: true, resolve: ->(obj, args, ctx) { obj&.file&.metadata }

    relationship :project
  end
end
