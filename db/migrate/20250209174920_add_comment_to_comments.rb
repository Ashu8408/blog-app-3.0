class AddCommentToComments < ActiveRecord::Migration[8.0]
  def change
    add_column :comments, :comment, :string
  end
end
