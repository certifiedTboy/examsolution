let qBtn = document.querySelector(".qbtn");
let fileBtn = document.querySelector(".filebtn");
let fileForm = document.querySelector(".fileForm");
let qForm = document.querySelector(".qForm");
let cmtBtn = document.querySelector(".cmtBtn")
let comment = document.querySelectorAll(".comment")


fileBtn.addEventListener("click", function () {
    fileForm.classList.remove("display");
    fileForm.style.display = 'inline-table'
    // fileForm.style.margin = 'auto'
    qForm.style.display = 'none'
    qForm.classList.add("display");
});

qBtn.addEventListener("click", function () {
    qForm.classList.remove("display");
    qForm.style.display = 'inline-table'
    // qForm.style.margin = 'auto'
    fileForm.classList.add("display");
    fileForm.style.display = 'none'
});



cmtBtn.addEventListener("click", function () {
    comment.classList.remove("cmtrow");
});
