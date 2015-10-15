Meteor.methods({
	'setDB': function(){
		process.env.MONGO_URL = "mongodb://rohitfalor:MHPB3734@kahana.mongohq.com:10031/sconnect";
	}
});