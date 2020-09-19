module NestedFetchable
  extend ActiveSupport::Concern

  class_methods do
    def has_nested(table) # rubocop:disable Naming/PredicateName: Rename has_nested to nested?.
      method_name = "nested_#{table}"
      model = table.to_s.classify.constantize
      hierarchy_table = "#{table.to_s.singularize}_hierarchies"
      parent_foreign_key = "#{table_name.singularize}_id"

      define_method(method_name) do
        query = <<-SQL.strip_heredoc
          SELECT #{table}.* FROM #{table}
          INNER JOIN #{hierarchy_table} ON #{table}.id = #{hierarchy_table}.descendant_id
          WHERE #{hierarchy_table}.ancestor_id IN (SELECT id FROM #{table} WHERE #{parent_foreign_key} = #{id})
          ORDER BY created_at;
        SQL

        model.find_by_sql(query)
      end
    end
  end
end
