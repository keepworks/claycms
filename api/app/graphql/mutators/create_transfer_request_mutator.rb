class CreateTransferRequestMutator < ApplicationMutator
  CreateTransferRequestInputType = GraphQL::InputObjectType.define do
    name 'CreateTransferRequestInput'

    parameter :userId, !types.ID
  end

  parameter :id, !types.ID
  parameter :input, !CreateTransferRequestInputType

  type Types::TeamType.to_non_null_type

  def mutate
    team = Team.find(params[:id])
    authorize! team, :create_transfer_request?

    CreateTransferRequest.call!(params: permitted_params, team: team)

    team
  end
end
