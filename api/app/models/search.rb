class Search
  ALLOWED_SCOPE = %w[field record].freeze

  class << self
    def scope(query:, scope:, project_id:)
      return unless ALLOWED_SCOPE.include?(scope)

      public_send("#{scope}_search", query, project_id)
    end

    def field_search(query, project_id)
      fields = Field.includes(
        entity: :project,
        referenced_entity: :project
      ).where(
        projects: {
          id: project_id
        }
      )

      fields.where('fields.name ILIKE?', "%#{query}%")
        .or(fields.where('fields.label ILIKE?', "%#{query}%"))
    end

    def record_search(query, project_id)
      record_ids = Property.includes(record: { entity: :project }, linked_record: {entity: :project})
                           .where(projects: { id: project_id })
                           .where('value ILIKE ?', "%#{query}%")
                           .pluck(:record_id).uniq

      Record.where(id: record_ids)
    end
  end
end
