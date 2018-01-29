<?PHP
	require('global.php');

	class thisPage {
		public $id		= 1;
		public $name	= 'index';
		public $title	= 'TITLE DE TA PAGE';
	}

	$thisPage = new thisPage();
?><!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title><?PHP if(isset($thisPage->title)) echo $thisPage->title; else echo $general->titledefault; ?></title>
</head>
<body>
	<h1>Salut</h1>

</body>
</html>