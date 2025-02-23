class CreateContacts < ActiveRecord::Migration[8.0]
  def change
    create_table :contacts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :mobile
      t.string :linkedin

      t.timestamps
    end
  end
end
