var User = require("./User");
var bcrypt = require("bcrypt-nodejs");


function Registration(obj){
    this.username = "";
    this.password = "";
    this.type="registration";
    for (var prop in obj) this[prop] = obj[prop];
    
    if(this.password != "")
        this.password = this.generateHash(this.password);
}

Registration.prototype.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

Registration.prototype.findOne = function(req, data, callback) {
    var db = req.db;
    var collection = db.get('respot');
    
    if(data.username) {
        collection.find({"username":data.username },function(e,docs){
            
        if(docs.length == 0){
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

//called by an instance of Registration
Registration.prototype.save = function(req, callback) {
    var db = req.db;
    var SESSION = req.session;
    var collection = db.get('respot');
    
    // Creates a Model.Registration
    collection.insert(new Registration({
        username:this.username,
        password:this.password
    }));
    
    // Creates a Model.User
    collection.insert(new User({username:this.username}))
    .then(function(doc){
        SESSION.user = doc;
        callback(null); //success
    })
    
    //throw any needed errors here in the callback.
    callback(null);
}


// checking if password is validgit 
Registration.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
module.exports = Registration;