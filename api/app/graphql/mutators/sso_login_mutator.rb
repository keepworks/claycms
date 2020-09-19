class SsoLoginMutator < ApplicationMutator
  type Scalars::HashType

  def mutate
    context = SsoLogin.call
    context.sso_payload
  end
end
