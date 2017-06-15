// Classe pessoa
function Autor(objAutor) {
  var self = this;
//criar uma funcao para tornar os values observaveis pois so as colunas estavam como observavei
  self.nome = ko.observable(objAutor.nome);
  self.idAutor = ko.observable(objAutor.idAutor);
  self.dataNasc = ko.observable(objAutor.dataNasc);
  self.generoAutor=ko.observable(objAutor.generoAutor);
  self.editing = ko.observable();

  self.editing.subscribe(function(editing){
    console.log(editing);
    if (editing === false){
      $.ajax({
        type: 'PUT',
        url: window.global.urlapi + '/v1/autores/' + self.idAutor(), // ele pega o id pela rota, por isso nao preciso declarar ali em baixo
        data:{
          nome: self.nome(),
          dataNasc: self.dataNasc(),
          generoAutor: self.generoAutor(),
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
  self.autor = ko.observableArray();
  self.nomeAutor = ko.observable();
  self.generoAutor = ko.observable();
  self.dataNasc = ko.observable();
  self.editing = ko.observable();



  //self.addPerson = function () {
    //self.people.push(new Person(self.personName()));
  //};

  self.enter= function(model, event){
    if (event.keyCode === 13){
      self.addPerson();
      self.personName("");
    }
  }

  self.excluir = function(person){
    $.ajax({
      type: 'DELETE',
      url: window.global.urlapi + '/v1/autores/' + person.idAutor(),
      success: function(result){
        if(!!result.records.success){
          return self.autor.remove(person);
        }
      }
    })
  };

  self.editar = function(autor){
    autor.editing(!autor.editing());
  };

  self.editRow = function(autor){
    if(!autor.editing()){
      autor.editing(true);
    }
  };

  self.setData = function(data){

    data.forEach(function(value){
      self.autor.push(new Autor(value));
    });
  };

  $.ajax({
    url: window.global.urlapi + '/v1/autores',
    type: 'GET',
    success: function(result){
      self.setData(result.records)
    }
  });



  self.add = function(){
    $.ajax({
      url: window.global.urlapi + '/v1/autores',
      type: 'POST',
      data:{
        nome: self.nomeAutor(),
        generoAutor: self.generoAutor(),
        dataNasc: self.dataNasc()
      },
      success: function(inserir){
        self.autor.push(new Autor(inserir.records));
        self.nomeAutor('');

      }
    });
   };
}
// Activates knockout.js
window.model = new AppViewModel();
ko.applyBindings(window.model);










