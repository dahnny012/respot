<!doctype html>
<html>
    <head>
       <meta charset="UTF-8">
       <title>ReSpot</title>
       
       <script src="https://code.jquery.com/jquery-latest.min.js"></script>

       <!-- Latest compiled and minified CSS -->
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
        
       <!-- Optional theme -->
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
        
       <!-- Latest compiled and minified JavaScript -->
       <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
       
       <!-- own css -->
       <link rel="stylesheet" href="/views/styles/flashcard.css"/>
       
       

       <script type="text/javascript">
           $(document).ready(function() {
              $('.flashcard').on('click', function() {
                $('.flashcard').toggleClass('flipped');
              });
            });
       </script>
    </head>

    <body>
         <div class="stage">
            <div class="flashcard">
              <div class="front">
                <p>leg·er·de·main</p>
              </div>
              <div class="back">
                  <div class="title">
                      <p>legerdemain</p>
                  </div>
                <p>skillful use of one's hands when performing conjuring tricks.
synonyms:	sleight of hand, conjuring, magic, wizardry</p>
              </div>
            </div>  
            
            <div class="buttons">
                
            </div>
            
         </div>
    </body>
</html>