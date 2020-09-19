require 'rails_helper'

RSpec.shared_examples_for 'transferable' do
  let(:model) { described_class }

  before do
    @record = create(model.to_s.underscore.to_sym)
    @user = create(:user)
  end

  describe '.request_transfer_to!' do
    context 'when user is given' do
      it 'generates transfer request' do
        @record.request_transfer_to!(@user)

        expect(@record.transfer_digest).not_to be_nil
        expect(@record.transfer_generated_at).not_to be_nil
        expect(@record.transfer_owner).to eq(@user)
      end
    end

    context 'when new user is given in an active transfer request' do
      it 'generates new transfer request' do
        @record.request_transfer_to!(@user)

        old_record = @record.clone
        old_record.freeze

        user1 = create(:user)

        @record.request_transfer_to!(user1)

        expect(@record.transfer_digest).not_to be_nil
        expect(@record.transfer_generated_at).not_to be_nil
        expect(@record.transfer_owner).to eq(user1)
        expect(@record.transfer_digest).not_to eq(old_record.transfer_digest)
        expect(@record.transfer_generated_at).not_to eq(old_record.transfer_generated_at)
      end
    end
  end

  describe '.reset_transfer!' do
    context 'when active transfer request is present' do
      it 'resets transfer request' do
        @record.transfer_digest = @record.class.generate_transfer_digest
        @record.transfer_generated_at = Time.zone.now
        @record.transfer_owner = @user

        @record.reset_transfer!

        expect(@record.transfer_digest).to be_nil
        expect(@record.transfer_generated_at).to be_nil
        expect(@record.transfer_owner).to be_nil
      end
    end
  end

  describe '.transfer_expired?' do
    context 'when no active transfer request is present' do
      it 'returns false' do
        expect(@record.transfer_expired?).to eq(false)
      end
    end

    context 'when active transfer request is present' do
      before do
        @record.transfer_generated_at = Time.zone.now
        @record.transfer_owner = @user
        @creation_time = Time.zone.now
      end

      it 'returns false when transfer period is live' do
        expect(@record.transfer_expired?).to eq(false)
      end

      it 'returns true when transfer period is equal to transfer expiry period ' do
        Timecop.freeze(@creation_time + model::TRANSFER_EXPIRY_PERIOD)

        is_transfer_expired = @record.transfer_expired?

        Timecop.return

        expect(is_transfer_expired).to be(true)
      end

      it 'returns false when transfer period is less than transfer expiry period' do
        Timecop.freeze(@creation_time + model::TRANSFER_EXPIRY_PERIOD - 1.second)

        is_transfer_expired = @record.transfer_expired?

        Timecop.return

        expect(is_transfer_expired).to be(false)
      end
    end
  end

  describe '.transfer_requested?' do
    context 'when transfer request is valid' do
      it 'returns true' do
        @record.transfer_generated_at = Time.zone.now
        @record.transfer_owner = @user

        expect(@record.transfer_requested?).to eq(true)
      end
    end

    context 'when transfer request is not present' do
      it 'returns false' do
        expect(@record.transfer_requested?).to eq(false)
      end
    end

    context 'when transfer request is expired' do
      it 'returns false' do
        @record.transfer_generated_at = Time.zone.now
        @record.transfer_owner = @user
        creation_time = Time.zone.now

        Timecop.freeze(creation_time + model::TRANSFER_EXPIRY_PERIOD)

        transfer_requested = @record.transfer_requested?

        Timecop.return

        expect(transfer_requested).to be(false)
      end
    end
  end
end
