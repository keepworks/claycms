require 'geocoder/results/freegeoip'

RSpec.shared_context 'Geocoder' do
  let(:office_ip_address) { '106.51.100.36' }

  def stub_geocoder_search
    geocoder_response = Geocoder::Result::Freegeoip.new(
      'ip' => '106.51.100.36',
      'country_code' => 'IN',
      'country_name' => 'India',
      'region_code' => 'KA',
      'region_name' => 'Karnataka',
      'city' => 'Bengaluru',
      'zip_code' => '',
      'time_zone' => 'Asia/Kolkata',
      'latitude' => 2.9833,
      'longitude' => 7.5833
    )

    allow(Geocoder).to receive(:search).and_return([geocoder_response])
  end
end
