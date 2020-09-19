class UpdateTeam
  include Interactor

  def call
    context.team.update!(context.params)
  end
end
