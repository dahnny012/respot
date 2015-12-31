function SRS(obj){
    this.timer = new Date();
    this.flashcardID = "";
    for (var prop in obj) this[prop] = obj[prop];
}

module.exports = SRS;