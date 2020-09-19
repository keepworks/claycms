class TeamResolver < ApplicationResolver
  parameter :id, !types.ID

  def resolve
    context[:current_user].teams.find(params[:id])
  end
end
