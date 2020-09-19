require 'rails_helper'

RSpec.describe TeamPolicy, type: :policy do
  include_context 'policy'

  subject { described_class.new(@user, @team) }

  it_permits :editor, [:view, :view_team_memberships, :view_projects, :accept_transfer_request, :reject_transfer_request]
  it_permits :manager, [:create_team_membership, :create_project, :export_project, :import_project]
  it_permits :owner, [:update, :destroy, :create_transfer_request, :cancel_transfer_request]
end
