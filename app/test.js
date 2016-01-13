var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/mongo');
var ObjectId = require('mongodb').ObjectID;
var async = require("async");

var collection = db.get('respot');
//var id = "568b6713634950f831ada028";
collection.find({username:"Test"},function(e,docs){
    
    
    var ids = docs[0].history.map(function(e){
        return ObjectId(e.flashcardId);
    });
    
    var obj = ids.map(function(e){
    return e;
})

collection.find({
        '_id': { $in:obj}
    },function(e,docs){
        
        console.log("donezo");
        console.log(docs.length);
    })


async.map(ids, 
function(e,cb){
    collection.findById(e,function(e,doc){
        cb(null,doc);
    })
}
, function(err, results){
    console.log("done");
            console.log(results.length);
    // results is now an array of stats for each file
});
    
    
})



