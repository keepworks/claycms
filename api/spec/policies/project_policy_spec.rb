require 'rails_helper'

RSpec.describe ProjectPolicy do
  include_context 'policy'

  before do
    @project = create(:project, team: @team)
  end

  subject { described_class.new(@user, @project) }

  it_permits :editor, [:view, :view_assets, :view_exports, :view_imports, :view_key_pairs, :view_entities, :create_asset, :create_key_pair, :create_entity]
  it_permits :manager, [:update]
end
