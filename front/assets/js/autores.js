// Classe pessoa
function Person(name) {
  var self = this;
  self.name = name;
  //self.editing = ko.observable();

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
      url: 'http://localhost:81/v1/autores/' + person.idAutor,
      success: function(result){
        if(!!result.records.success){
          return self.autor.remove(person);
        }
        alert('Deu erro');
      }
    })
  };

  // self.editar = function(person) {
  //   $.ajax({
  //     type:'PUT'
  //     url:'http://localhost:81/v1/autores/'
  //     person.editing(!person.editing());
  //     success: function(result)

  //   });


  //  };

  self.setData = function(data){
    data.forEach(function(value){
      self.autor.push(value);
    });
  };

  $.ajax({
    url: 'http://localhost:81/v1/autores',
    type: 'GET',
    success: function(result){
      self.setData(result.records)

  }

  });

  var viewModel = {
    editing: ko.observable(false),
    setIsSelected: function() { this.isSelected(true) }
};


  self.add = function(){
    $.ajax({
      url: 'http://localhost:81/v1/autores',
      type: 'POST',
      data:{
        nome: self.nomeAutor(),
        generoAutor: self.generoAutor(),
        dataNasc: self.dataNasc()
      },
      success: function(inserir){
        self.autor.push(inserir.records);
        self.nomeAutor('');

      }
    });
   };
}
// Activates knockout.js
ko.applyBindings(new AppViewModel());










