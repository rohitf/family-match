Meteor.methods({
	'setDB': function(){
		process.env.MONGO_URL = "mongodb://<Removed>:<Removed>@kahana.mongohq.com:<Removed>";
	}
});