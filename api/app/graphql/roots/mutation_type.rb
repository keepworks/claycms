module Roots
  class MutationType < GraphQL::Schema::Object
    include GraphQL::Sugar::Mutation

    mutator :updateProfile

    mutator :createTeam
    mutator :updateTeam
    mutator :createTransferRequest
    mutator :cancelTransferRequest
    mutator :acceptTransferRequest
    mutator :rejectTransferRequest

    mutator :createTeamMembership
    mutator :updateTeamMembership
    mutator :destroyTeamMembership

    mutator :createProject
    mutator :updateProject
    mutator :exportProject
    mutator :importProject

    mutator :createKeyPair
    mutator :revokeKeyPair

    mutator :createAsset
    mutator :updateAsset
    mutator :destroyAsset

    mutator :createEntity
    mutator :updateEntity
    mutator :destroyEntity
    mutator :sortEntities

    mutator :createField
    mutator :updateField
    mutator :destroyField
    mutator :sortFields

    mutator :createRecord
    mutator :cloneRecord
    mutator :updateRecord
    mutator :destroyRecord

    mutator :createResource
    mutator :updateResource
    mutator :destroyResource

    mutator :ssoLogin
    mutator :ssoCallback
    mutator :ssoLogout
  end
end
