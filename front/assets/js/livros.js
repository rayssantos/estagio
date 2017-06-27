// Classe pessoa
function Livros(objLivro) {
  var self = this;


//criar uma funcao para tornar os values observaveis pois so as colunas estavam como observaveis

  self.idLivros = ko.observable(objLivro.idLivros);
  self.Autor_idAutor = ko.observable(objLivro.Autor_idAutor);
  self.titulo = ko.observable(objLivro.titulo);
  self.nome = ko.observable(objLivro.nome);
  self.editing = ko.observable();

  self.editing.subscribe(function(editing){
    if (editing === false){
      $.ajax({
        type: 'PUT',
        url: window.global.urlapi + '/v1/livros/' + self.idLivros(), // ele pega o id pela rota, por isso nao preciso declarar ali em baixo
        data:{
          Autor_idAutor: self.Autor_idAutor(),
          titulo: self.titulo(),
        },
        success: function(result){
          // console.log(result);
        }
      });
    }
  });
}

function Autor(objAutor){
  var self = this;
  // console.log(objAutor);
  self.idAutor = ko.observable(objAutor.idAutor);
  self.nomeAutor = ko.observable(objAutor.nome);
  console.log(self.nomeAutor);
}


function AppViewModel() {
  var self = this;

  self.people = ko.observableArray([]);// Lista de pessoas
  self.personName = ko.observable("");// pega o que o cara vai digitar
  self.Autor_idAutor = ko.observable();
  self.titulo = ko.observable();
  self.editing = ko.observable();
  self.livros = ko.observableArray();
  self.autores = ko.observableArray();
  self.nomeAutor = ko.observable();

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
      url: window.global.urlapi + '/v1/livros/' + person.idLivros(),
      success: function(result){
        if(!!result.records.success){
          return self.livros.remove(person);
        }
      }
    })
  };

  self.editar = function(livros){
    livros.editing(!livros.editing());
  };

  self.editRow = function(livros){
    if(!livros.editing()){
      livros.editing(true);
    }
  };

  self.setData = function(data){
    data.forEach(function(value){
      self.livros.push(new Livros(value));
    });
  };

  $.ajax({
    url: window.global.urlapi + '/v1/livros',
    type: 'GET',
    success: function(result){
      self.setData(result.records);
      // console.log(result.records);

    }
  });

  self.setAutor = function(data){
    data.forEach(function(value){
      // console.log(value);
      self.autores.push(new Autor(value));
     //console.log(self.autores());
    });
  };

  $.ajax({
    url: window.global.urlapi + '/v1/autores',
    type: 'GET',
    success: function(result){
      self.setAutor(result.records)
    }
  });



  self.add = function(){
    $.ajax({
      url: window.global.urlapi + '/v1/livros',
      type: 'POST',
      data:{
        Autor_idAutor: self.Autor_idAutor(),
        titulo: self.titulo()
      },
      success: function(inserir){ //cria uma funcao inserir
        var secSearch = ko.utils.arrayFirst( //usa o array first
          self.autores(),
          function(secEditingAccount) {
            return secEditingAccount.idAutor() === self.Autor_idAutor();
          }
        );
        inserir.records.nome = secSearch.nomeAutor();

        self.livros.push(new Livros(inserir.records));

        self.Autor_idAutor('');
        self.titulo('');
        self.idLivros('');
      }
    });
  };
}


// Activates knockout.js
window.model = new AppViewModel();
ko.applyBindings(window.model);










