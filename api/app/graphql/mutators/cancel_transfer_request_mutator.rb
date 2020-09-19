class CancelTransferRequestMutator < ApplicationMutator
  parameter :id, !types.ID

  type Types::TeamType.to_non_null_type

  def mutate
    team = Team.find(params[:id])
    authorize! team, :cancel_transfer_request?

    result = CancelTransferRequest.call!(team: team)

    result.team
  end
end
