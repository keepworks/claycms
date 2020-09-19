class RejectTransferRequestMutator < ApplicationMutator
  RejectTransferRequestInputType = GraphQL::InputObjectType.define do
    name 'RejectTransferRequestInput'

    parameter :token, !types.String
  end

  parameter :input, !RejectTransferRequestInputType

  type Types::ResponseType.to_non_null_type

  def mutate
    team = Team.find_with_transfer_token(permitted_params[:token])
    raise Exceptions::APIError, 'Your transfer link is invalid.' if team.blank?

    authorize! team, :reject_transfer_request?

    RejectTransferRequest.call!(team: team)

    { success: true }
  end
end
