class GenerateExcelJob < ApplicationJob
  queue_as :default

  def perform(file_name)
    Rails.logger.info "Starting export job: #{file_name}"

    # ✅ Fetch posts and pass them to the service
    posts = Post.all
    file_path = DownloadPostsSidekiqService.call(posts)

    if file_path && File.exist?(file_path)
      public_path = Rails.root.join("public", "exports", file_name)
      FileUtils.mkdir_p(File.dirname(public_path))
      FileUtils.mv(file_path, public_path)

      Rails.logger.info "File successfully moved to: #{public_path}"
    else
      Rails.logger.error "File generation failed: #{file_path}"
    end
  rescue => e
    Rails.logger.error "GenerateExcelJob error: #{e.message}"
    raise e
  end
end
