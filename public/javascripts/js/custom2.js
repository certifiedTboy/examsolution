var commentDiv = document.querySelector(".cmtDiv");
var cmtHide = document.querySelector(".cmtBtnHide");
var cmtShow = document.querySelector(".cmtBtnShow")


cmtShow.addEventListener("click", function(){
    commentDiv.classList.remove("dis")
})

cmtHide.addEventListener("click", function(){
    commentDiv.classList.add("dis")
})