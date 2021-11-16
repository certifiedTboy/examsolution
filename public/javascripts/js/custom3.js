
var searchBtn = document.querySelector("#button-holder")
var searchInput = document.querySelector("#input")




// searchBtn.addEventListener("click", function(){
//     searchInput.classList.add(".search-text-input")
// })

searchBtn.addEventListener("click", function(){
   searchInput.classList.add(".search-text-input")
    // alert("you clicked me")
})

searchBtn.addEventListener("click", function(){
    searchInput.classList.remove(".search-text-input")
     // alert("you clicked me")
 })