class AddJtiToSessions < ActiveRecord::Migration[7.1]
  def change
    add_column :sessions, :jti, :uuid, null: false, default: -> { 'gen_random_uuid()' }
  end
end
