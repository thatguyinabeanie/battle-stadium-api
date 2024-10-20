class DisableUuidOsspExtension < ActiveRecord::Migration[7.2]
  def change
    disable_extension "uuid-ossp"
  end
end
