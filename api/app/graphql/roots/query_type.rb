module Roots
  class QueryType < GraphQL::Schema::Object
    include GraphQL::Sugar::Query

    resolver :currentUser

    resolver :teams

    resolver :team

    resolver :teamMemberships

    resolver :projects

    resolver :project

    resolver :keyPairs

    resolver :assets

    resolver :entities

    resolver :referencedEntities

    resolver :entity

    resolver :fields

    resolver :records

    resolver :record

    resolver :exports

    resolver :restores

    resolver :resources
  end
end
