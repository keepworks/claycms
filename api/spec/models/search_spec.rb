require 'rails_helper'

RSpec.describe Search do
  describe '#scope' do
    let(:project) { create(:project) }
    let(:entity) { create(:entity, project: project) }
    let(:record) { create(:record, entity: entity) }

    it 'should raise error when scope is not present as argument' do
      expect { Search.scope(query: 'Test') }.to raise_error(ArgumentError)
    end

    it 'should return nil, for scope which are not in in ALLOWED_SCOPE' do
      expect(Search.scope(query: 'Test', scope: 'Test', project_id: project.id)).to be(nil)
    end

    context 'when scope is entity' do
      context 'when matching entities are found' do
        it 'should return object of type Entity' do
          5.times { |i| create(:field, name: "Test-#{i}", entity: entity) }

          res = Search.scope(query: 'test', scope: 'field', project_id: project.id)

          expect(res.klass).to be(Field)
        end
      end
    end

    context 'when scope is record' do
      context 'when matching records are found' do
        it 'should return object of type Record' do
          field = create(:field, name: 'Test', entity: entity)
          5.times { |i| create(:property, field: field, record: record, value: "Test-#{i}") }

          res = Search.scope(query: 'test', scope: 'record', project_id: project.id)

          expect(res.klass).to be(Record)
        end
      end
    end
  end
end
