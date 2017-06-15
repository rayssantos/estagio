// Classe pessoa
function Funcionarios(objFuncionarios) {
  var self = this;


//criar uma funcao para tornar os values observaveis pois so as colunas estavam como observavei

  self.idFuncionario = ko.observable(objFuncionarios.idFuncionario);
  self.nomeFuncionario = ko.observable(objFuncionarios.nomeFuncionario);
  self.cargo = ko.observable(objFuncionarios.cargo);
  self.editing = ko.observable();

  self.editing.subscribe(function(editing){
    if (editing === false){
      $.ajax({
        type: 'PUT',
        url: window.global.urlapi + '/v1/funcionarios/' + self.idFuncionario(), // ele pega o id pela rota, por isso nao preciso declarar ali em baixo
        data:{
          //idFuncionario: self.idFuncionario(),
          nomeFuncionario: self.nomeFuncionario(),
          cargo: self.cargo()
        },
        success: function(result){
          // console.log(result);
        }
      });
    }
  });
}

function AppViewModel() {
  var self = this;
  self.people = ko.observableArray([]);// Lista de pessoas
  self.personName = ko.observable("");// pega o que o cara vai digitar
  self.funcionarios = ko.observableArray();// pega o que o cara vai digitar
  self.Nomefuncionario = ko.observable();// pega o que o cara vai digitar
  //self.idFuncionario = ko.observable();
  self.nomeFuncionario = ko.observable();
  self.cargo = ko.observable();
  self.editing = ko.observable();

  //self.autores = ko.observableArray();



  self.enter= function(model, event){
    if (event.keyCode === 13){
      self.addPerson();
      self.personName("");
    }
  }

  self.excluir = function(person){
    $.ajax({
      type: 'DELETE',
      url: window.global.urlapi + '/v1/funcionarios/' + person.idFuncionario(),
      success: function(result){
        if(!!result.records.success){
          return self.funcionarios.remove(person);
        }
      }
    })
  };

  self.editar = function(funcionarios){
    funcionarios.editing(!funcionarios.editing());
  };

  self.editRow = function(funcionarios){
    if(!funcionarios.editing()){
      funcionarios.editing(true);
    }
  };

  self.setData = function(data){
    data.forEach(function(value){
      self.funcionarios.push(new Funcionarios(value));
    });
  };

  $.ajax({
    url: window.global.urlapi + '/v1/funcionarios',
    type: 'GET',
    success: function(result){
      self.setData(result.records);
      // console.log(result.records);

    }
  });



  self.add = function(){
    $.ajax({
      url: window.global.urlapi + '/v1/funcionarios',
      type: 'POST',
      data:{
        nomeFuncionario: self.Nomefuncionario (),
   //     idFuncionario: self.idFuncionario(),
        cargo: self.cargo()
        //nomeFuncionario: self.nomeFuncionario()
      },
      success: function(inserir){ //cria uma funcao inserir
         self.funcionarios.push(new Funcionarios(inserir.records));
         self.Nomefuncionario ('');
         self.cargo('');
        }
    });
  };
}



// Activates knockout.js
window.model = new AppViewModel();
ko.applyBindings(window.model);










