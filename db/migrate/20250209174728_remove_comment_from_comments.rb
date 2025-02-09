class RemoveCommentFromComments < ActiveRecord::Migration[8.0]
  def change
    remove_column :comments, :comment, :text
  end
end
