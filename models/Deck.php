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
	
}


?>