module Types
  class RecordType < ApplicationType
    model_class Record

    field :properties, [Types::PropertyType], null: false, method: :nested_properties

    relationship :entity
  end
end
