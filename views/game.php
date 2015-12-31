<!doctype html>
<html>
    <head>
       <meta charset="UTF-8">
       <title>ReSpot</title>
       <link rel="stylesheet" href="/views/styles/flashcard.css"/>
       <script src="https://code.jquery.com/jquery-latest.min.js"></script>

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
         </div>
    </body>
</html>