var needle = require("needle");

function Dictionary()
{
	this.apiKey = "&apikey=LwBMdDWB71X5Ulumr58CVdA2WR8W2EWc";
	this.limit = 30;
	return this;
}

Dictionary.prototype.buildQuery = function(spell){
	//all = true;
	var request = [];
	request.push("https://api.pearson.com:443/v2/dictionaries/ldoce5/entries?headword=");
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

function Word(word,def){
    this.word = word;
    this.def = def;
}

var dict = new Dictionary();

module.exports = dict;