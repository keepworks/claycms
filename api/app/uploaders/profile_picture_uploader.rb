class ProfilePictureUploader < ImageUploader
  plugin :validation_helpers

  Attacher.validate do
    validate_mime_type_inclusion %w[image/jpeg image/png]
  end

  Attacher.derivatives_processor do |original|
    versions = {}
    pipeline = ImageProcessing::MiniMagick.source(original)
    versions[:normal] = pipeline.resize_to_fill!(200, 200, gravity: 'Center')
    versions[:thumbnail] = pipeline.resize_to_fill!(100, 100, gravity: 'Center')

    versions
  end
end
