class UpdateProject
  include Interactor

  def call
    context.project.update!(context.params)
  end
end
