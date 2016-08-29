<?php 
//$body = print_r($_POST, true);
$body ="\rИмя: {$_POST['type1']};\r\n<br>Телефон: {$_POST['type2']};\r\n<br>Офис: {$_POST['type3']};\r\n";
$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
mail('ah@proverstka.com', 'ShipMe', $body, $headers);
//echo 'ok';
?>