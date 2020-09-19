class CreateTeam
  include Interactor

  def call
    ActiveRecord::Base.transaction do
      create_team
      create_team_membership
    end
  end

  protected

  def create_team
    context.team = Team.create!(context.team_params)
  end

  def create_team_membership
    context.team.team_memberships.create!(
      user: context.current_user,
      role: :owner
    )
  end
end
