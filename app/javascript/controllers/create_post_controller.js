import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect(){
    console.log("Create post controller connected")

    this.validTitle = true

    const titleInput = document.getElementById("post_title")
    if(titleInput){
      titleInput.addEventListener("input", () => {
        console.log("Title input eventlistener")
        this.validateTitle()
      });
    } 
  }

  validateTitle(){
    console.log("validateTitle called on event listener")
    const titleInput = document.getElementById("post_title")
    const titleValue = titleInput.value.trim()
    const titleError1 = document.getElementById("title_error_1")
    const titleError2 = document.getElementById("title_error_2")
    const createPostError = document.getElementById("create_post_error")

    if(titleValue == ""){
      titleError1.classList.remove("hidden")
      createPostError.classList.remove("hidden")
      titleError2.classList.add("hidden")
      this.validTitle = false
    } else if(titleValue.length > 50){
      titleError1.classList.add("hidden")
      createPostError.classList.remove("hidden")
      titleError2.classList.remove("hidden")
      this.validTitle = false
    } else{
      titleError1.classList.add("hidden")
      titleError2.classList.add("hidden")
      createPostError.classList.add("hidden")
      this.validTitle = true
    }
     
      return this.validTitle
    }


  submitForm(event){
    console.log("Submit form triggered")
    this.validateTitle();
    console.log("validateTitle called in submitFOrm")

    if(!this.validTitle){
      event.preventDefault();
    }
  }

}