jQuery(document).ready(function($){

	// hide messages 
	$("#error").hide();
	$("#sent-form-msg").hide();
	
	// on submit...
	$("#contactForm #submit").click(function() {
		$("#error").hide();
		
		//name
		var name = $("input#name").val();
		if(name == ""){
			$("#error").fadeIn().text("Name required.");
			$("input#name").focus();
			return false;
		}
		
		// email
		var email = $("input#email").val();
		if(email == ""){
			$("#error").fadeIn().text("Email required");
			$("input#email").focus();
			return false;
		}
		
		// comments
		var comments = $("#comments").val();
		
		//data string
		var dataString = 'name='+ name
						+ '&email=' + email 					
						+ '&comments=' + comments;						         
		// ajax
		$.ajax({
			url: "/contact",
			type: "post",
			data: dataString,
			success: success()
		});
	});  
		
		
	// on success...
	 function success(){
	 	 $("#sent-form-msg").fadeIn();
	 	 $("#contactForm").fadeOut();
	 }
	
    return false;
});

