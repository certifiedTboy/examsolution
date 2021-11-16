
$(document).ready(function () {

    getdata();

    $('#cancelEdit').click((event) => {
        event.preventDefault()
        $('#cancelBtn').addClass('d-none')
        getdata();
    })
    //questions post ajax 
    $('.addbtn2').click(function () {
        let course = $("#course2").val();
        let code = $("#code2").val();
        let faculty = $("#faculty2").val();
        let department = $("#department2").val();
        let topic = $("#topic2").val();
        let question = $(".question").val()

        // check form input data emptiness
        course = course.trim()
        code = code.trim()
        faculty = faculty.trim()
        question = question.trim()
        topic = topic.trim()
        department = department.trim()

        if (!course && !code && !faculty && !question && !topic && !department) {

            return;
        }
        $.ajax({
            url: '/questions',
            data: {
                'course': course,
                'code': code,
                'faculty': faculty,
                'department': department,
                'topic': topic,
                'question': question
            },
            method: 'post',
            dataType: 'json',
            beforeSend: function () {
                $('#loader').removeClass('hidden')
            },
            success: function (response) {

                if (response.msg == 'success') {

                    $('#course2').val('');
                    $('#code2').val('')
                    $('#faculty2').val('')
                    $('#department2').val('')
                    $('#topic2').val('')
                    $('.question').val('')
                    complete()
                    getdata();

                } else {
                    getdata();

                }
            },
            error: function (response) {

                getdata();
            }

        });

    });

    // material post ajax 
    $('.addbtn').click(function (e) {
        e.preventDefault()
        // check form validity 
        course = $('#course').val().trim()
        code = $('#code').val().trim()
        faculty = $('#faculty').val().trim()
        description = $('.desc').val().trim()
        topic = $('#topic').val().trim()
        department = $('#department').val().trim()
        file = $('#pic').val().trim()

        if (!course && !code && !faculty && !question && !topic && !department && !file) {
            return;
        }

        // form validity

        var form = $('#fileUploadForm')[0];
        var data = new FormData(form);
        // check form input data emptiness

        if (!data) {
            return;
        }
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/materials",
            data: data,
            processData: false, //prevent jQuery from automatically transforming the data into a query string
            contentType: false,
            cache: false,
            beforeSend: function () {
                $('#loader').removeClass('hidden')
            },
            success: (response) => {
                if (response.msg == "success") {

                    $('#course').val('');
                    $('#code').val('')
                    $('#faculty').val('')
                    $('#department').val('')
                    $('#topic').val('')
                    $('.desc').val('')
                    $('#pic').val('')
                    getdata()
                    complete()
                } else {

                }
            },
            error: (e) => {
                $("#listFiles").text(e.responseText);
            }
        });
    })

    // delete questions
    $(document).on('click', 'button.del', function () {
        let id = $(this).parent().find('button.del').val();

        $.ajax({
            url: `/questions/deletepost`,
            method: 'delete',
            dataType: 'json',
            data: { 'id': id },
            beforeDelete: function () {
                $('#loader').removeClass('hidden')
            },
            success: function (response) {
                if (response.msg == 'success') {


                    getdata();
                    complete()

                } else {

                }
            },
            error: function (response) {

            }
        });
    });
    // delete material posts
    $(document).on('click', 'button.del2', function () {
        let id = $(this).parent().find('button.del2').val();

        $.ajax({
            url: `/materials/deletepost`,
            method: 'delete',
            dataType: 'json',
            data: { 'id': id },
            beforeDelete: function () {
                $('#loader').removeClass('hidden')
            },
            success: function (response) {
                if (response.msg == 'success') {


                    getdata();
                    complete()

                } else {

                }
            },
            error: function (response) {

            }
        });
    });
    function getdata() {
        $.ajax({
            url: '/materials2',
            method: 'get',
            dataType: 'json',
            success: function (response) {
                if (response.msg == 'success') {
                    $('#generalDiv').hide()
                    $('#ajax2').show()
                    $("#ajax2").html("");
                    $('#cancelBtn').addClass('d-none')
                    let user = response.user
                    for (const data of response.material) {
                        let date = new Date(data.createdAt)
                        $('#ajax2').append(`
                            <hr>
                             <div class="well well-width">
                                    <h2>${data.course} - ${data.code}</h2>
                                    <div class="caption-full">
                                        <h3 class="faculty">Faculty: ${data.faculty} </h3>
                                        <h5>Department: ${data.department}</h5>
                                        <p class="topic">Topic: ${data.topic}</p>
                                        <p class="post_username">Posted By: <strong> <a href="/userprofile/user/${data.user.id}">${data.user.username}</a> </strong></p>
                                        <p>${date.toDateString()} ${moment(date.toDateString()).fromNow()}</p>
                                         
                                    </div>
                                </div>
                                <div class="dropdown_div">
                                    <div class="dropdown dropdown_div2">
                                        <button class="dropdown-toggle dropdown_btn2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span class="dropdown_btndot"><a class="dropdownbtn_link" href="" > ...</span> 
                                        </button>
                                        <ul class="dropdown-menu dropdown_menubg" aria-labelledby="dropdownMenuButton1">
                                            ${(() => {
                                if (data.question) {
                                    return `
                                        <li class="dropdown-item post_ddmenu"> 
                                        <form action="/questions/${data._id}">
                                        <input type="hidden" name="username" id="username" value="${user.username}">
                                        <input type="hidden" value="${data._id}" name="room" id="room">
                                          <div class="text-center">
                                         <button class="comment_form">Veiw Comments<span class="ion-ios-arrow-forward"></span></button>
                                          </div>
                                         </form>
                                        `;
                                } else {
                                    return `
                                        <form action="/materials/${data._id}">
                                        <input type="hidden" name="username" id="username" value="${user.username}">
                                        <input type="hidden" value="${data._id}" name="room" id="room">
                                          <div class="text-center">
                                         <button class="comment_form">Veiw Comments  <span class="ion-ios-arrow-forward"></span></button>
                                          </div>
                                         </form>
                                         </li>  
                                        `;
                                }
                            })()
                            }
                                            ${(() => {
                                if (user && data.user.id === user._id) {
                                    return ` <li style="color: white;">
                                        ${(() => {
                                            if (data.question) {
                                                return `<a href="#"></a><button style="color:black !important; background:none!important; border:none !important; margin-left:15px;" class="edit2" value="${data._id}">Edit</button>`
                                            } else {
                                                return `<a href="#"></a>
                                                    <button class="edit" style="color:black !important; background:none!important; border:none !important; margin-left:15px;" value="${data._id}">Edit</button>`
                                            }
                                        })()
                                        }
                                    </li>
                                      
                                     ${(() => {
                                            if (data.question) {
                                                return `  <li>
                                            <button style="color:black; background:none; border:none; " value="${data._id}" class="del">Delete</button>
                                     </li>`
                                            } else {
                                                return `<li>
                                                 <button style="color:black; background:none; border:none; margin-left:12px;" value="${data._id}" id="deleteBtn" class="del2">Delete</button>
                                                 </li>`
                                            }
                                        })()
                                        }        
                                `;
                                }
                            })()
                            }
                                        </ul>
                                      </div >
                                </div >
                                ${(() => {
                                if (data.question) {
                                    return `
                                        <div class="post_description">
                                        <pre class="mainpost_description">${data.question}
                                            </div>
                                        `;
                                } else {
                                    return `
                                        <div class="post_description">
                                        <pre class="mainpost_description">${data.desc}
                                            </div>
                                        `;
                                }
                            })()
                            }
                            ${(() => {
                                if (data.question) {
                                    return `<div></div>`;
                                } else {
                                    return ` <div class="download_link">
                                        <form class="download_form" action="/download/${data._id}" method="GET">  
                                            <button class="download_btn" type="submit" title="Download File"><i class="fas fa-file-download"></i></button>
                                        </form> 

                                      
                                        <a href="/${data._id}" type="button" class="download_btn" target="_blank" title="Preview"><i class="far fa-file-pdf"></i></a>
                                       
                                </div>  
                               
                                `;
                                }
                            })()
                            }
                            `)
                    }
                }
            },
            error: function (response) {
                alert('server error');
            }
        });
    }

    // show material edit form to DOM
    $(document).on('click', 'button.edit', function () {
        let id = $(this).parent().find('button.edit').val();
        $.ajax({
            url: `/materials/${id}/edit`,
            method: 'GET',
            dataType: 'json',
            data: { 'id': id },
            beforeSend: function () {
                $('#loader').removeClass('hidden')
            },
            success: function (response) {
                if (response.msg == 'success') {
                    $("#ajax2").hide()
                    $("#generalDiv").show()
                    $("#generalDiv").html('')
                    let newMat = response.material
                    $('#cancelBtn').removeClass('d-none')
                    $("#generalDiv").append(`
                 
                    <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                
                        </div>
                        <div class="col-md-6">
                            <h3>Edit </h3>
                            <div>
                                <form  method="POST" enctype="multipart/form-data" id="fileUploadForm2">  
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="course" id="course3" value="${newMat.course}"> 
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="code" id="code3" value="${newMat.code}"> 
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="topic" id="topic3" value="${newMat.topic}"> 
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="faculty" id="faculty3" value="${newMat.faculty}"> 
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="department" id="department3" value="${newMat.department}"> 
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="file" name="pic" id="pic3" value="${newMat.picspath}"><br> 
                                    </div>
                                    <div class="form-group">
                                        <textarea class="form-control" name="desc" id="desc3" cols="30" rows="10">${newMat.desc}</textarea>
                                    </div>
                                    <div>
                                        
                                        <button class="btn btn-success updateBtn" type="submit" value="${newMat._id}">Submit</button>
                                    </div>
                                 </form> 
                            </div> 
                        
                        </div>
                        <div class="col-md-3">
                         
                        </div>
                    </div>
                </div>
                    `);

                    complete()
                } else {

                }
            },
            error: function (response) {

            }
        });
    })

    // show question edit form to DOM 
    $(document).on('click', 'button.edit2', function () {
        let id = $(this).parent().find('button.edit2').val();
        $.ajax({
            url: `/questions/${id}/edit`,
            method: 'GET',
            dataType: 'json',
            data: { 'id': id },
            beforeSend: function () {
                $('#loader').removeClass('hidden')
            },
            success: function (response) {
                if (response.msg == 'success') {
                    $("#ajax2").hide()
                    $("#generalDiv").show()
                    $("#generalDiv").html('')
                    let newMat = response.question
                    $('#cancelBtn').removeClass('d-none')
                    $("#generalDiv").append(`
                   
                    <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                
                        </div>
                        <div class="col-md-6">
                            <h3>Edit </h3>
                            <div>
                                <form method="POST">  
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="course" id="course4" value="${newMat.course}"> 
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="code" id="code4" value="${newMat.code}"> 
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="topic" id="topic4" value="${newMat.topic}"> 
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="faculty" id="faculty4" value="${newMat.faculty}"> 
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="department" id="department4" value="${newMat.department}"> 
                                    </div>
                                  
                                    <div class="form-group">
                                        <textarea class="form-control" name="question" id="question4" cols="30" rows="10">${newMat.question}</textarea>
                                    </div>
                                    <div>
                                    <button class="btn btn-success updateBtn2" type="submit" value="${newMat._id}">Submit</button>
                                    </div>
                                 </form> 
                            </div> 
                        
                        </div>
                        <div class="col-md-3">
                         
                        </div>
                    </div>
                </div>
                    `);

                    complete()
                } else {

                }
            },
            error: function (response) {

            }
        });
    })

    // material post update 
    $(document).on('click', 'button.updateBtn', function (e) {
        e.preventDefault()
        let id = $(this).parent().find('button.updateBtn').val();
        course = $('#course3').val().trim()
        code = $('#code3').val().trim()
        faculty = $('#faculty3').val().trim()
        description = $('#desc3').val().trim()
        topic = $('#topic3').val().trim()
        department = $('#department3').val().trim()
        file = $('#pic3').val().trim()

        if (!course && !code && !faculty && !question && !topic && !department && !file) {
            return;
        }

        var form = $('#fileUploadForm2')[0];
        var data = new FormData(form);
        // check data validity
        if (!data) {
            return;
        }
        $.ajax({
            type: "PUT",
            enctype: 'multipart/form-data',
            url: `/materials/${id}`,
            data: data,
            processData: false, //prevent jQuery from automatically transforming the data into a query string
            contentType: false,
            cache: false,
            beforeSend: function () {
                $('#loader').removeClass('hidden')
            },
            success: (response) => {
                if (response.msg == "success") {

                    $('#course3').val('');
                    $('#code3').val('')
                    $('#faculty3').val('')
                    $('#department3').val('')
                    $('#topic3').val('')
                    $('.desc3').val('')
                    $('#pic3').val('')
                    getdata()
                    complete()
                } else {

                }
            },
            error: (e) => {
                $("#listFiles").text(e.responseText);
            }
        });
    })

    // question post update 

    $(document).on('click', 'button.updateBtn2', function (e) {
        e.preventDefault()
        let id = $(this).parent().find('button.updateBtn2').val();
        let course = $("#course4").val();
        let code = $("#code4").val();
        let faculty = $("#faculty4").val();
        let department = $("#department4").val();
        let topic = $("#topic4").val();
        let question = $("#question4").val()

        // check form input data emptiness
        course = course.trim()
        code = code.trim()
        faculty = faculty.trim()
        question = question.trim()
        topic = topic.trim()
        department = department.trim()

        if (!course && !code && !faculty && !question && !topic && !department) {

            return;
        }
        $.ajax({
            url: `/questions/${id}`,
            data: {
                'course': course,
                'code': code,
                'faculty': faculty,
                'department': department,
                'topic': topic,
                'question': question
            },
            method: 'PUT',
            dataType: 'json',
            beforeSend: function () {
                $('#loader').removeClass('hidden')
            },
            success: function (response) {

                if (response.msg == 'success') {

                    $('#course4').val('');
                    $('#code4').val('')
                    $('#faculty4').val('')
                    $('#department4').val('')
                    $('#topic4').val('')
                    $('#question4').val('')
                    complete()
                    getdata();

                } else {
                    getdata();

                }
            },
            error: function (response) {

                getdata();
            }

        });

    });
});


const complete = () => {
    $('#loader').addClass('hidden')
}



