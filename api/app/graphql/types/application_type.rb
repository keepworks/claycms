module Types
  class ApplicationType < GraphQL::Schema::Object
    include GraphQL::Sugar::Object

    def self.file_field(name, version = nil, null: true, **options)
      field_name = version.present? ? "#{name}_#{version}" : name

      field field_name, String, null: null

      define_method field_name do
        if version.present? && version != :original
          object.send("#{name}_url", version, **options)
        else
          object.send("#{name}_url", **options)
        end
      end
    end
  end
end
