class AddIsDeletedToComments < ActiveRecord::Migration[8.0]
  def change
    add_column :comments, :is_deleted, :boolean, default: false, null: false
  end
end
