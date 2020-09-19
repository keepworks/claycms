class CreateResource
  include Interactor

  def call
    validate
    create
  end

  protected

  def validate
    name = context.params[:name]
    resource = context.project.resources.find_by(name: name)

    context.fail!(error: "#{name} already exists, please try with different name or update the existing one.") if resource.present?
  end

  def create
    context.resource = context.project.resources.create!(context.params)
  end
end
