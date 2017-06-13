<?php

header('Content-Type: text/html; charset=utf-8');
echo "hello world";

$numero = 5;

/*$msg = 'O número é igual a 5';
if ($numero > 5) {

   $msg =  'O número é maior que 5';
}
 if ($numero < 5) {

    $msg = 'O número é menor que 5';
}
echo $msg;
*/

$numero = 5;

$resposta = ($numero > 5) ? 'Maior que 5' : 'Menor ou igual a 5';

$resposta = ($numero > 5) ? : ;

if ($numero>5) {

	$resposta = "maior que 5";

 } else{

 	$resposta = 'menor igual a 5';
 }