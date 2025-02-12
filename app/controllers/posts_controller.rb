class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:show, :index]

  def index
    @posts = Post.where(is_removed: false).order(created_at: :desc)
  end

  def new
    @post = Post.new
  end


  def create
    @post = Post.new(post_params)
    # @post.user = current_user

    if @post.save
      redirect_to @post, notice: 'Post was successfully created.'
    else
      render :new
    end
  end


  def show
    @post = Post.find(params[:id])
  end


  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      redirect_to @post, notice: 'Post was successfully updated.'
    else
      render :edit
    end
  end


  def edit
    @post = Post.find(params[:id])
  end

  # def destroy
  #   Rails.logger.info("delete triggered")
  #   @post = Post.find(params[:id])
  #   @post.destroy
  #   redirect_to posts_path
  # end

  def destroy
    Rails.logger.info("soft delete triggered for post_id = #{params[:id]}")

    @post = Post.find(params[:id])
    if @post.update(is_removed: true)
      redirect_to posts_path, notice: "Post was successfully hidden."
    else
      redirect_to posts_path, alert: "Failed to hide post."
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :is_removed, images: [])
  end
end
