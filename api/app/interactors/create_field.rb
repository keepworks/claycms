class CreateField
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      process
      create_field
    end
  end

  protected

  def process
    context.entities = context.entity.project.entities
    context.field_attributes = process_field(context.params)
  end

  def create_field
    context.field = context.entity.fields.create!(context.field_attributes)
  end

  def process_field(field)
    field_params = field.except(:children, :referenced_entity_name)

    if context.is_import
      referenced_entity = context.entities.find_by(name: field[:referenced_entity_name])
      field_params[:referenced_entity_id] = referenced_entity&.id
    end

    children_attributes = process_children(field_params, field[:children])
    field_params[:children_attributes] = children_attributes if children_attributes.present?

    field_params
  end

  def process_children(parent, children)
    if parent[:data_type]&.to_sym == :array
      sub_parent = {
        name: "#{parent[:name]}_item",
        label: parent[:label].singularize,
        position: 0,
        data_type: parent[:element_type],
        referenced_entity_id: parent[:referenced_entity_id]
      }

      sub_parent[:children_attributes] = process_children(sub_parent, children) if children.present?

      [sub_parent]
    else
      (children || []).map { |child| process_field(child) }
    end
  end
end
