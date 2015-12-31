<?php 


$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
$collection = new MongoDB\Collection($manager, "demo.beers");

/* Inserts One Doc

    $result = $collection->insertOne( [ 'name' => 'Hinterland', 'brewery' => 'BrewDog' ] );

    echo "Inserted with Object ID '{$result->getInsertedId()}'";

*/


/* Queries a doc

$result = $collection->find( [ 'name' => 'Hinterland', 'brewery' => 'BrewDog' ] );

foreach ($result as $entry)
{
    echo $entry->_id, ': ', $entry->name, "\n";
}
*/

?>