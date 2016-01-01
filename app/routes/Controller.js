// Abstract controller
// The router contains the db connection among other things
function Controller(){

}

Controller.prototype.index=function(){

}
Controller.prototype.retrieve = function(){

}
Controller.prototype.create = function(){

}
Controller.prototype.update = function(){
    
}
Controller.prototype.delete = function(){
    
}


function ControllerFactory(){
    return new Controller()
}

module.exports = ControllerFactory;