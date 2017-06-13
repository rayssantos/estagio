<?php

class Funcionario{
    private $nome;
    private $cargo;

    public function setName($nome){
        $this->nome = $nome;

    }
    public function setCargo($cargo){
        $this->cargo = $cargo;


    }

    public function getNome(){
        return $this->nome;


    }

    public function getCargo(){
        return $this->cargo;
    }

}

$funcionario = new Funcionario();
$funcionario->setName("rayssa");
$funcionario->setCargo("estagiaria");
echo $funcionario->getCargo();
echo "<br>";
echo $funcionario->getNome();






