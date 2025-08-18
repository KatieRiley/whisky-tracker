class AddTastedAtToWhisky < ActiveRecord::Migration[7.1]
  def change
    add_column :whiskies, :tasted_at, :datetime, null: false, default: -> { 'CURRENT_TIMESTAMP' }
  end
end
