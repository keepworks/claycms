class ApplicationFunction < GraphQL::Function
  include GraphQL::Sugar::Function

  def policy(model_or_record)
    @policy = Pundit.policy!(context[:current_user], model_or_record)
  end

  def authorize!(model_or_record, permission)
    resolved_policy = policy(model_or_record)
    raise Exceptions::Forbidden if !resolved_policy.respond_to?(permission) || !resolved_policy.send(permission)
  end
end
