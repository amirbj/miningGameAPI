var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON =mongo.BSONPure;


var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('gamedb', server);

db.open(function(err, db){
if(!err){
 	console.log("Connected to 'gamedb' database");
	  db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });




}

	

});

exports.findById = function(req, res){
	var id = req.params.id;
	consol.log('retrive users:'+ id);
	db.collection('users', function(err, collection){
	collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item){
		res.send(item);

								});


		

});



};

exports.findAll = function(req, res){
	
db.collection('users', function(err, collection){
if(err){
	res.send("error")
}else{
	collection.find({}).toArray(function(err, items){
	res.send(items);

 });
	
}
});



}



exports.addUser = function(req, res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('users', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateUser = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}

exports.deleteUser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('users', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var users = [
    {
        firstname: "sara",
	lastname : "amiri",
        email: "hoseein@gmail.com",
        age: "22"
      
    },
    {
         firstname: "hasan",
	lastname : "hasani",
        email: "hoseein@gmail.com",
        age: "25"
    
    }];

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });

};







