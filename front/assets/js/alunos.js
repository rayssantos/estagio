// Classe pessoa
function Alunos(objAlunos) {
  var self = this;

//criar uma funcao para tornar os values observaveis pois so as colunas estavam como observavei
  self.idNome = ko.observable(objAlunos.idNome);
  self.matriculaAluno = ko.observable(objAlunos.matriculaAluno);
  self.Livros_Livrosid = ko.observable(objAlunos.Livros_Livrosid);
  self.editing = ko.observable();

  self.editing.subscribe(function(editing){
    console.log(editing);
    if (editing === false){
      $.ajax({
        type: 'PUT',
        url: 'http://localhost:81/v1/alunos/' + self.matriculaAluno(), // ele pega o id pela rota, por isso nao preciso declarar ali em baixo
        data:{
          idNome: self.idNome(),
          Livros_Livrosid: self.Livros_Livrosid(),
        },
        success: function(result){
          console.log(result);
        }
      });
    }
  });
}

function AppViewModel() {
  var self = this;
  self.people = ko.observableArray([]);// Lista de pessoas
  self.personName = ko.observable("");// pega o que o cara vai digitar
  self.alunos = ko.observableArray();
  self.idNome = ko.observable();
  self.Livros_Livrosid = ko.observable();
  self.editing = ko.observable();

   self.enter = function(model, event){
    if (event.keyCode === 13){
      self.addPerson();
      self.personName("");
    }
  }

  self.excluir = function(person){
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:81/v1/alunos/' + person.matriculaAluno(),
      success: function(result){
        if(!!result.records.success){
          return self.alunos.remove(person);
        }
      }
    })
  };

  self.editar = function(alunos){
    alunos.editing(!alunos.editing());
  };

  self.editRow = function(alunos){
    if(!alunos.editing()){
      alunos.editing(true);
    }
  };

  self.setData = function(data){
    data.forEach(function(value){
      self.alunos.push(new Alunos(value));
    });
  };

  $.ajax({
    url: 'http://localhost:81/v1/alunos',
    type: 'GET',
    success: function(result){
      self.setData(result.records);
    }
  });



  self.add = function(){
    $.ajax({
      url: 'http://localhost:81/v1/alunos',
      type: 'POST',
      data:{
        idNome: self.idNome(),
        Livros_Livrosid: self.Livros_Livrosid()
      },
      success: function(inserir){
        self.alunos.push(new Alunos(inserir.records));
        self.idNome('');
      }
    });
  };
};

// Activates knockout.js
window.model = new AppViewModel();
ko.applyBindings(window.model);