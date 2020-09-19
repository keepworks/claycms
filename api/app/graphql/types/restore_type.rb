module Types
  class RestoreType < ApplicationType
    model_class Restore

    attribute :status
    attribute :url

    relationship :project
  end
end
