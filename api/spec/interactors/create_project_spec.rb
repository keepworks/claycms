require 'rails_helper'

RSpec.describe CreateProject, type: :interactor do
  describe '.call' do
    let(:team) { create(:team) }

    context 'when given valid params' do
      before do
        @valid_params = {
          team_id: team.id,
          name: "Project #{team.id}-1"
        }
      end

      it 'is successful' do
        result = CreateProject.call(params: @valid_params, team: team)

        expect(result).to be_a_success
        expect(result.project.name).to eq("Project #{team.id}-1")
      end

      it 'creates a key pair for the project' do
        result = CreateProject.call(params: @valid_params, team: team)

        expect(result).to be_a_success
        expect(result.project.key_pairs.length).to eq(1)
      end
    end

    context 'when given invalid params' do
      it 'is a failure' do
        invalid_params = {
          team_id: team.id,
          name: ''
        }

        expect { CreateProject.call(params: invalid_params, team: team) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
