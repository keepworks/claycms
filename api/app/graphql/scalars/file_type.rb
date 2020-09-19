module Scalars
  class FileType < BaseScalarType
    graphql_name 'File'

    def self.coerce_input(value, _ctx)
      value
    end

    def self.coerce_result(value, _ctx)
      value
    end
  end
end
