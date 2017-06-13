<?php
class Pessoa{
    protected $nome;


    public function setName($nome){
        $this->nome = $nome;
    }
    public function getName(){
        return $this->nome;

    }


}

class Funcionario extends Pessoa{
    private $cargo;



    public function setCargo($cargo){
        $this->cargo = $cargo;
    }

    public function getCargo(){
        return $this->cargo;
    }
}



$funcionario =  new Funcionario();
$funcionario->setName("Rayssa");
$funcionario->setCargo("estagiaria");
echo $funcionario->getName();
echo "<br>";
echo $funcionario->getCargo();