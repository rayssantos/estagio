/<?php
class Cachorro{
    public $nome; //atributos: caracteristicas do cachorro
    protected $peso;
    private $corPelo;

    public function correr(){ //metodos servem para definir o comportamento dos objetos
        echo "au au";
        $this->raca;
    }

    private function teste()
    {
        echo 'aqui';
    }
}

class Raca extends Cachorro{

    public function __construct()
    {
        $this->peso = '50';
        echo $this->peso."<br>";
        $this->corPelo;
        $this->correr();
    }

    public function setPeso($peso)
    {
        echo $this->peso = $peso;
    }

}


$objectDog = new Cachorro();
$objectDog->nome = 'Spyk';
//$objectDog->correr();

$objectDog2 = new Cachorro();
$objectDog2->nome = 'Spyk2';

$objectRaca = new Raca();
$objectRaca->nome = 'Skype';
$objectRaca->setPeso(60);
$objectRaca->peso = 'Skype';
echo $objectRaca->nome;

?>

