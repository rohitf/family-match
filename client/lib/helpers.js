Template.list.helpers({
    results: function() { 
      var searchString = Session.get('search_term');
      if($('#search').val().length < 3)
      	return {};
      return Members.find({$or : [{Name: new RegExp(searchString, "gi")},{City: new RegExp(searchString, "gi")},{Job: new RegExp(searchString, "gi")}]});
    }
 });

Template.search.helpers({
    searchTerm: function() { 
      return Session.get("search_term") || "";
    }
 });

Template.profile.helpers({
    user: function() { 
      var user_id = Session.get('user_id');
      console.log(Members.findOne(user_id));
      return Members.findOne(user_id);
    }
 });