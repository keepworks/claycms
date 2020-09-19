class SsoCallbackMutator < ApplicationMutator
  SsoCallbackInputType = GraphQL::InputObjectType.define do
    name 'SsoCallbackInput'

    parameter :sso, !types.String
    parameter :sig, !types.String
  end

  parameter :input, !SsoCallbackInputType

  type Scalars::HashType

  def mutate
    context = SsoCallback.call(
      params: permitted_params,
      user_agent: @context[:current_request].user_agent
    )
    context.sso_payload
  end
end
