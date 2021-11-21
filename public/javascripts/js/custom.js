var qBtn = document.querySelector(".qbtn");
var fileBtn = document.querySelector(".filebtn");
var fileForm = document.querySelector(".fileForm");
var qForm = document.querySelector(".qForm");
var hideBtn = document.querySelector(".hideBtn");
var cmtBtn = document.querySelector(".cmtBtn")
var comment = document.querySelectorAll(".comment")


fileBtn.addEventListener("click", function () {
    fileForm.classList.remove("display");
    fileForm.style.display = 'inline-block'
    fileForm.style.margin = 'auto'
    qForm.style.display = 'none'
    qForm.classList.add("display");
});

qBtn.addEventListener("click", function () {
    qForm.classList.remove("display");
    qForm.style.display = 'inline-block'
    qForm.style.margin = 'auto'
    fileForm.classList.add("display");
    fileForm.style.display = 'none'
});

hideBtn.addEventListener("click", function () {
    qForm.classList.add("display");
    fileForm.classList.add("display");
});

cmtBtn.addEventListener("click", function () {
    comment.classList.remove("cmtrow");
});
