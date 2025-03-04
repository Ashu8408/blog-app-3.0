import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect(){
    console.log("Posts controller connected")

    // function for implement search on posts
    document.addEventListener('turbo:load', function() {
      const searchInput = document.getElementById("searchInput");
      const posts = document.querySelectorAll(".post-item");

      if (searchInput) {
        searchInput.addEventListener("input", function() {
          const searchText = searchInput.value.toLowerCase();
          let ResultsCount=0;
  
          posts.forEach(post => {
            const title = post.querySelector("label").textContent.toLowerCase();
            const content = post.querySelector("p").textContent.toLowerCase();
  
            if (title.includes(searchText) || content.includes(searchText)) {
              ++ResultsCount;
              post.style.display = "flex";
            } else {
              post.style.display = "none";
            }
          });
          searchResultsPosts.textContent = ResultsCount > 0 ? `${ResultsCount} results found` : "No results found";
  
        });
      }
    });

    // post pagination logiv
    const postsPerPage = 5;
    let currentPage = 0;

    function updatePostList() {
      console.log("Updating post list");
      const posts = document.querySelectorAll(".post-item");
      const totalPosts = posts.length;
      const totalPages = Math.ceil(totalPosts / postsPerPage);
      const start = currentPage * postsPerPage;
      const end = Math.min(start + postsPerPage, totalPosts);

      posts.forEach((post, index) => {
        post.style.display = (index >= start && index < end) ? "flex" : "none";
      });

      const prevButton = document.getElementById("post_prev_page");
      const nextButton = document.getElementById("post_next_page");

      prevButton.classList.toggle("invisible", currentPage === 0);
      nextButton.classList.toggle("invisible", currentPage >= totalPages - 1);

      const pageNumbersContainer = document.getElementById("post_page_numbers");
      pageNumbersContainer.innerHTML = "";

      let startPage = Math.max(0, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 5);

      // condition to show 5 pages
      if (endPage - startPage < 5) {
        startPage = Math.max(0, endPage - 5);
      }

      if (currentPage > 0) {
        const prevPage = document.createElement("span");
        prevPage.onclick = () => {
          currentPage--;
          updatePostList();
        };
        pageNumbersContainer.appendChild(prevPage);
      }

      for (let i = startPage; i < endPage; i++) {
          const pageNumber = document.createElement("span");
          pageNumber.textContent = i + 1;
          pageNumber.className = `mx-1 cursor-pointer px-2 py-1 rounded ${
            i === currentPage ? "font-bold bg-green-500 text-white" : "bg-gray-200"
          }`;
          pageNumber.onclick = () => {
            currentPage = i;
            updatePostList();
          };
          pageNumbersContainer.appendChild(pageNumber);
        }
        if (currentPage < totalPages - 1) {
          const nextPage = document.createElement("span");
          nextPage.onclick = () => {
            currentPage++;
            updatePostList();
          };
          pageNumbersContainer.appendChild(nextPage);
        }
      }

    document.getElementById("post_prev_page").addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        updatePostList();
      }
    });

    document.getElementById("post_next_page").addEventListener("click", () => {
      const totalPosts = document.querySelectorAll(".post-item").length;
      if (currentPage < Math.ceil(totalPosts / postsPerPage) - 1) {
        currentPage++;
        updatePostList();
      }
    });

    // listens everytime to update the post list
    document.addEventListener('turbo:load', updatePostList);

    document.addEventListener('turbo:load', function () {
      const entriesPerPage = 10;
      let currentPage = 0;
    
      function updatePostTable() {
        const postRows = document.querySelectorAll(".post_row");
        const totalEntries = postRows.length;
        const totalPages = Math.ceil(totalEntries / entriesPerPage);
        const start = currentPage * entriesPerPage;
        const end = Math.min(start + entriesPerPage, totalEntries);
    
        // Show or hide table based on entries
        document.getElementById("posts_table").classList.toggle("hidden", totalEntries === 0);
        document.getElementById("page_info").textContent = totalEntries === 0
          ? "No posts available"
          : `Showing ${start + 1} to ${end} of ${totalEntries}`;
    
        // Display only the current page rows
        postRows.forEach((row, index) => {
          row.style.display = index >= start && index < end ? "table-row" : "none";
        });
    
        // Pagination controls visibility
        document.getElementById("prev_page").classList.toggle("invisible", currentPage === 0);
        document.getElementById("next_page").classList.toggle("invisible", currentPage >= totalPages - 1);
    
        // Generate page numbers
        const pageNumbersContainer = document.getElementById("page_numbers");
        pageNumbersContainer.innerHTML = "";
    
        for (let i = 0; i < totalPages; i++) {
          const pageNumber = document.createElement("span");
          pageNumber.textContent = i + 1;
          pageNumber.className = `mx-2 cursor-pointer px-3 py-1 rounded ${
            i === currentPage ? "bg-green-500 text-white font-bold" : "bg-gray-200 text-black"
          }`;
          pageNumber.onclick = () => {
            currentPage = i;
            updatePostTable();
          };
          pageNumbersContainer.appendChild(pageNumber);
        }
      }
    
      // Event Listeners for Pagination Buttons
      document.getElementById("prev_page").addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
          updatePostTable();
        }
      });
    
      document.getElementById("next_page").addEventListener("click", () => {
        const postRows = document.querySelectorAll(".post_row").length;
        if ((currentPage + 1) * entriesPerPage < postRows) {
          currentPage++;
          updatePostTable();
        }
      });
    
      // Initial Table Update
      updatePostTable();
    });

    // document.getElementById("apply_filters").addEventListener("click", function() {
    //   const titleQuery = document.getElementById("search_title").value.toLowerCase().trim();
    //   const createdByQuery = document.getElementById("search_created_by").value.toLowerCase().trim();
    //   const minContentLength = parseInt(document.getElementById("min_content_length").value) || 0;
    //   const maxContentLength = parseInt(document.getElementById("max_content_length").value) || Infinity;
  
    //   document.querySelectorAll(".post_row").forEach(row => {
    //     const postTitleElem = row.querySelector(".post-title");
    //     const postCreatedByElem = row.querySelector(".post-created-by");
    //     const postContentLengthElem = row.querySelector(".post-content-length");

    //     if (!postTitleElem || !postCreatedByElem || !postContentLengthElem) {
    //       console.warn("Missing post element in row:", row);
    //       return;
    //     }

    //     const postTitle = postTitleElem.innerText.toLowerCase();
    //     const postCreatedBy = postCreatedByElem.innerText.toLowerCase();
    //     const postContentLength = parseInt(postContentLengthElem.innerText);

    //     const matchesTitle = !titleQuery || postTitle.includes(titleQuery);
    //     const matchesCreatedBy = !createdByQuery || postCreatedBy.includes(createdByQuery);
    //     const matchesContentLength = postContentLength >= minContentLength && postContentLength <= maxContentLength;

    //     row.style.display = (matchesTitle && matchesCreatedBy && matchesContentLength) ? "table-row" : "none";
    //   });
    // });
    
  }
}