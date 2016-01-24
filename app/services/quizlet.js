var promise = require("bluebird");
var get = promise.promisify(require("needle").get);
var Deck = require("../models/Deck");
var Card = require("../models/Card");

function Quizlet(){
    this.key = "client_id=YpEaJ6BC5P";
    this.base = "https://api.quizlet.com/2.0";
    var self = this;

    this.searchSets=function(query,page){
        if(page == undefined)
            page = 1;
        var query = "https://api.quizlet.com/2.0/search/sets?q="+query+
                                                        "&page="+page+"&"+
                                                        self.key;
        return get(query)
    }
    
    this._getSet=function(id){
        var query = "https://api.quizlet.com/2.0/sets/"+id+"?"+self.key;
        return get(query)
    }
    
    this.getDeck = function(id){
        return this._getSet(id).then(function(res,err){
            var set = res.body;
            return adapter.quizToRespot(set);  
        })
    }
    
    this.helpers = {
        printTitle: function(json){
            json.forEach(function printTitle(e){
                console.log(e.title);
            })
        },
        printTerms: function(set){
            set.terms.forEach(function printTerms(e){
                console.log(e.term);
                console.log(e.definition);
            })
        }
    }
}

var quiz = new Quizlet();
var adapter = new QuizletAdapter();



// Example Model class shit i care about
function ExampleSet(){
    var example = { id: 47404321,
       url: '/47404321/genki-1-ch2-vocab-flash-cards/',
       title: 'Genki 1 Ch.2 Vocab',
       created_by: 'rarruda008',
       term_count: 48,
       created_date: 1409796121,
       modified_date: 1409796121,
       published_date: 1409796121,
       has_images: false,
       description: 'きょうかしょ"げんき 1"\nだいにかのたんご。',
       terms:[{
	      "term": "une grenouille",
	      "definition": "a frog",
       }]
        
    }
}

// Adapts from their schema to ours
function QuizletAdapter(){
    this.quizToRespot = function(set){
        // return a new set adapted for respot
        var respot = {
            deck:new Deck({name:set.title,description:set.description}),
            cards:set.terms.map(function toCards(e){
                return new Card({front:e.term,back:e.definition})
            })
        }
        return respot;
    }
}


module.exports = quiz;