class PostsController < ApplicationController
  
  def index
    redirect_to new_post_path
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

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
