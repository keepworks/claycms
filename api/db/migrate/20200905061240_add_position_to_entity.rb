class AddPositionToEntity < ActiveRecord::Migration[5.2]
  def change
    add_column :entities, :position, :integer, default: 0
  end
end
