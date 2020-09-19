class CreateProject
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      context.project = context.team.projects.create!(context.params.slice(:name))
      context.project.key_pairs.create!
    end
  end
end
