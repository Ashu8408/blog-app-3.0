import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect(){
        console.log("Posts controller connected")
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const posts = document.querySelectorAll(".post-item");

    searchInput.addEventListener("input", function() {
      const searchText = searchInput.value.toLowerCase();

      posts.forEach(post => {
        const title = post.querySelector("label").textContent.toLowerCase();
        const content = post.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchText) || content.includes(searchText)) {
          post.style.display = "flex";
        } else {
          post.style.display = "none";
        }
      });
    });
  });
