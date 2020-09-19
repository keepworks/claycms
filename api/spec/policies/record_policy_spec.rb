require 'rails_helper'

RSpec.describe RecordPolicy do
  include_context 'policy'

  before do
    @project = create(:project, team: @team)
    @entity = create(:entity, project: @project)
    @record = create(:record, entity: @entity)
  end

  subject { described_class.new(@user, @field) }

  it_permits :editor, [:view, :update, :destroy]
end
