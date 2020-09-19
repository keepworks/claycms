require 'rails_helper'

RSpec.describe AppUrl do
  describe '.build' do
    context 'in development' do
      around do |example|
        ClimateControl.modify APP_HOST: 'pigeonapp-dev.io', APP_PORT: '8080' do
          example.run
        end
      end

      it 'returns URL with http scheme and port' do
        expect(AppUrl.build).to eq('http://pigeonapp-dev.io:8080')
      end

      it 'appends path' do
        expect(AppUrl.build('/test/123')).to eq('http://pigeonapp-dev.io:8080/test/123')
      end

      it 'appends query' do
        expect(AppUrl.build('', foo: 'bar')).to eq('http://pigeonapp-dev.io:8080?foo=bar')
      end

      it 'appends both path and query' do
        expect(AppUrl.build('/test/123', foo: 'bar')).to eq('http://pigeonapp-dev.io:8080/test/123?foo=bar')
      end

      it 'fails when given a path without preceding slash' do
        expect { AppUrl.build('test/123') }.to raise_exception(URI::InvalidComponentError)
      end
    end

    context 'in production without https' do
      around do |example|
        ClimateControl.modify APP_HOST: 'pigeonapp.io', APP_PORT: '80' do
          example.run
        end
      end

      it 'returns URL with http scheme and no port' do
        expect(AppUrl.build).to eq('http://pigeonapp.io')
      end
    end

    context 'in production with https' do
      around do |example|
        ClimateControl.modify APP_HOST: 'pigeonapp.io', APP_PORT: '443' do
          example.run
        end
      end

      it 'returns URL with https scheme and no port' do
        expect(AppUrl.build).to eq('https://pigeonapp.io')
      end
    end
  end
end
