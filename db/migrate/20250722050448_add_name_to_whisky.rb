class AddNameToWhisky < ActiveRecord::Migration[7.1]
  def change
    add_column :whiskies, :name, :string, null: false
  end
end
