<?php
 
 
function checkConnection(){
    $ch = curl_init();
     
    curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:5984/');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    	'Content-type: application/json',
    	'Accept: */*'
    ));
     
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}



function listDB(){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:5984/_all_dbs');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    	'Content-type: application/json',
    	'Accept: */*'
    ));
     
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}


function createDB(){
    $table = 'customers';
    $ch = curl_init();
     
    curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:5984/'.$table);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, 'couchdb:crystal');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    	'Content-type: application/json',
    	'Accept: */*'
    ));
     
    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}



$ops =array(checkConnection,
            listDB,
            createDB,
            listDB
);


foreach($ops as $op){
    var_dump($op());   
}


 
 ?>