import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect() {
        console.log("Comments controller connected");

        // function to implement search on comments
        document.addEventListener('turbo:load', function() {
            const searchInput = document.getElementById("commentSearch");
            const comments = document.querySelectorAll(".comment-item");
            if (searchInput){
                searchInput.addEventListener("input", function() {
                    let ResultsCount =0
                    const searchText = searchInput.value.toLowerCase();
                
                    comments.forEach(comment => {
                    const content = comment.querySelector(".comment-content").textContent.toLowerCase();
                
                    if (content.includes(searchText)) {
                        ++ResultsCount;
                        comment.style.display = "flex";
                    } else {
                        comment.style.display = "none";
                    }
                    });
                    searchResultsComments.textContent = ResultsCount > 0 ? `${ResultsCount} results found` : "No results found";
                });
            }
        });

        const commentsPerPage = 2;
        let visibleComments = commentsPerPage;
        const showMoreButton = document.getElementById("showMoreComments");

        // function to implement pagination logic on comments
        function updateCommentList() {
        const comments = document.querySelectorAll(".comment-item");
        comments.forEach((comment, index) => {
            comment.style.display = index < visibleComments ? "flex" : "none";
        });
        
        if (visibleComments >= comments.length) {
            showMoreButton.style.display = "none";
        } else {
            showMoreButton.style.display = "justify-between";
        }
        }

        if (showMoreButton) {
            showMoreButton.addEventListener("click", () => {
                visibleComments += commentsPerPage;
                updateCommentList();
            });
        }

        document.addEventListener('turbo:load', updateCommentList);
    }
}

