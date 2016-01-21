var promise = require("bluebird");
var get = promise.promisify(require("needle").get);
var Deck = require("../models/Deck");


function Quizlet(){
    this.key = "client_id=YpEaJ6BC5P";
    this.base = "https://api.quizlet.com/2.0";
    var self = this;

    this.searchSets=function(query){
        var query = "https://api.quizlet.com/2.0/search/sets?q="+query+"&"+self.key;
        console.log(query);
        return get(query)
    }
    
    
    this.getSet=function(id){
        var query = "https://api.quizlet.com/2.0/sets/"+id+"?"+self.key;
        console.log(query);
        return get(query)
    } 
    
    
    
}

var quiz = new Quizlet();
var quizset = new QuizletSets();

// Static
function QuizletSets(set){
    this._printTitles = function(json){
        json.forEach(function printTitle(e){
            console.log(e.title);
        })
    },
    
    this._printTerms = function(set){
        set.terms.forEach(function printTerms(e){
            console.log(e.term);
            console.log(e.definition);
        })   
    }
}


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
            cards:[]
        }
        
        
        respot.cards = set.terms.map(function toCards(e){
            
        })
        
        return respot;
    }
}


quiz.searchSets("genki").then(function(res,err){
    var json = res.body;
    var sets = json.sets;
    var id = sets[0].id;
    quiz.getSet(id).then(function(res,err){
        var set = res.body;
        quizset._printTerms(set);
    })
    
})