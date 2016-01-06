// Abstract controller


var async = require("async");
function Controller(){

}

Controller.prototype.index=function(){

}

Controller.prototype.create = function(){

}

Controller.prototype.retrieve = function(req,ids){
    var db = req.db;
    var collection = db.get('respot');
    return collection.find({
        '_id': { $in: ids}
    })
}

Controller.prototype.bulkByID = function(req,ids,cb){
    var db = req.db;
    var collection = db.get('respot');
    var buffer = [];
    
    async.map(ids, 
    function(e,cb){
        collection.findById(e,function(e,doc){
            cb(null,doc);
        })
    }
    , function(err, results){
        cb(results);
    });
}

Controller.prototype.update = function(){
    
}
Controller.prototype.delete = function(req,ids){
    var db = req.db;
    var collection = db.get('respot');
    return collection.remove({
        '_id': { $in: ids}
    })
}


function ControllerFactory(){
    return new Controller()
}

module.exports = ControllerFactory;