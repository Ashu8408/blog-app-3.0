class RemoveIsDeletedFromComments < ActiveRecord::Migration[8.0]
  def change
    remove_column :is_deleted, :boolean
  end
end
