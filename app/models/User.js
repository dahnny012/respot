"use strict";

function User(obj){
    this.username = "";
    this.score = "";
    this.decks = [];
    this.srs = {};
    this.history = [];
    this.type = "user";
    for (var prop in obj) this[prop] = obj[prop];
}


//called by an instance of Registration
User.prototype.save = function(req, callback) {
    var db = req.db;
    var SESSION = req.session;
    var collection = db.get('respot');
    
    // Creates a Model.Registration
    collection.insert(this).then(function(doc){
        SESSION.user = doc;
        callback(null); //success
    });
}

User.prototype.get = function(req){
    var db = req.db;
    var SESSION = req.session;
    var collection = db.get('respot');
    return collection.find({"username":this.username,"type":"user"});
}

module.exports = User