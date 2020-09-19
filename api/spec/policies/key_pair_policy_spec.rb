require 'rails_helper'

RSpec.describe KeyPairPolicy do
  include_context 'policy'

  before do
    @project = create(:project, team: @team)
    @key_pair = create(:key_pair, project: @project)
  end

  subject { described_class.new(@user, @key_pair) }

  it_permits :developer, [:revoke]
end
