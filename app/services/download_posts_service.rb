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

  def generate_pie_chart_xlsx
    package = Axlsx::Package.new
    workbook = package.workbook

    workbook.add_worksheet(name: "Post Stats") do |sheet|
      sheet.add_row ["User", "Post Count"], b: true

      # Count posts by user
      user_post_counts = @posts.group(:user_id).count

      user_post_counts.each do |user_id, count|
        user = User.find_by(id: user_id)
        sheet.add_row [user&.email || "Guest", count]
      end

      # Add Pie Chart
      sheet.add_chart(Axlsx::Pie3DChart, title: "Posts per User") do |chart|
        chart.start_at 0, user_post_counts.size + 2
        chart.end_at 5, user_post_counts.size + 10
        chart.add_series data: sheet["B2:B#{user_post_counts.size + 1}"], labels: sheet["A2:A#{user_post_counts.size + 1}"]
      end
    end

    package
  end
end
