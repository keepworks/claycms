require 'rails_helper'

RSpec.describe TeamMembershipPolicy, type: :policy do
  include_context 'policy'

  subject { described_class.new(@user) }

  it_permits :manager, [:update, :destroy]
end
