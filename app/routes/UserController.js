var Controller = require("./Controller");


// The router contains the db connection among other things
// See Monk.js

function UserController(){

}


UserController.prototype = Controller;

UserController.prototype.get = function(id){
    
}

UserController.prototype.getAll = function(id){
    this.user = "mongo go get id with type user";
}

UserController.prototype.update = function(){
    
}

UserController.prototype.create = function(username){
    // Check mongo
    if("mongo has record of username")
        return false;
    
    this.user.username = username;
    
    var result = "save to mongo";
    
    return true;
    // Send this to mongo to 
}


UserController.prototype.register = function(req,res,body){
    var POST = req.body;
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({"username":POST.user},function(e,docs){
        if(docs.length == 0){
            collection.insert({"username":POST.user,"password":POST.pass});
            res.end("Account made");
        }else{
            res.end("Account Exists Exists: Try again");
        }
    });
}
module.exports = UserController;

