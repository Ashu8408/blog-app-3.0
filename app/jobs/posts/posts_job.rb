class PostsExcelExportWorker
  include Sidekiq::Worker

  def perform
    posts = Post.all
    service = DownloadPostsService.new(posts)
    package = service.generate_xlsx

    # Store file data in Rails cache (Redis-backed)
    Rails.cache.write("posts_xlsx", package.to_stream.read)
  end
end
