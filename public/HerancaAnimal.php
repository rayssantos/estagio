<?php
class Animal{
    protected $comer = 0;
    protected $andar = 0;


    public function comer(){
        $this->comer = 1;
    }

    public function estaComendo (){
        if($this->comer == 1){

            return "esta comendo";

        }
        return "nao esta comendo";
    }
    public function pararComer(){
        $this->comer = 0;
    }
    public function andar(){
        $this->andar = 1;
    }
    public function parar(){
        $this->andar = 0;

    }
    public function estaAndando(){
        if ($this->andar == 1){

            return "esta andando";

        }
        return "nao esta andando";
    }
}
class Cachorro extends Animal{


    public function latir(){
        return "au-au";

    }
}

$cachorro = new Cachorro();
$cachorro->comer();
$cachorro->andar();
echo $cachorro->estaComendo();
echo"<br>";
echo $cachorro->estaAndando();
echo $cachorro->latir();





