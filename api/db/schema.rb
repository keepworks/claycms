# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_09_072630) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "assets", force: :cascade do |t|
    t.bigint "project_id"
    t.string "name"
    t.text "file_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_assets_on_project_id"
  end

  create_table "auth_nonces", force: :cascade do |t|
    t.string "nonce"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["nonce"], name: "index_auth_nonces_on_nonce", unique: true
  end

  create_table "auth_tokens", force: :cascade do |t|
    t.bigint "user_id"
    t.string "jti", null: false
    t.string "aud", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["aud"], name: "index_auth_tokens_on_aud"
    t.index ["jti"], name: "index_auth_tokens_on_jti", unique: true
    t.index ["user_id"], name: "index_auth_tokens_on_user_id"
  end

  create_table "entities", force: :cascade do |t|
    t.bigint "project_id"
    t.string "name"
    t.string "label"
    t.boolean "singleton", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "parent_id"
    t.string "uid"
    t.integer "position", default: 0
    t.index ["name"], name: "index_entities_on_name"
    t.index ["parent_id"], name: "index_entities_on_parent_id"
    t.index ["project_id"], name: "index_entities_on_project_id"
  end

  create_table "entity_hierarchies", id: false, force: :cascade do |t|
    t.integer "ancestor_id", null: false
    t.integer "descendant_id", null: false
    t.integer "generations", null: false
    t.index ["ancestor_id", "descendant_id", "generations"], name: "entity_anc_desc_idx", unique: true
    t.index ["descendant_id"], name: "entity_desc_idx"
  end

  create_table "exports", force: :cascade do |t|
    t.bigint "project_id"
    t.text "file_data"
    t.integer "status", default: 0, null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_exports_on_project_id"
  end

  create_table "field_hierarchies", id: false, force: :cascade do |t|
    t.bigint "ancestor_id", null: false
    t.bigint "descendant_id", null: false
    t.integer "generations", null: false
    t.index ["ancestor_id", "descendant_id", "generations"], name: "field_anc_desc_idx", unique: true
    t.index ["descendant_id"], name: "field_desc_idx"
  end

  create_table "fields", force: :cascade do |t|
    t.bigint "entity_id"
    t.string "label"
    t.string "name"
    t.integer "data_type"
    t.text "default_value"
    t.text "validations", default: "{}"
    t.string "hint"
    t.integer "position", default: 0
    t.string "editor"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "parent_id"
    t.integer "element_type"
    t.bigint "referenced_entity_id"
    t.text "settings", default: "{}"
    t.string "uid"
    t.index ["entity_id"], name: "index_fields_on_entity_id"
    t.index ["name"], name: "index_fields_on_name"
    t.index ["referenced_entity_id"], name: "index_fields_on_referenced_entity_id"
  end

  create_table "key_pairs", force: :cascade do |t|
    t.bigint "project_id"
    t.string "public_key"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_key_pairs_on_project_id"
    t.index ["public_key"], name: "index_key_pairs_on_public_key"
  end

  create_table "locales", force: :cascade do |t|
    t.bigint "project_id"
    t.string "language"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_locales_on_project_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.bigint "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.index ["team_id"], name: "index_projects_on_team_id"
  end

  create_table "properties", force: :cascade do |t|
    t.bigint "record_id"
    t.bigint "field_id"
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "asset_id"
    t.bigint "parent_id"
    t.bigint "linked_record_id"
    t.integer "position", default: 0
    t.string "uid"
    t.index ["asset_id"], name: "index_properties_on_asset_id"
    t.index ["field_id"], name: "index_properties_on_field_id"
    t.index ["linked_record_id"], name: "index_properties_on_linked_record_id"
    t.index ["record_id"], name: "index_properties_on_record_id"
  end

  create_table "property_hierarchies", id: false, force: :cascade do |t|
    t.bigint "ancestor_id", null: false
    t.bigint "descendant_id", null: false
    t.integer "generations", null: false
    t.index ["ancestor_id", "descendant_id", "generations"], name: "property_anc_desc_idx", unique: true
    t.index ["descendant_id"], name: "property_desc_idx"
  end

  create_table "records", force: :cascade do |t|
    t.bigint "entity_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uid"
    t.index ["entity_id"], name: "index_records_on_entity_id"
  end

  create_table "relationships", force: :cascade do |t|
    t.bigint "entity_id"
    t.bigint "field_id"
    t.integer "linked_entity_id"
    t.integer "linked_field_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entity_id"], name: "index_relationships_on_entity_id"
    t.index ["field_id"], name: "index_relationships_on_field_id"
    t.index ["linked_entity_id"], name: "index_relationships_on_linked_entity_id"
    t.index ["linked_field_id"], name: "index_relationships_on_linked_field_id"
  end

  create_table "resources", force: :cascade do |t|
    t.bigint "project_id"
    t.string "name"
    t.text "file_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_resources_on_project_id"
  end

  create_table "restores", force: :cascade do |t|
    t.bigint "project_id"
    t.string "url"
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_restores_on_project_id"
  end

  create_table "team_memberships", force: :cascade do |t|
    t.bigint "team_id"
    t.bigint "user_id"
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_team_memberships_on_team_id"
    t.index ["user_id"], name: "index_team_memberships_on_user_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "transfer_owner_id"
    t.string "transfer_digest"
    t.datetime "transfer_generated_at"
    t.index ["transfer_owner_id"], name: "index_teams_on_transfer_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", limit: 50
    t.string "last_name", limit: 50
    t.string "email"
    t.text "profile_picture_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "external_uid"
    t.index ["email"], name: "index_users_on_email"
  end

  add_foreign_key "assets", "projects"
  add_foreign_key "auth_tokens", "users"
  add_foreign_key "entities", "projects"
  add_foreign_key "exports", "projects"
  add_foreign_key "fields", "entities"
  add_foreign_key "fields", "entities", column: "referenced_entity_id"
  add_foreign_key "key_pairs", "projects"
  add_foreign_key "locales", "projects"
  add_foreign_key "projects", "teams"
  add_foreign_key "properties", "assets"
  add_foreign_key "properties", "fields"
  add_foreign_key "properties", "records"
  add_foreign_key "properties", "records", column: "linked_record_id"
  add_foreign_key "records", "entities"
  add_foreign_key "relationships", "entities"
  add_foreign_key "relationships", "fields"
  add_foreign_key "resources", "projects"
  add_foreign_key "restores", "projects"
  add_foreign_key "team_memberships", "teams"
  add_foreign_key "team_memberships", "users"
  add_foreign_key "teams", "users", column: "transfer_owner_id"
end
