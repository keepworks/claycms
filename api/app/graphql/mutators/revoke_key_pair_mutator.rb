class RevokeKeyPairMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::KeyPairType.to_non_null_type

  def mutate
    key_pair = KeyPair.find(params[:id])
    authorize! key_pair, :revoke?

    result = RevokeKeyPair.call!(key_pair: key_pair)
    result.key_pair
  end
end
