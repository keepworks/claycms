class CreateRecordMutator < ApplicationMutator
  CreateRecordInputType = GraphQL::InputObjectType.define do
    name 'CreateRecordInput'

    parameter :entityId, !types.ID
    parameter :traits, Scalars::HashType
  end

  parameter :input, !CreateRecordInputType

  type Types::RecordType.to_non_null_type

  def mutate
    entity = Entity.find(permitted_params[:entity_id])
    authorize! entity, :create_record?

    result = CreateRecord.call!(params: permitted_params, entity: entity)
    result.record
  end
end
