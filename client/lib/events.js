Template.login.events({
    'click a': function() {
	    var nameEntered = $('#my_name').val().split(" ")[0];
	    console.log(nameEntered);
	    var numberEntered = $('#my_number').val().replace(/\D/g,'').slice(-10);
	    var dateEntered = $('#my_date').val()
	    Meteor.call('verifyUser', nameEntered, numberEntered, dateEntered, function(error, result){
	    	if(error)
	    		alert("Sorry. There was an error. Please try again.")
    		if(result == "" || nameEntered == "" || numberEntered == "" || dateEntered == "")
	    		alert("Oops! It looks like you have not correctly filled in your name, phone number, and birth date!")	
	    	else{
	    		Session.setPersistent('user_id', result);
   				subs = Meteor.subscribe('family_members', Session.get('user_id'));
	  			Router.go('profile');
	  			$('#navContainer').show();
	  		}
	  	});
    },
    'keyup input': function(e) {
	    if(e.keyCode == 13)
	    	$('#login_button').trigger('click'); 
	},
    'blur #my_name': function() {
	    var nameEntered = $('#my_name').val();
	    Meteor.call('lastDigits', nameEntered, function(error, result){
	    	if(error)
	    		alert("Error");
	    	else if(result != "")
	    	{
	    		result = result.slice(-2);
	    		$("label[for='my_number']").text("Your Number (ending in " + result + ")");
	  		}
	  	});
    }
 });

var expanded = false, newName = "";
Template.list.events({
	'click .card span, .card li': function(){
		var theName = $(event.target).parent().children('span').text();
		var thePerson = Members.find({Name: theName}).fetch()[0];
		if(!expanded || newName != theName){
			$(event.target).parent().append("<li>" + thePerson.Job + "</li>");
			expanded = true;
			newName = theName;
		}
		// $(event.target).parent().append("<li>" + thePerson.FB + "</li>");
		// $(event.target).parent().append("<li>" + thePerson.LinkedIn + "</li>");
	}
});

Template.nav.events({
	'click #logout': function(){
		if(confirm("Are you sure you want to log out?")){
		Session.clear();
		subs.stop();
		$('#navContainer').hide();
		Router.go('/');
		}
	}
		// 'click #mobile-demo a': function(){
  //        	$('#mobile-demo').attr('style','left: -250px');;
  //        	$('#sidenav-overlay').hide();
  //         }
	});

 Template.profile.events({
    'click a': function() {
	    var corrections = {};
	    corrections.Name = $('#edit_name').val();
	    corrections.Number = $('#edit_number').val();
	    corrections.Email = $('#edit_email').val();
	    Meteor.call('updateUser', corrections, Session.get("user_id"),function(error, result){
	    	if(error)
	    		alert("Sorry. There was an error. Please try again.")
	    	Router.go("/search")
	    	window.location.href= "/search";
	  	});
    },
    'keyup input': function(e) {
	    if(e.keyCode == 13)
	    	$('#login_button').trigger('click'); 
	}
 });

Template.search.events({
    'keyup input': function(e) {
      if(e.keyCode == 13){
      	$('#search').blur();
      	return false;
      } 
      Session.setPersistent('search_term',$('#search').val());
    },
    'focus input': function(e) {
      Session.setPersistent('search_term',$('#search').val());
    }
 });
