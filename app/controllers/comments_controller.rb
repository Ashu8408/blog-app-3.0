class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
     @comment = @post.comments.create(comment_params)
    redirect_to post_path(@post)
  end

  def destroy
    @post = Post.find(params[:post_id])
    @comment = @post.comments.find(params[:id])
    @comment.destroy
    redirect_to post_path(@post)
  end

  # def destroy
  #   @post = Post.find_by(params[:post_id])
  #   @comment = @post.comments.find(params[:id])

  #   if @comment.update(is_deleted: true)
  #     redirect_to post_path(@post), notice: "Comment was successfully hidden."
  #   else
  #     redirect_to post_path(@post), alert: "Failed to delete comment."
  #   end
  # end

  private

  def comment_params
    params.require(:comment).permit(:name, :comment)
  end
end
