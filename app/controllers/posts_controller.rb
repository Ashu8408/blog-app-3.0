class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:show, :index]

  def index
    @posts = Post.where(is_removed: false).order(created_at: :desc)
  end

  def new
    @post = Post.new
    respond_to do |format|
      format.html {render "posts/new" }
    end
  end


  def create
    @post = Post.new(post_params)
    @post.user = current_user
    if @post.save
      Rails.logger.info("if save me aaya")
      respond_to do |format|
        Rails.logger.info("format turbo next")
        format.html { redirect_to posts_path, notice: "Congrats! The internet has been blessed with your wisdom. " }
        Rails.logger.info("congrats")
      end
    else
      Rails.logger.info("else me aaya")
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

  def destroy
    @post = Post.find(params[:id])
    if @post.user_id == current_user.id
      if @post.update(is_removed: true)
        redirect_to @post, notice: "Poof! Your post just vanished into the void. 🎩✨"
      else
        redirect_to @post, alert: "Oops! Even the internet refused to delete this post."
      end
    else
      redirect_to @post, alert: "Noo my friend... If you didn’t write it, you can’t wipe it!"
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :is_removed, images: [])
  end
end
