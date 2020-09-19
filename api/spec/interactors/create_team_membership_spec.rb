require 'rails_helper'

RSpec.describe CreateTeamMembership, type: :interactor do
  describe '.call' do
    before(:each) do
      @team = create(:team)
    end

    context 'when invited user already exist' do
      before do
        @email = generate(:email)
      end

      context 'when invited user is confirmed' do
        before do
          @invited_user = create(:user, email: @email)
        end

        context 'when invited user is not part of the team' do
          before do
            @result = CreateTeamMembership.call(team: @team, params: {
              email: @email,
              role: 'editor'
            })
          end

          it 'is successful' do
            expect(@result).to be_a_success
          end

          it 'must create a team membership with the given role' do
            expect(@result.team_membership).to be_present
            expect(@result.team_membership.role).to eq('editor')
          end

          it 'must invite the already existing user' do
            expect(@result.user.email).to eq(@email)
          end
        end

        context 'when invited user is already part of the team' do
          before do
            @invited_user.teams << @team

            @result = CreateTeamMembership.call(team: @team, params: {
              email: @email,
              role: 'editor'
            })
          end

          it 'is failure' do
            expect(@result).to be_a_failure
            expect(@result.error).to eq('Email is already added to the team.')
          end
        end
      end
    end

    context 'when a user is invited with owner role' do
      before do
        @result = CreateTeamMembership.call(team: @team, params: {
          email: generate(:email),
          role: 'owner'
        })
      end

      it 'is failure' do
        expect(@result).to be_a_failure
        expect(@result.error).to eq('Role cannot be owner.')
      end
    end
  end
end
