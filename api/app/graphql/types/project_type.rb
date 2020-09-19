module Types
  class ProjectType < ApplicationType
    model_class Project

    attribute :name

    field :isRestoring, Boolean, null: false, resolve: ->(obj, args, ctx) { obj.restores.pending.present? }

    relationship :team
    relationship :entities
  end
end
