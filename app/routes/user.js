var Controller = require("Controller");


function UserController(router){
    this.router = router;
}


UserController.prototype = Controller;

UserController.prototype.get = function(id){
    this.user = "mongo go get id with type user";
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

module.exports = UserController;
