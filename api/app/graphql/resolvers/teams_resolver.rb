class TeamsResolver < ApplicationResolver
  sortable
  pageable

  def resolve
    sorted_and_paged(context[:current_user].teams)
  end
end
