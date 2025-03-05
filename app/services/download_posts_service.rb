
class DownloadPostsService
  def initialize(posts)
    @posts = posts
  end

  def generate_xlsx
    package = Axlsx::Package.new
    workbook = package.workbook

    workbook.add_worksheet(name: "Posts") do |sheet|
      sheet.add_row ["ID", "Title", "Content Length", "Comments Count", "Created By"], b: true
      sheet.column_widths 5, 20, 15, 15, 30    

      # Add post data rows
      @posts.each do |post|
        sheet.add_row [
          post.id,
          post.title,
          post.content.length,
          post.comments.count,
          post.user&.email || "N/A"
        ]
      end
    end

    package
  end
end
