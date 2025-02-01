class CommentsController < ApplicationController
  before_action :set_post

  def index
    @all_comments = @post.comments.where(is_deleted: false)
  end
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create(comment_params)
    redirect_to post_path(@post)
  end

  # def destroy
  #   Rails.logger.info("delete me aaya ")
  #   @post = Post.find(params[:post_id])
  #   @comment = @post.comments.find(params[:id])
  #   @comment.destroy
  #   redirect_to post_path(@post)
  # end

  def destroy
    Rails.logger.info("soft delete comment triggered for comment_id = #{params[:id]}")
    @post = Post.find(params[:post_id])
    @comment = @post.comments.find(params[:id])

    if @comment.update(is_deleted: true)
      redirect_to post_path(@post), notice: "Comment was successfully hidden."
    else
      redirect_to post_path(@post), alert: "Failed to delete comment."
    end
  end
  

  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def comment_params
    params.require(:comment).permit(:name, :comment, :is_deleted)
  end
end
