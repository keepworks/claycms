class ClayApiSchema < GraphQL::Schema
  query Roots::QueryType
  mutation Roots::MutationType

  use GraphQL::Guard.new(policy_object: GraphqlPolicy)
end
