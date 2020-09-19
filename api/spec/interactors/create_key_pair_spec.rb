require 'rails_helper'

RSpec.describe CreateKeyPair, type: :interactor do
  describe '.call' do
    let(:project) { create(:project) }

    it 'is successful when given a project' do
      result = CreateKeyPair.call(project: project)

      expect(result).to be_a_success
      expect(result.key_pair.project_id).to eq(project.id)
      expect(result.key_pair.public_key).to be_present
    end
  end
end
