// Abstract controller
// The router contains the db connection among other things
function Controller(){

}

Controller.prototype.index=function(id){
    return "Mongo go get ID and cast it to certain type";
}
Controller.prototype.retrieve = function(arrayIDs){
    return "Mongo go get all IDs and cast all of them to object type";
}
Controller.prototype.create = function(){
    return "Mongo do what ever business logic u need to do b4 create"
}
Controller.prototype.update = function(){
    return "Mongo do what ever business logic u need to do b4 update"
}
Controller.prototype.delete = function(){
    return "Mongo do what ever business logic u need to do b4 delete"
}


function ControllerFactory(){
    return new Controller()
}

module.exports = ControllerFactory;