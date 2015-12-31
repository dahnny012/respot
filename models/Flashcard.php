<?php 
class Flashcard{
    private $fc_id;
    private $fc_front;
    private $fc_back;
    
    function __construct() {
		$this->fc_id=0;
		$this->fc_front='';
		$this->fc_back='';
	}
	
	public function set($id,$front,$back) {
		$this->fc_id=$id;
		$this->fc_front=$front;
		$this->fc_back=$back;
	}
	
	// DELETE FLASHCARD
	public function delete() {
		if ($this->fc_id <= 0) { return 0; }

		include 'database.php';
		$conn = new mysqli($servername, $username, $password, $db, $port);

		if ($conn->connect_error) {
			$conn->close();
			return 0;
		} 

		$sql_query = 'DELETE FROM flashcards '.
					 'WHERE fc_id='.(int)$this->fc_id.' '.
					 'LIMIT 1;';
		$result = $conn->query($sql_query);

		if ($result) {
			$conn->close();
			return $this->fc_id;
		}

		return 0;
	}
	
	// ADD NEW FLASHCARD
	public function add_new_flashcard() {
		include 'database.php';
		$conn = new mysqli($servername, $username, $password, $db, $port);

		if ($conn->connect_error) {
			$conn->close();
			return 0;
		} 

		// insert
		$sql_query = 'INSERT INTO flashcards '.
					 '(id, front, back) '.
					 'VALUES '.
					 '(\''.$this->fc_id.'\', '.
					 '\''.$this->fc_front.'\', '.
					 '\''.$this->fc_back.'\');';

		$result = $conn->query($sql_query);

		if ($result) {
			$conn->close();
			return 1;
		}

		return 0; // something is wrong
	}
}

?>