class AddIsRemovedToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :is_removed, :boolean, default: false, null: false
  end
end
