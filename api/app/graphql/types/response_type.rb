Types::ResponseType = GraphQL::ObjectType.define do
  name 'Response'

  field :success, !types.Boolean, hash_key: :success
end
