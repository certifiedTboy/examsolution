$(document).ready(() => {

	getHomePage()

	//  GET aboutpage REQUEST
	$("#getAboutBtn").click((event) => {
		event.preventDefault();
		getAboutPage();
	});

	$("#getHomeBtn").click((event) => {
		event.preventDefault();
		getHomePage();
	});
	// get contact page 
	$('#getContactPage').click((event) => {
		event.preventDefault()
		getContactPage()
	})

	$('#getTermsPage').click((event) => {
		event.preventDefault()
		getTermsPage()
	})

	$('#searchForm').submit((event) => {
		event.preventDefault()
		getSearchResult()
	})

	$('#blogPostsBtn').click((event) => {
		event.preventDefault()
		getBlogPosts()
	})
	// DO GET
	function getAboutPage() {
		$.ajax({
			type: "GET",
			url: "/about2",
			beforeSend: function () {
				$('#loader').removeClass('hidden')
			},
			success: (response) => {
				//clear old data
				$('#generalDiv').html('')
				if (response.msg == 'success') {

					$("#generalDiv").append(`<div id="fh5co-about">
					<div class="container">
						<div class="col-md-6">
							<span>About Us</span>
							<h2>Welcome to Exams Solutions</h2>
							<p>Exams Solutions is an indepth idea of EMMANUEL TOSIN ADEBISI, founder and CEO of Infinite Ideas, a graduate of Industrial and Labour Relations from Olabisi Onabanjo University (OOU) <br> <br>
							A passionate individual who found joy and enthusiam in technology, in his time at the university discovered the need for students to have easy access to required and necessary materials which can help aid learning and ensure good examination performance <br> <br>
						In the light of this, the idea for this website was born to help students get access to useful information and materials (past questions and learning materials) relating to their courses, create a platform where students meet other students in the same field / department for relevant solutions to class challenges and assignments and also have the opportunity to share their unique ideas and solution with other students </p>
							
						</div>
						<div class="col-md-6">
							<div style="margin-top: -10px;">
								<img class="img-responsive" src="/images/images/img_bg_2.png" alt="" width="300px" >
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
			
							</div>
							<div class="col-md-6">
								<div style="height: 450px; background-color: rgb(22, 2, 75); margin-top: -450px; opacity: 0.5;">
			
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="fh5co-gallery" class="fh5co-bg-section" style="margin-bottom: 100px;">
				<div class="row text-center">
					<h2><span>Other Works</span></h2>
					<p>Other Works By Me</p>
				</div>
				<div class="row">
					<div class="col-md-3 col-padded" style="margin: 10px;">
						<!-- <a href="#" class="gallery" style="background-image: url(/images/images/project-5.jpg);"></a> -->
					</div>
					<div class="col-md-3 ">
						<p>Fast-Track Admissions</p>
						<a href="https://fasttrackadmissions.herokuapp.com" target="_blank" class="gallery" style="background-image: url(/images/images/project-2.jpg);"></a>
					</div>
					<div class="col-md-3">
						<p>Shop Wtih Titans</p>
						<a href="https://shopwithtitans.herokuapp.com" class="gallery" style="background-image: url(/images/images/project-3.jpg);"></a>
					</div>
					<div class="col-md-3 col-padded">
						<!-- <a href="#" class="gallery" style="background-image: url(/images/images/project-4.jpg);"></a> -->
					</div>
				</div>
			</div>`);
					complete()
				}


			},
			error: (err) => {
				$("#listFiles").html(err.responseText);
			}
		});
	}

	// DO GET
	function getHomePage() {
		$.ajax({
			type: "GET",
			url: "/home",
			beforeSend: function () {
				$('#loader').removeClass('hidden')
			},
			success: (response) => {
				//clear old data
				$("#generalDiv").html('')
				if (response.msg == 'success') {

					$("#generalDiv").append(`<div id="fh5co-register" class="" style="background-image: url(images/img_bg_2.jpg); margin-top: 100px; margin-bottom: 100px;">
					<div class="overlay"></div>
					<div class="row">
						<div class="col-md-2">
				
						</div>
						<div class="col-md-8">
							<div class="text-center">
								<h2>Get Unlimted Materials For Free</h2>
							</div>
							<div>
								<form class="" action="/search" method="get" id="searchForm">
									<div class="form-group">
										<input class="form-control" type="text" name="dsearch" placeholder="Search Using: Course Code, Course-Title, Topic, Description" style="color: black; background-color: white; font-size: 20px; border-radius: 10px;">
									</div>
									<div class="text-center">
										<button id="searchBtn" style="border: none !important; width: 200px; height: 50px; font-weight: 600;" class="btn btn-primary" type="submit">Search</button>
									</div>
									
								  </form>
							</div>
						</div>
						<div class="col-md-2">
				
						</div>
					</div>
				</div>
				<div id="fh5co-course" style="padding: 0 !important;">
					<div class="container">
						<div class="row">
							<div class="text-center fh5co-heading">
								<h2>Key Topics & Faculties</h2>
								<p>View Materials By Your Topic of Interest and faculty of Choice</p>
							</div>
						</div>
						<div class="row">
							<div class="col-md-4 col-4 ">
								<div class="course">
									<a href="#" class="course-img" style="background-image: url(https://www.socialsciencespace.com/wp-content/uploads/SocialScience-word-cloud_opt.jpg);">
									</a>
									<div class="desc">
										<h3><a href="#">Social Science</a></h3>
										
										<form action="/search" method="get">
											<input type="hidden" value="Social Science" name="dsearch" >
											<span><button class="btn btn-primary btn-sm btn-course">View Materials</button></span>
										</form>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-4 ">
								<div class="course">
									<a href="#" class="course-img" style="background-image: url(https://lh3.googleusercontent.com/proxy/E2rA3I_KsoB99w4QpVnK5hFECck509TwjBtrEE2kQ5hHGtapkLeasq8grT14gxg-1E7mTAYuZ3tsH7msnU15bq4o0WDhpKzZpTtxCJ_81OnkQdVW4Uy7);">
									</a>
									<div class="desc">
										<h3><a href="#">Law</a></h3>
										
										<form action="/search" method="get">
											<input type="hidden" value="law" name="dsearch" >
											<span><button class="btn btn-primary btn-sm btn-course">View Materials</button></span>
										</form>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-4 ">
								<div class="course">
									<a href="#" class="course-img" style="background-image: url(https://www.tutorialspoint.com/fundamentals_of_science_and_technology/images/evolution_of_science.jpg);">
									</a>
									<div class="desc">
										<h3><a href="#">Science &amp; Technology</a></h3>
										
										<form action="/search" method="get">
											<input type="hidden" value="Science and Technology" name="dsearch" >
											<span><button class="btn btn-primary btn-sm btn-course">View Materials</button></span>
										</form>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-4 ">
								<div class="course">
									<a href="#" class="course-img" style="background-image: url(https://media.timeout.com/images/105590782/image.jpg);">
									</a>
									<div class="desc">
										<h3><a href="#">Art</a></h3>
										
										<form action="/search" method="get">
											<input type="hidden" value="Art" name="dsearch" >
											<span><button class="btn btn-primary btn-sm btn-course">View Materials</button></span>
										</form>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-4 ">
								<div class="course">
									<a href="#" class="course-img" style="background-image: url(https://www.oda-agri.fr/wp-content/uploads/2020/03/6.jpg);">
									</a>
									<div class="desc">
										<h3><a href="#">Agricultural Science</a></h3>
										
										<form action="/search" method="get">
											<input type="hidden" value="Agricultural Science" name="dsearch" >
											<span><button class="btn btn-primary btn-sm btn-course">View Materials</button></span>
										</form>
									</div>
								</div>
							</div>
							<div class="col-md-4 col-4 ">
								<div class="course">
									<a href="#" class="course-img" style="background-image: url(https://leverageedu.com/blog/wp-content/uploads/2019/10/Types-of-Mass-Media.jpg);">
									</a>
									<div class="desc">
										<h3><a href="#">Mass &amp; Communication</a></h3>
										
										<form action="/search" method="get">
											<input type="hidden" value="Mass Communication" name="dsearch" >
											<span><button class="btn btn-primary btn-sm btn-course">View Materials</button></span>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				</div>
				
				<p id="total" style="font-size: 200px;"></p>
				
				
				
				<div class="container text-center" style="margin-bottom: 100px; margin-top: 100px;">
					<div class="row">
						<div class="col-3 col-sm-3 col-md-4">
				
						</div>
						<div class="col-6 col-sm-6 col-md-4">
							<div>
								<h4>Join Us Now to connect with other Amazing Students</h4>
							</div>
							<div>
								<a href="/register" class="btn btn-warning">Join Us  <span> <i class="fas fa-users"></i></span></a>
							</div>
						</div>
						<div class="col-3 col-sm-3 col-md-4">
				
						</div>
					</div>
				</div>
				`);
					complete()
				}


			},
			error: (err) => {
				$("#listFiles").html(err.responseText);
			}
		});
	}


	// get contact page 
	function getTermsPage() {
		$.ajax({
			type: "GET",
			url: "/terms",
			beforeSend: function () {
				$('#loader').removeClass('hidden')
			},
			success: (response) => {
				//clear old data
				$("#generalDiv").html('')
				if (response.msg == 'success') {

					$("#generalDiv").append(` <div class="container" style="margin-top: 50px; margin-bottom: 50px;">
					<div class="row">
						<div class="col-md-4">
			
						</div>
						<div class="col-md-8">
							<div>
								<h4>Terms & Conditions of Service</h4>
							</div>
							<div class="accordion" id="accordionExample">
								<div class="accordion-item">
								  <h2 class="accordion-header" id="headingOne">
									<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
										Welcome to Exams Solution!
									</button>
								  </h2>
								  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
									<div class="accordion-body">
										We build services that enable students in Nigeria connect with each other, regardless the school location differences, share relevant information amongst each other and relevant documents relevant to ensure smooth education process and academic success. These terms govern your use of Exams Solution, features and services that we offer. 
										We don’t charge you to use Exam solution or other related services covered by these terms. Instead, we solicit for voluntary financial supports and donation from benefited users to which ever capacity they can afford and willing to. 
									   We don’t sell your personal data, but are displayed on your personal profile to allow easy connection with other students. These information include (Your School, faculty, department, email, phone number and level at School).
									   
									</div>
								  </div>
								</div>
								<div class="accordion-item">
								  <h2 class="accordion-header" id="headingTwo">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
									Our mission 
									</button>
								  </h2>
								  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
									<div class="accordion-body">
										Our mission is to bring the Nigerian college students closer to each other and create an avenue where they can share vital information and materials needed to scale up their academic performance. In order to improve on this mission, we provide services described below. <br>
									<br>
										<strong>Provide a personalized experience for you: </strong> <br>
										 Your experience on Exam solution is unusual. Unlike all other platforms, students have the permission to create their own post, share a file or material they feel is useful to other students, have access to unlimited download, search for materials through the search section and also use our blog platform to read news and events relating to schools in Nigeria. 
										<br> <br>
										<strong>Connect you with people and Other Students you care About:</strong> <br>
										We help you find and connect with people, groups and students that matter to you across the Nigeria. We use the data that we have to make suggestions for you and others 
										<br> <br>
										<strong>Empower you to express yourself and communicate about what matters to you:</strong> <br>
										There are many ways to express yourself on Exams Solution and to communicate with friends  and other students about what matters to you – for example, asking questions, sharing files and the rest. <br>
									   <br>
										<strong>Combat harmful conduct, and protect our community:</strong> <br>
										People will only register on Exams Solution if they feel safe. We are adopting different measures to detect misuse of our services, harmful conduct towards others and situations where we may be able to help support or protect our community. If we learn of content or conduct like this, we will take appropriate action – for example, offering help, removing content, removing or restricting access to certain features, disabling an account or contacting law enforcement. 
										<br> <br>
										<strong>Research ways to make our services better:</strong> <br>
										We engage in research to develop, test and improve our services. This includes analysing the data we have about our users and understanding how people use our services, for example by conducting surveys and testing and troubleshooting new features
									</div>
								  </div>
								</div>
								<div class="accordion-item">
								  <h2 class="accordion-header" id="headingThree">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
										Your commitments to Exams Solution and our community
									</button>
								  </h2>
								  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
									<div class="accordion-body">
										We provide these services to you and others to help advance our mission. In exchange, we need you to make the following commitments: <br>
										<br>
										<strong>1. Who can use Exams Solution</strong> <br>
									  When people stand behind their opinions and actions, our community is safer and more accountable. For this reason, you must: <br>
										•	use a username that you’re often recognized by in your school <br>
										•	provide accurate information about yourself; <br>
										•	create only one account (your own) and use your timeline for personal purposes; and <br>
										•	not share your password, give access to your account to others or transfer your account to anyone else (without our permission).
										<br>
										We try to make Exams Solution broadly available to everyone, but you cannot use our services if: <br>
										•	You are under 15 years old (or the minimum legal age in your country to use our Products). <br>
										•	You are a convicted sex offender. <br>
										•	We've previously disabled your account for violations of our Terms or Policies. <br>
										•	You are prohibited from receiving our products, services or software under applicable laws. <br>
			
								<br>
									  <strong>2. What you can share and do on Exams Solution:</strong> <br>
			
									  We want people to use Exams Solution to express themselves and to share content that is important to other students, but not at the expense of the safety and well-being of others or the integrity of our community. You therefore agree not to engage in the conduct described below (or to facilitate or support others in doing so): <br>
											1.	You may not use our services to do or share anything: <br>
											•	That breaches these Terms, our Community Standards, and other Terms and Policies that apply to your use of Exams Solution. <br>
											•	That is unlawful, misleading, discriminatory or fraudulent. <br>
											•	That infringes or violates someone else's rights, including their intellectual property rights. <br>
											2.	You may not upload viruses or malicious code, or do anything that could disable, overburden or impair the proper working or appearance of our services. <br>
											3.	You may not access or collect data from our services using automated means (without our prior permission) or attempt to access data that you do not have permission to access. <br>
											We can remove or restrict access to content that is in violation of these provisions. <br>
											If we remove content that you have shared in violation of our Community Standards, we'll let you know and explain any options you have to request another review, unless you seriously or repeatedly violate these Terms or if doing so may expose us or others to legal liability; harm our community of users; compromise or interfere with the integrity or operation of any of our services, systems or Products; where we are restricted due to technical limitations; or where we are prohibited from doing so for legal reasons. <br>
										<br>
											To help support our community, we encourage you to report content or conduct that you believe violates your rights (including intellectual property rights) or our terms and policies.
											We also can remove or restrict access to your content, services or information if we determine that doing so is reasonably necessary to avoid or mitigate adverse legal or regulatory impacts to Exams solutions.
			
										<br> <br>
										<strong>   3. The permissions you give us</strong>
									   <br> 
											We need certain permissions from you to provide our services: <br>
											1.	Permission to use content that you create and share: Some content that you share or upload, such as photos or pdf’s or questions, may be protected by intellectual property laws. <br>
											You own the intellectual property rights (things such as copyright or trademarks) in any such content that you create and share on exams solution. Nothing in these Terms takes away the rights you have to your own content. You are free to share your content with anyone else, wherever you want. <br>
											<br>
											You can delete content individually or all at once by deleting your account. You can download a copy of your data at any time before deleting your account. <br>
											When you delete content, it's no longer visible to other users; however, it may continue to exist elsewhere on our systems where: <br>
											•	Immediate deletion is not possible due to technical limitations (in which case, your content will be deleted within a maximum of 90 days from when you delete it); <br>
											•	your content has been used by others in accordance with this licence and they have not deleted it (in which case, this licence will continue to apply until that content is deleted); or <br>
											•	Where immediate deletion would restrict our ability to: <br>
											•	investigate or identify illegal activity or breaches of our Terms and Policies (for example, to identify or investigate misuse of our Products or systems); <br>
											•	comply with a legal obligation, such as the preservation of evidence; or <br>
											•	comply with a request of a judicial or administrative authority, law enforcement or a government agency; <br>
											<br>
											in which case, the content will be retained for no longer than is necessary for the purposes for which it has been retained (the exact duration will vary on a case-by-case basis).
			
									</div>
								  </div>
								</div>
								<div class="accordion-item">
									<h2 class="accordion-header" id="headingFour">
									  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
										Additional provisions
									  </button>
									</h2>
									<div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
									  <div class="accordion-body">
										 
									  
										  <strong>Account suspension or termination: </strong> <br> We work constantly to improve our services and develop new features to make our Products better for you and our community. As a result, we may need to update these Terms from time to time to accurately reflect our services and practices. We will only make changes if the provisions are no longer appropriate or if they are incomplete, and only if the changes are reasonable and take due account of your interests. <br>
										  We will notify you (for example, by email or through our Products) at least 30 days before we make changes to these Terms and give you an opportunity to review them before they go into effect, unless changes are required by law. Once any updated Terms are in effect, you will be bound by them if you continue to use our Products. <br>
										  We hope that you will continue using our Products, but if you do not agree to our updated Terms and no longer want to be part of the Exams Solution community, you can delete your account at any time. <br> <br>
										  
										  <strong>Research ways to make our services better:</strong> <br>
										  We want Exams solutions to be a place where people feel welcome and safe to express themselves and share their thoughts and ideas. <br>
										  If we determine that you have clearly, seriously or repeatedly breached our Terms or Policies, including in particular our Community Standards, we may suspend or permanently disable access to your account. We may also suspend or disable your account if you repeatedly infringe other people's intellectual property rights or where we are required to do so for legal reasons. <br>
										  Where we take such action, we'll let you know and explain any options you have to request a review, unless doing so may expose us or others to legal liability; harm our community of users; compromise or interfere with the integrity or operation of any of our services, systems or Products; or where we are restricted due to technical limitations; or where we are prohibited from doing so for legal reasons. <br> <br>
			
										  <strong>Limits on liability:</strong> <br>
										  We work hard to provide the best Products we can and to specify clear guidelines for everyone who uses them. Our Products, however, are provided "as is", and we make no guarantees that they will always be safe, secure or error-free, or that they will function without disruptions, delays or imperfections. To the extent permitted by law, we also DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. We do not control or direct what people and others do or say, and we are not responsible for their actions or conduct (whether online or offline) or any content that they share (including offensive, inappropriate, obscene, unlawful and other objectionable content). <br> <br>
										  We cannot predict when issues may arise with our services. Accordingly, our liability shall be limited to the fullest extent permitted by applicable law, and under no circumstances will we be liable to you for any lost profits, revenues, information or data, or consequential, special, indirect, exemplary, punitive or incidental damages arising out of or related to these Terms, even if we have been advised of the possibility of such damages. <br> <br>
			
										  <strong>Other:</strong> <br>
										  1.	These Terms (formerly known as the Statement of Rights and Responsibilities) make up the entire agreement between you and Exams Solutions. regarding your use of our services. They supersede any prior agreements. <br>
											2.	If any portion of these Terms is found to be unenforceable, the remaining portion will remain in full force and effect. If we fail to enforce any of these Terms, it will not be considered a waiver. Any amendment to or waiver of these Terms must be made in writing and signed by us. <br>
											3.	You will not transfer any of your rights or obligations under these Terms to anyone else without our consent. <br>
											4.	You should know that we may need to change the username for your account in certain circumstances (for example, if someone else claims the username and it appears unrelated to the name that you use in everyday life). We will inform you in advance if we have to do this and explain why. <br>
											5.	We always appreciate your feedback and other suggestions about services. But you should know that we may use them without any restriction or obligation to compensate you, and we are under no obligation to keep them confidential. <br>
											6.	We reserve all rights not expressly granted to you. <br>
			
			
										  
									  </div>
									</div>
								  </div>
							  </div>
						</div>
					</div>
				</div>
			
			
				`);
					complete()
				}


			},
			error: (err) => {
				$("#listFiles").html(err.responseText);
			}
		});
	}

	function getContactPage() {
		$.ajax({
			type: "GET",
			url: "/contact",
			beforeSend: function () {
				$('#loader').removeClass('hidden')
			},
			success: (response) => {
				//clear old data
				$("#generalDiv").html('')
				if (response.msg == 'success') {

					$("#generalDiv").append(`<div id="fh5co-contact">
					<div class="container">
						<div class="row">
							<div class="col-md-5 col-md-push-1">
								
								<div class="fh5co-contact-info">
									<h3>Contact Information</h3>
									<ul>
										
										<li class="phone"><a href="tel://+2347018810562">07018810562</a></li>
										<li class="email"><a href="mailto:info@yoursite.com">urinfo.smssolution@gmail.com</a></li>
										
									</ul>
								</div>
			
							</div>
							<div class="col-md-6">
								<h3>Get In Touch</h3>
								<form action="/contact" method="POST">
									<div class="row form-group">
										<div class="col-md-6">
											<!-- <label for="fname">First Name</label> -->
											<input type="text" name="firstName" id="fname" class="form-control" placeholder="Your firstname" required>
										</div>
										<div class="col-md-6">
											<!-- <label for="lname">Last Name</label> -->
											<input type="text" name="lastName" id="lname" class="form-control" placeholder="Your lastname" required>
										</div> <br> <br>
										
									</div>
			
									<div class="row form-group">
										<div class="col-md-12">
											<!-- <label for="email">Email</label> -->
											<input type="text" name="username" id="email" class="form-control" placeholder="Enter Username" required>
										</div> <br> <br> <br>
										<div class="col-md-12">
											<!-- <label for="email">Email</label> -->
											<input type="text" name="email" id="email" class="form-control" placeholder="Your email address" required>
										</div>
									</div>
			
									<div class="row form-group">
										<div class="col-md-12">
											<!-- <label for="subject">Subject</label> -->
											<input type="text" name="subject" id="subject" class="form-control" placeholder="Your subject of this message" required>
										</div>
									</div>
			
									<div class="row form-group">
										<div class="col-md-12">
											<!-- <label for="message">Message</label> -->
											<textarea name="text" id="message" cols="30" rows="10" class="form-control" placeholder="Say something about us"></textarea>
										</div>
									</div>
									<div class="form-group">
										<input type="submit" value="Send Message" class="btn btn-primary">
									</div>
			
								</form>		
							</div>
						</div>
						
					</div>
				</div>
			
				`);
					complete()
				}


			},
			error: (err) => {
				$("#listFiles").html(err.responseText);
			}
		});
	}

	// search query 

	function getSearchResult() {
		$.ajax({
			type: "GET",
			url: "/search",
			beforeSend: function () {
				$('#loader').removeClass('hidden')
			},
			success: (response) => {
				//clear old data
				$("#generalDiv").html('')
				if (response.msg == 'success') {
					$.each(response.material, (index, data) => {
						$("#generalDiv").append(`<div id="fh5co-contact">
						<button value="${data._id}" class="del">Delete</button>
			
				`);
					})
				}


			},
			error: (err) => {
				$("#listFiles").html(err.responseText);
			}
		});
	}

	function getBlogPosts() {
		$.ajax({
			type: "GET",
			url: "/blogs",
			dataType: 'json',
			beforeSend: function () {
				$('#loader').removeClass('hidden')
			},
			success: (response) => {
				//clear old data
				$("#generalDiv").html('')
				if (response.msg == 'success') {
					$.each(response.blog, (index, data) => {
						$("#generalDiv").append(`<div class="container">
					<div id="fh5co-blog">
						<div class="container">
							<div class="row">
								<div class="col-md-12 text-center fh5co-heading">
									<h2>Blog &amp; Events</h2>
									<!-- <p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p> -->
								</div>
							</div>
							
							<div class="row"  style="display: flex; flex-wrap: wrap;">
								<div class="col-md-4">
									<div class="fh5co-blog">
										<a href="/blogs/${data._id}" class="blog-img-holder" style="background-image: url(${data.image});"></a>
										<div class="blog-text">
											<h3>${data.topic}</h3>
											<span class="posted_on">${data.createdAt}</span>
											
											<p>${data.text.substring(0, 50)} </p> <button value="${data._id}" class="readmore" id="readMoreBtn">Read More...</button>
										</div> 
									</div>
								</div>
							</div>
						
						</div>
						
					</div>
				
			
				`);
						complete()
					})
				}


			},
			error: (err) => {
				$("#listFiles").html(err.responseText);
			}
		});
	}

	$(document).on('click', 'button.readmore', function () {
		let id = $(this).parent().find('button.readmore').val();
		console.log(id)
		$.ajax({
			url: `/blogs/${id}`,
			method: 'GET',
			dataType: 'json',
			data: { 'id': id },
			beforeSend: function () {
				$('#loader').removeClass('hidden')
			},
			success: function (response) {
				console.log(response)
				$("#generalDiv").html('')
				if (response.msg == 'success') {
					let blog = response.blog
					let date = new Date(blog.createdAt)
					$("#generalDiv").append(`<div class="container">
					<div class="row">
						<div class="col-md-3">
						<p class="lead"><a style="font-weight: 600;" href="" id="blogPostsBtn">Blogs</a></p>
							<div class="list-group">
							  <li class="list-group-item active"><a href="" style="color: white; text-decoration: none; font-weight: 700;">Go Back</a></li>
							 
							  </div>
						</div>
						<div class="col-md-9">
							<div class="thumbnail" style="padding: 0;">
								<img style="width: 100%; margin-bottom: 5px;" class="img-responsive" src="${blog.image}" alt="blogImage">
								  
								<div class="caption-full" style="margin-left: 10px;">
								<h4 class="pull-right">${date.toDateString()}</h4>
								<strong><h3><a href="#">${blog.topic}</a></h3></strong> 
								<div style="max-width: 98%;">
									<pre style="overflow: hidden; background: none; border: none; font-family: inherit !important; margin-left: 10px; font-size: 13px;  white-space: pre-wrap;  word-wrap: break-word; word-break: keep-all; padding: 0; margin-top: 20px; width: 100%;">${blog.text}
								</div>
								
								</div>
							</div>
						</div>
					</div>
				</div>`);
					complete()
				} else {

				}
			},
			error: function (response) {

			}
		});
	})
})
const complete = () => {
	$('#loader').addClass('hidden')
}