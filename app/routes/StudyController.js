"use strict";


function StudyController(){
    
}



StudyController.prototype.retrieve = function(req,ids){
    var db = req.db;
    var collection = db.get('respot');
    return collection.find({
        '_id': { $in: ids}
    })
}



module.exports = StudyController