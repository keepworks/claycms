class UpdateField
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      process
      update_field
    end
  end

  protected

  def process
    context.field_attributes = process_field(context.field, context.params)
  end

  def update_field
    context.field.update!(context.field_attributes)
  end

  def process_field(field, params)
    field_params = params.except(:children)

    children_attributes = process_children(field, params)
    field_params[:id] = field.id if field.present?
    field_params[:children_attributes] = children_attributes if children_attributes.present?

    field_params
  end

  def process_children(parent, params)
    children = params[:children]

    if parent&.array?
      sub_parent = parent.children.first
      sub_parent_attributes = {
        name: "#{params[:name]}_item",
        label: params[:label].singularize,
        data_type: params[:element_type],
        referenced_entity_id: params[:referenced_entity_id]
      }

      sub_parent_attributes[:id] = sub_parent.id if sub_parent.present?
      sub_parent_attributes[:children_attributes] = process_children(sub_parent, params) if children.present?

      [sub_parent_attributes]
    else
      (children || []).map do |child|
        field = parent&.children&.find_by(id: child[:id])
        field = Field.new(child.except(:children)) if field.blank?

        process_field(field, child)
      end
    end
  end
end
