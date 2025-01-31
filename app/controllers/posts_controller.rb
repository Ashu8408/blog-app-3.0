class PostsController < ApplicationController
  
  def index
    @posts = Post.all.order("created_at DESC")
  end
  def new
    @posts = Post
    @post = Post.new  # Ensure @post is initialized
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      redirect_to @post, notice: 'Post was successfully created.'
    else
      render :new
    end
  end

  def show
    @post = Post.find_by(params[:id])
  end

  def update
    @post = Post.find_by(params[:id])
    if @post.update(post_params)
      redirect_to @post
    else
      render :edit
    end
  end

  def edit
    
  end
  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
