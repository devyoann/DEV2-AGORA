<?PHP
	class settings {
		public $sitename	= 'agora';
		public $url			= 'http://localhost';
		public $titledefault= 'TEST';

		var $sqlConnect		= 0;
		var $maintenance	= 0;

		public function db() {
			if($this->sqlConnect === 1){
				try {
					return new PDO('mysql:host=127.0.0.1;dbname=agora;charset=utf8', 'root', 'pssw2204');
				} catch (Exception $e) {
					die($e->getMessage());
				}
			}
		}
	}

	$settings = new settings();

	if($settings->maintenance === 1) {
		die('MAINTENANCE');
	}

	$db = $settings->db();
?>