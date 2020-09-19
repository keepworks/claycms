require 'rails_helper'

RSpec.describe UpdateProject, type: :interactor do
  describe '.call' do
    let(:project) { create(:project, name: 'Test Project 1') }

    context 'when given valid params' do
      it 'is successful' do
        valid_params = {
          name: 'Test Project 2'
        }

        result = UpdateProject.call(params: valid_params, project: project)

        expect(result).to be_a_success
        expect(result.project.name).to eq('Test Project 2')
        expect(result.project.team).to eq(project.team)
      end
    end

    context 'when given invalid params' do
      it 'is a failure' do
        invalid_params = {
          name: ''
        }

        expect { UpdateProject.call(params: invalid_params, project: project) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
