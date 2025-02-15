class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post


  def index
    @all_comments = @post.comments.where(is_deleted: false).order(created_at: :desc)
  end

  def create
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      redirect_to @post
    else
      flash.now[:danger] = "error"
      render 'posts/show'
    end
  end

  # def create
  #   @post = Post.find(params[:post_id])
  #   @comment = @post.comments.create(comment_params)
  #   @comment.user_id = current_user.id 
  #   # redirect_to post_path(@post)
  #   if @comment.save
  #     redirect_to @post
  #   else
  #     flash.now[:danger] = "error"
  #   end
  # end

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

    if @comment.user_id == current_user.id || @post.user_id == current_user.id
      if @comment.update(is_deleted: true)
        redirect_to post_path(@post), notice: "Comment successfully removed. One less opinion in the world!"
      else
        redirect_to post_path(@post), alert: "Tried to delete it, but the comment fought back. It won this round."
      end
    else
      redirect_to post_path(@post), alert: "Whoa there, power trip! You can’t erase history that’s not yours."
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
