module Types
  class LocaleType < ApplicationType
    model_class Locale

    attribute :language

    relationship :project
  end
end
