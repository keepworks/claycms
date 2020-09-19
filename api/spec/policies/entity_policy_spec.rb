require 'rails_helper'

RSpec.describe EntityPolicy do
  include_context 'policy'

  before do
    @project = create(:project, team: @team)
    @entity = create(:entity, project: @project)
  end

  subject { described_class.new(@user, @entity) }

  it_permits :developer, [:view, :update, :destroy, :create_field]
end
