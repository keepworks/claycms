class RevokeKeyPair
  include Interactor

  def call
    context.key_pair.revoke!
  end
end
