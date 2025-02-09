class AddImagesToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :images, :text, default: "[]"
  end
end
