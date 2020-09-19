module Scalars
  class JsonType < BaseScalarType
    graphql_name 'Json'

    def self.coerce_input(value, _ctx)
      value
    end

    def self.coerce_result(value, _ctx)
      value
    end
  end
end
