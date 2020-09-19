require 'rails_helper'

RSpec.describe FieldPolicy do
  include_context 'policy'

  before do
    @project = create(:project, team: @team)
    @entity = create(:entity, project: @project)
    @field = create(:field, entity: @entity)
  end

  subject { described_class.new(@user, @field) }

  it_permits :developer, [:view, :update, :destroy]
end
