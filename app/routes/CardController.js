var Controller = require("./Controller");
var ObjectId = require('mongodb').ObjectID;

function CardController(){

}


CardController.prototype = new Controller();

CardController.prototype.update = function(req,res){
    var POST = req.body;
    var SESSION = req.session;
    var db = req.db;
    var collection = db.get('respot');
    var controller = this;
    
    var cardID = req.params.cardID;
    
    var target = {"_id":ObjectId(cardID)};
    var query = {$set:{"front":POST.front,"back":POST.back}}
    
    collection.update(target,query,function(e){
        req.json({success:e == null})
    });
}
CardController.prototype.delete = function(req,res){
    var POST = req.body;
    var SESSION = req.session;
    var user = SESSION.user;
    var db = req.db;
    var collection = db.get('respot');
    var controller = this;
    var cardID = POST.cardID;
    var deckID =  POST.deckID;
    
    collection.remove({"_id":cardID},function(e){
        // Update the srs
        var target = {"_id":ObjectId(user._id)};
        var query = {};
        query["srs."+deckID+".$.flashcardID"] = cardID;
        collection.update(target,{$pull:query});
        
        // Update the deck
        target = {"_id":ObjectId(deckID)};
        query = {};
        query["cards"] = cardID;
        collection.update(target,{$pull:query});
    })
}

module.exports = CardController;