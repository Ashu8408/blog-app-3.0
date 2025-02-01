# Simple Blog App with Rails

This is a simple blog app built using Ruby on Rails. The app allows users to create, update, and delete posts, add comments to individual posts, and delete comments as well. It utilizes Rails CRUD operations to provide a clean and easy-to-use interface for blogging.

## Features

- **Create Posts**: Add new blog posts with a title and content.
- **Edit & Update Posts**: Modify an existing blog post.
- **Comments**: Add one or more comments to a single post using the `has_many` association.
- **Delete Posts**: Remove a blog post.
- **Delete Comments**: Remove a comment from a post.
- **Post & Comment Models**: Includes validation for post titles, content, and comment text.
- **Test Cases**: Model test cases for both posts and comments.
- **Export Test Results**: Export test results in CSV format.

## Technologies Used

- Ruby on Rails
- SQLite3
- HTML & CSS (Tailwind CSS)
- RSpec for testing
- Simple Form gem

## Installation Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/blog-app.git
    cd blog-app
    ```

2. **Install dependencies**

    Ensure that you have Ruby, Rails, and SQLite3 installed. If not, install them first.
    
    Then, run the following command to install the required gems:

    ```bash
    bundle install
    ```

3. **Set up the database**

    Run the following commands to create the database and run migrations:

    ```bash
    rails db:create
    rails db:migrate
    ```

4. **Start the Rails server**

    To launch the app in your browser, use the following command:

    ```bash
    rails server
    ```

    The app should now be accessible at [http://localhost:3000](http://localhost:3000).

5. **Run tests (Optional)**

    To ensure everything works as expected, you can run the RSpec tests:

    ```bash
    rspec
    ```

    Test results can be exported to a CSV file for further analysis.

## Usage

Once the app is running, you can:

- **Create a new post**: Navigate to the posts index page and click on the 'New Post' button to create a new blog post.
- **Edit a post**: Click on the 'Edit' link for any post and modify the title and content.
- **Add comments**: Go to a specific post page and add comments.
- **Delete posts/comments**: You can delete posts and comments by clicking the corresponding delete buttons.

## Routes Overview

- `GET /posts`: Displays all posts.
- `GET /posts/:id`: Displays a single post with comments.
- `GET /posts/new`: Displays the form to create a new post.
- `GET /posts/:id/edit`: Displays the form to edit an existing post.
- `POST /posts`: Creates a new post.
- `PATCH /posts/:id`: Updates a post.
- `DELETE /posts/:id`: Deletes a post.
- `POST /posts/:post_id/comments`: Adds a new comment to a post.
- `DELETE /posts/:post_id/comments/:id`: Deletes a comment from a post.

## Testing

The app includes test cases for the `Post` and `Comment` models, ensuring that the basic CRUD operations work as expected.

To run the tests, use the following command:

```bash
bundle exec rspec "file path"
