module Scalars
  class HashType < BaseScalarType
    graphql_name 'Hash'

    def self.coerce_input(value, _ctx)
      value.deep_transform_keys { |key| key.to_s.underscore }
    end

    def self.coerce_result(value, _ctx)
      value.deep_transform_keys { |key| key.to_s.camelize(:lower) }
    end
  end
end
