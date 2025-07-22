class CreateWhisky < ActiveRecord::Migration[7.1]
  def change
    create_table :whiskies do |t|
      t.integer :rating
      t.text :tasting_notes
      t.references :locations, null: false, foreign_key: true

      t.timestamps
    end
  end
end
