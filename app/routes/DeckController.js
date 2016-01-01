var Controller = require("./Controller");

// The router contains the db connection among other things
// Monk.js
function DeckController(router){
    this.router = router;
}



DeckController.prototype = Controller;
DeckController.prototype.get = function(){}
DeckController.prototype.getAll = function(){}
DeckController.prototype.update = function(){}
DeckController.prototype.delete = function(){}
DeckController.prototype.create = function(){}


module.exports = DeckController