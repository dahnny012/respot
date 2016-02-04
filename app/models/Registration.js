var User = require("./User");
var bcrypt = require("bcrypt-nodejs");


function Registration(obj){
    this.username = "";
    this.password = "";
    this.type="registration";
    for (var prop in obj) this[prop] = obj[prop];
    
}

Registration.prototype.encryptPassword = function(password)
{
    this.password = this.generateHash(password);
}

Registration.prototype.validRegistration = function(req, data, callback) {
    var db = req.db;
    var collection = db.get('respot');
    
    if(data.username) {
        collection.find({"username":data.username, "type" : "registration" },function(e,docs){
            
        if(docs.length == 0){
            console.log(data);
            callback(null); //all is well.
        }else{
            //Failed to register
            //TODO: PUSH RES.JSON after passport middleware
            // res.json({"success":false, "error": REGISTERERROR});
            callback("Username already exists"); //error
        }

        });
    }
    else
        callback("No username."); //error
}

Registration.prototype.validLogin = function(req, callback) {
    var db = req.db;
    var collection = db.get('respot');
    var controller = this;
    if(controller.username) {
        collection.find({"username":controller.username,
                         "type" : "registration" },
        function(e,docs){
            if(docs.length == 1){
                var dbUser = docs[0];
                console.log(dbUser.password);
                if(controller.validPassword(dbUser.password, controller.password)){
                    callback(null);
                }else{
                    callback("Username/Password does not exist/does not match");
                }
            }
            else{
                callback("Username/Password does not exist/does not match");
            }
        });
    }
    else
        callback("No username."); //error
}



//called by an instance of Registration
Registration.prototype.save = function(req, callback) {
    var db = req.db;
    var SESSION = req.session;
    var collection = db.get('respot');
    this.encryptPassword(this.password);
    
    // Creates a Model.Registration
    collection.insert(this);

    //throw any needed errors here in the callback.
    callback(null);
}


Registration.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid 
Registration.prototype.validPassword = function(stored,input) {
    return bcrypt.compareSync(input,stored);
};
module.exports = Registration;