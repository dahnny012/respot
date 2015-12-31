<?php 

class Deck{
    private $id;
    private $name;
    private $queue;
    private $cards;
    private $favorites;
    
    function __construct() {
		$this->id=0;
		$this->name='';
		$this->queue=array();
		$this->cards=array();
		$this->favorites=array();
	}
	
	public function set($id,$name) {
		$this->acc_id=$id;
		$this->acc_name=$name;
	}
	
	public function add_new_deck() {
		include 'database.php';

		if ($conn->connect_error) {
			$conn->close();
			return 0;
		} 

		// insert
		$sql_query = 'INSERT INTO deck '.
					 '(id, front, back) '.
					 'VALUES '.
					 '(\''.$this->id.'\', '.
					 '\''.$this->front.'\', '.
					 '\''.$this->back.'\');';

		$result = $conn->query($sql_query);

		if ($result) {
			$conn->close();
			return 1;
		}

		return 0; // something is wrong
	}
	
}


?>