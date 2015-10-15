Meteor.publish('family_members', function(user_id) {
var cursor = Members.find({_id: user_id});
	if(user_id)
		if(cursor.count() != 0){
			return Members.find();
		}
});

// Meteor.publish('family_members_all_data', function(user_id) {
//   	if(Members.find(user_id)){
//     	return Members.find();
//     }
//   	else
//   		subs.stop();
//  });