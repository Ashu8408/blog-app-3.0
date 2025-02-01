class RemoveIsDeletedFromPosts < ActiveRecord::Migration[8.0]
  def change
    remove_column :posts, :is_deleted, :boolean
  end
end
