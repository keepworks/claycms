require 'rails_helper'

RSpec.describe AssetPolicy do
  include_context 'policy'

  before do
    @project = create(:project, team: @team)
    @asset = create(:asset, project: @project)
  end

  subject { described_class.new(@user, @asset) }

  it_permits :manager, [:update, :destroy]
end
