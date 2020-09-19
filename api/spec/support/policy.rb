ROLES = [:guest, :editor, :developer, :manager, :owner].freeze

RSpec.shared_context 'policy' do
  before do
    @user = create(:user)
    @team = create(:team)
  end

  def self.it_permits(role, actions)
    ROLES.each_with_index do |current_role, index|
      role_index = ROLES.find_index(role)

      is_granted = index >= role_index if role_index.present?

      it "#{is_granted ? 'grants' : 'denies'} #{actions} for #{current_role}" do
        create(:team_membership, user: @user, team: @team, role: current_role) if current_role != :guest

        is_granted ? permit_actions(actions) : forbid_actions(actions)
      end
    end
  end
end
