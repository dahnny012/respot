var Controller = require("./Controller");
var ObjectId = require('mongodb').ObjectID;

function CardController(){

}


CardController.prototype = new Controller();

CardController.prototype.update = function(req,res){
    var POST = req.body;
    var db = req.db;
    var collection = db.get('respot');
    
    var cardID = req.params.cardID;
    
    var target = {"_id":ObjectId(cardID)};
    var query = {$set:{"front":POST.front,"back":POST.back}}
    
    collection.update(target,query,function(e){
        res.json({success:e == null})
    });
}

CardController.prototype.delete = function(req,res){
    var POST = req.body;
    var user = req.user;
    var db = req.db;
    var collection = db.get('respot');
    var cardID = req.params.cardID;
    var deckID =  POST.deckID;
    
    collection.remove({"_id":cardID},function(e){
        // Update the srs
        var target = {"_id":ObjectId(user._id)};
        var query = {};
        query["srs."+deckID] = {"flashcardID":ObjectId(cardID)};
        collection.update(target,{$pull:query});
        
        // Update the deck
        var target = {"_id":ObjectId(deckID)};
        var query = {};
        query["cards"] = ObjectId(cardID);
        collection.update(target,{$pull:query});
        
        // Update the history.
        var target = {"_id":ObjectId(user._id)};
        var query = {};
        query["history"] = {"flashcardID":cardID};
        collection.update(target,{$pull:query});
    })
}

module.exports = CardController;