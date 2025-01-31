class PostsController < ApplicationController
  def new
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
    params.require(:post).permit(:name, :comment)
  end
end
