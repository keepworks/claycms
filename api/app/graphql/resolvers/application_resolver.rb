class ApplicationResolver < ApplicationFunction
  include GraphQL::Sugar::Resolver

  def resolved_object(allowed_classes = [])
    parent = object.respond_to?(:object) ? object.object : object

    if allowed_classes.present?
      allowed_classes = Array.wrap(allowed_classes)
      raise Exceptions::Forbidden if allowed_classes.all? { |c| !parent.is_a?(c) }
    end

    parent
  end

  def self.sortable
    parameter :sort, types.String
    parameter :sortDirection, types.String
  end

  def self.pageable
    parameter :first, types.Int
    parameter :skip, types.Int
  end

  def sorted_and_paged(records)
    paged(sorted(records))
  end

  def sorted(records)
    records = records.order(params[:sort] => (params[:sort_direction] || 'asc')) if params[:sort].present?
    records
  end

  def paged(records)
    records = records.limit(params[:first]) if params[:first].present?
    records = records.offset(params[:skip]) if params[:skip].present?
    records
  end
end
