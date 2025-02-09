class PostsController < ApplicationController

  def index
    @posts = Post.where(is_removed: false).order(created_at: :desc)
  end

  def new
    @post = Post.new
  end

  # def create
  #   @post = Post.new(post_params)

  #   if params[:post][:images].present?
  #     uploaded_images = params[:post][:images].select { |img| img.is_a?(ActionDispatch::Http::UploadedFile) }
  #     @post.images = uploaded_images.map(&:original_filename)
  #     save_uploaded_images(uploaded_images)
  #   end

  #   if @post.save
  #     redirect_to @post, notice: "Post created successfully!"
  #   else
  #     render "new"
  #   end
  # end


  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to @post, notice: 'Post was successfully created.'
    else
      render :new
    end
  end

  # def save_uploaded_images(uploaded_images)
  #   upload_path = Rails.root.join("public/uploads")
  #   FileUtils.mkdir_p(upload_path) unless File.directory?(upload_path)

  #   uploaded_images.each do |img|
  #     file_path = upload_path.join(img.original_filename)
  #     File.open(file_path, "wb") { |file| file.write(img.read) }
  #   end
  # end

  # def save_uploaded_image(uploaded_file)
  #   filename = "#{SecureRandom.hex(10)}_#{uploaded_file.original_filename}"
  #   filepath = Rails.root.join("public", "uploads", filename)

  #   File.open(filepath, "wb") do |file|
  #     file.write(uploaded_file.read)
  #   end

  #   filename # Return filename to store in DB
  # end


  def show
    @post = Post.find(params[:id])
  end

  # def update
  #   @post = Post.find(params[:id])

  #   if params[:post][:images].present?
  #     @post.images += params[:post][:images].map { |img| img.original_filename }
  #     save_uploaded_images(params[:post][:images])
  #   end

  #   if @post.update(post_params)
  #     redirect_to @post
  #   else
  #     render "edit"
  #   end

  # end


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
