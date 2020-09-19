class AcceptTransferRequestMutator < ApplicationMutator
  AcceptTransferRequestInputType = GraphQL::InputObjectType.define do
    name 'AcceptTransferRequestInput'

    parameter :token, !types.String
  end

  parameter :input, !AcceptTransferRequestInputType

  type Types::ResponseType.to_non_null_type

  def mutate
    team = Team.find_with_transfer_token(permitted_params[:token])
    raise Exceptions::APIError, 'Your transfer link is invalid.' if team.blank?

    authorize! team, :accept_transfer_request?

    AcceptTransferRequest.call!(team: team)

    { success: true }
  end
end
