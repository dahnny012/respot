<!doctype html>
<html>
    <head>
       <meta charset="UTF-8">
       <title>ReSpot</title>
       <link rel="stylesheet" href="styles/flashcard.css"/>
       <script src="http://code.jquery.com/jquery-latest.min.js"></script>

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
                <p>Front</p>
              </div>
              <div class="back">
                <p>Back</p>
              </div>
            </div>  
         </div>
    </body>
</html>