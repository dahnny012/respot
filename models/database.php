<?php
      $servername = getenv('IP');
      $port = 3306;
      $db = 'respot';
      $username = getenv('C9_USER');
      $password = '';
      $conn = new mysqli($servername, $username, $password, $db, $port);
?>