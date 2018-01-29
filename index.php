<?PHP
	require('global.php');

	$thispage = array(
		'id'		=> 1,
		'name'		=> 'index',
		'title'		=> 'mon index'
	);
?><!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title><?PHP if(isset($thispage)) echo $thispage['title']; else echo 'Hello'; ?></title>
</head>
<body>
	<h1>Salut</h1>
</body>
</html>