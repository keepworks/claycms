require 'rails_helper'

RSpec.describe UpdateTeam, type: :interactor do
  describe '.call' do
    let(:team) { create(:team, name: 'Team 1') }

    context 'when given valid params' do
      it 'is successful' do
        valid_params = {
          name: 'Team 2'
        }

        result = UpdateTeam.call(params: valid_params, team: team)

        expect(result).to be_a_success
        expect(result.team.name).to eq('Team 2')
      end
    end

    context 'when given invalid params' do
      it 'is a failure' do
        invalid_params = {
          name: ''
        }

        expect { UpdateTeam.call(params: invalid_params, team: team) }.to raise_exception(ActiveRecord::RecordInvalid)
      end
    end
  end
end
