class BaseUploader < Shrine
  plugin :pretty_location, namespace: '_'
end
