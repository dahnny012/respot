<?php 
class Flashcard{
    private $id;
    private $front;
    private $back;
    
    function __construct() {
		$this->id=0;
		$this->front='';
		$this->back='';
	}
	
	public function set($id,$front,$back) {
		$this->id=$id;
		$this->front=$front;
		$this->back=$back;
	}
	
	// DELETE FLASHCARD
	public function delete() {
		if ($this->id <= 0) { return 0; }

		include 'database.php';
		$conn = new mysqli($servername, $username, $password, $db, $port);

		if ($conn->connect_error) {
			$conn->close();
			return 0;
		} 

		$sql_query = 'DELETE FROM flashcards '.
					 'WHERE id='.(int)$this->id.' '.
					 'LIMIT 1;';
		$result = $conn->query($sql_query);

		if ($result) {
			$conn->close();
			return $this->id;
		}

		return 0;
	}
	
		// ADD NEW FLASHCARD
	public function add_new_flashcard() {
		include 'database.php';
		

		if ($conn->connect_error) {
			$conn->close();
			return 0;
		} 

		// insert
		$sql_query = 'INSERT INTO flashcards '.
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