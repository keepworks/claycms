class GraphqlPolicy
  def self.guard(type, field)
    rules.dig(type.name, field)
  end

  def self.authorize_user
    ->(obj, args, ctx) { ctx[:current_user].present? }
  end

  def self.authorize_any
    ->(obj, args, ctx) { true }
  end

  def self.authorize_none
    ->(obj, args, ctx) { false }
  end

  def self.current_user_matches?(attribute)
    ->(obj, args, ctx) { authorize_user.call(obj, args, ctx) && obj.object.send(attribute) == ctx[:current_user].id }
  end

  def self.rules
    @rules ||= {
      'Query' => {
        '*': authorize_user
      },
      'Mutation' => {
        '*': authorize_user,
        ssoLogin: authorize_any,
        ssoCallback: authorize_any
      },

      'User' => {
        sessions: current_user_matches?(:id)
      }
    }
  end
end
