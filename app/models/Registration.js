function Registration(obj){
    this.username = "";
    this.password = "";
    this.type="registration";
    for (var prop in obj) this[prop] = obj[prop];
}


module.exports = Registration;