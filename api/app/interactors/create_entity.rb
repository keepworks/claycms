class CreateEntity
  include Interactor

  def call
    context.entity = context.project.entities.create!(context.params)
  end
end
