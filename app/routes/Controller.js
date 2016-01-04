// Abstract controller

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