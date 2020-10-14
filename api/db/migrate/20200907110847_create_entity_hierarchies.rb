class CreateEntityHierarchies < ActiveRecord::Migration[5.2]
  def change
    create_table :entity_hierarchies, id: false do |t|
      t.integer :ancestor_id, null: false
      t.integer :descendant_id, null: false
      t.integer :generations, null: false
    end

    add_index :entity_hierarchies, [:ancestor_id, :descendant_id, :generations],
      unique: true,
      name: "entity_anc_desc_idx"

    add_index :entity_hierarchies, [:descendant_id],
      name: "entity_desc_idx"
  end
end
