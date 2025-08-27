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

    unless @post && !@post.is_removed
      redirect_to posts_path, alert: "Oops! This post doesn't exist or has been removed."
    end
  end


  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      redirect_to @post, notice: "Post was successfully updated."
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
        redirect_to posts_path, notice: "Poof! Your post just vanished into the void. 🎩✨"
      else
        redirect_to @post, alert: "Oops! Even the internet refused to delete this post."
      end
    else
      redirect_to @post, alert: "Noo my friend... If you didn’t write it, you can’t wipe it!"
    end
  end

  def download_excel
    Rails.logger.info("download_excel me aaya")
    posts = Post.all
    service = DownloadPostsService.new(posts)
    package = service.generate_xlsx

    send_data package.to_stream.read,
              filename: "posts_sidekiq_#{Time.now.to_i}.xlsx",
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  end

  def download_pie_chart
    posts = Post.all
    service = DownloadPostsService.new(posts)
    package = service.generate_pie_chart_xlsx
  
    send_data package.to_stream.read,
              filename: "posts_pie_chart_#{Time.now.to_i}.xlsx",
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  end
  

  def export
    file_name = "posts_sidekiq_#{Time.now.to_i}.xlsx"
    
    # Ensure job is enqueued properly
    GenerateExcelJob.perform_later(file_name)

    # Return JSON response with file path
    render json: { download_url: "/exports/#{file_name}" }, status: :accepted
  rescue => e
    Rails.logger.error "Export error: #{e.message}"
    render json: { error: "Failed to process export" }, status: :internal_server_error
  end

  # def download_generated_excel
  #   Rails.logger.info("download_generated_excel me aaya")

  #   file_data = Rails.cache.read("posts_xlsx")

  #   if file_data
  #     Rails.logger.info("download_generated_excel: file found")
  #     send_data file_data,
  #               filename: "posts.xlsx",
  #               type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  #   else
  #     Rails.logger.info("download_generated_excel: file not ready yet")
  #     flash[:alert] = "File is not ready yet. Please try again later."
  #     redirect_to posts_path
  #   end
  # end

  def download_pdf
    @posts = Post.all
    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "posts_#{Time.now.to_i}", template: "posts/download_pdf", formats: [:html]
      end
    end
  end

  def download_image
    @posts = Post.all
    html = render_to_string("posts/index", layout: false)
  
    # Generate image using IMGKit
    kit = IMGKit.new(html, quality: 80)
  
    send_data kit.to_img(:png),
              filename: "posts_image_#{Time.now.to_i}.png",
              type: "image/png",
              disposition: "attachment"
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :is_removed, :body, images: [])
  end
end
