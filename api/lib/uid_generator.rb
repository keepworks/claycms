module UidGenerator
  def self.populate(table, field = 'uid')
    if adapter == 'postgresql'
      load_extension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
      sql = "UPDATE #{table} SET #{field}=uuid_generate_v4();"

      ActiveRecord::Base.connection.execute(load_extension)
      ActiveRecord::Base.connection.execute(sql)
    elsif adapter == 'mysql2'
      sql = "UPDATE #{table} SET #{field}=(SELECT uuid());"

      ActiveRecord::Base.connection.execute(sql)
    else
      raise 'Unknown database adapter'
    end
  end

  def self.adapter
    ActiveRecord::Base.connection.instance_values['config'][:adapter]
  end
end
