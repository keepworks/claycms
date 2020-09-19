module V1
  class ContentController < BaseCurrentProjectController
    def find
      entity = current_project.entities.find_by!(name: params[:entity_name])

      record_scope = entity.records

      filters = params[:filters].presence || {}

      filters.each do |field_name, property_value|
        record_scope = record_scope.joins(properties: :field)
        record_scope = record_scope.where(fields: { name: field_name })
        record_scope = record_scope.where(properties: { value: property_value })
      end

      # sort = params[:sort] || {}
      # sort.each do |field_name, sort_direction|
      #   record_scope = record_scope.order(field_name, sort_direction)
      # end

      # if params[:paging].present?
      #   record_scope = record_scope.limit(params[:paging][:limit]) if params[:paging][:limit].present?
      #   record_scope = record_scope.offset(params[:paging][:offset]) if params[:paging][:offset].present?
      # end

      result_type = params[:result_type].try(:to_sym) || (entity.singleton? ? :one : :many)

      record_mapper = RecordMapper.new

      if result_type == :one
        record = record_scope.first!
        data = record_mapper.to_json(record, params[:key_type])
      else
        raise Exceptions::APIError, "Cannot find `many` of singleton entity, `#{entity.name}`." if entity.singleton?

        data = record_scope.map { |r| record_mapper.to_json(r, params[:key_type]) }
      end

      render json: { data: data }
    end
  end
end
