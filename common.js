
if(Meteor.isServer){
Meteor.call('setDB', function(error, result){
    return false;
});
}

Members = new Mongo.Collection("members");

if(Meteor.isClient){
    subs = Meteor.subscribe('family_members', Session.get('user_id'));
}

Members.allow({
});

Meteor.methods({
    'verifyUser': function(name, number, dob){
        var dob1 = dob.split("-");
        dob1 = dob1[0] + "-" + dob1[2] + "-" + dob1[1];
        if(name.length >= 3 && number.length >= 10)
            var user = Members.findOne({$and : [{Name: new RegExp(name, "gi")}, {cleanNumber: new RegExp(number, "gi")}, {DOB: dob}]}) || Members.findOne({$and : [{Name: new RegExp(name, "gi")}, {cleanNumber: new RegExp(number, "gi")}, {DOB: dob1}]});
        if (user)
            return user._id;
        return "";
    },
    'lastDigits': function(name){
        if(name.length >= 3){
            var user = Members.findOne({Name: name});
            if(user)
                return user.Number;
        }
    },
    'updateUser': function(user, user_id){
        Members.update({ _id: user_id },
		   	{
                $set: {
    		      Name: user.Name,
    		      Number: user.Number,
                  cleanNumber: user.Number.replace(/\D/g,'').slice(-10),
                  Email: user.Email
    		   	}
            },
	   	{upsert: false }
    )
}
});