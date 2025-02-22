// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
// import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
// eagerLoadControllersFrom("controllers", application)

import PostsController from "controllers/posts_controller"
application.register("posts", PostsController)

import CommentsController from "controllers/comments_controller"
application.register("comments", CommentsController)

import CreatePostController from "controllers/create_post_controller"
application.register("create_post", CreatePostController)
