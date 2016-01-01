"use strict";

var Controller = require("./Controller");

function DeckController(){

}



DeckController.prototype = Controller;
DeckController.prototype.index = function(){
    
}
DeckController.prototype.retrieve = function(req,ids){
    var db = req.db;
    var collection = db.get('respot');
    return collection.find({
        '_id': { $in: ids}
    })
}
    
DeckController.prototype.update = function(){
    
}
DeckController.prototype.delete = function(){
    
}
DeckController.prototype.create = function(){
    
}


module.exports = DeckController;