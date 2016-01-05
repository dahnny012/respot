var needle = require("needle");

function Dictionary(type)
{
	this.apiKey = "&apikey=LwBMdDWB71X5Ulumr58CVdA2WR8W2EWc";
	this.limit = 30;
	this.type = type || "ldoce5";
	return this;
}

Dictionary.prototype.buildQuery = function(spell){
	//all = true;
	var request = [];
	request.push("https://api.pearson.com:443/v2/dictionaries/"+this.type+"/entries?headword=");
	var request2= "&limit="+this.limit+"&apikey=QeCNmBeHtSGbfr1KfK8OCWC85w8scfsy";
	var i=0;
	while(spell[i] != null)
	{
	    request.push(spell[i]);
		if(spell[i + 1] != null)
			request.push(",");
		i++;
	}
    return request.join()+request2;
};


Dictionary.prototype.randomQuery = function(){
	//all = true;
	var request = []
	var MAXSIZE = 50000;
	var randomOffset = Math.floor(Math.random() * MAXSIZE);
	request.push("https://api.pearson.com:443/v2/dictionaries/"+this.type+"/entries?offset="+randomOffset);
	var request2= "&limit="+this.limit+"&apikey=QeCNmBeHtSGbfr1KfK8OCWC85w8scfsy";
    return request.join();
};

Dictionary.prototype.search = function (wordsArray,cb) {
	var request = this.buildQuery(wordsArray);
	var buffer = [];
	needle.get(request ,function(error, response) {
	    var data = response.body.results;
	    if(data){
            data.forEach(function(e){
                if(e.headword &&
                e.senses &&
                e.senses.length > 0 && 
                e.senses[0].definition &&
                e.senses[0].definition.length > 0){
                    var word =  new Word(e.headword,e.senses[0].definition[0]);
                    buffer.push(word);
                }
                
            })
	    }
	    cb(buffer);
    });
};


Dictionary.prototype.randomCard = function (cb) {
	var request = this.randomQuery();
	var buffer = [];
	needle.get(request ,function(error, response) {
	    var data = response.body.results;
	    if(data){
	        for (var i = 0; i < data.length; i++) {
	            var e = data[i];
                if(e.headword &&
                e.senses &&
                e.senses.length > 0 && 
                e.senses[0].translation){
                    var word =  new Word(e.headword,e.senses[0].translation);
                    cb(word);
                    return;
                }
	        }
	    }else{
	        cb(new Word("",""));
	    }
    });
};


function Word(word,def){
    this.word = word;
    this.def = def;
}


module.exports = Dictionary;