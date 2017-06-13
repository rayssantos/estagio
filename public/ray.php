<?php


$connection = new \PDO("mysql:host=mariadb;dbname=estagio;", 'root', '32130'); //conectar no banco

$query = $connection->query('select * from Usuario');
$query->setFetchMode(PDO::FETCH_ASSOC);
$records = $query->fetchAll();
echo "<pre>";
echo PDO::FETCH_ASSOC;
print_r ($records);
*/
//foreach ($records as $Usuario) {

    //echo "id: ". $Usuario ["id"]. " nome: ".$Usuario ["nome"].  " email: ".$Usuario ["email"]."<br>"; //listar


    # code...
//}

//$connection->query('delete from Usuario where email= "diogo@gmail.com"');  //deletar dados da tabela


// try { //inserir dados na tabela

//     $statement = $connection->prepare("insert into Usuario (nome,email) values (:nome, :email)");
//     $statement->execute([
//         'nome' => 'diogo',
//         'email' =>'diogo@gmail.com',
//     ]);
// } catch (Exception $e) {
//     throw new Exception('Oops! An error ocurred when trying to run the insert command.');
// }

//$connection->query("update Usuario set email='joao@hotmail.com' where id=2 ");//atualizar dados na tabela*/

