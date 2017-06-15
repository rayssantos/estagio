function Emprestimos(objEmprestimo) {
  var self = this;

//criar uma funcao para tornar os values observaveis pois so as colunas estavam como observavei
  self.idEmprestimo = ko.observable(objEmprestimo.idEmprestimo);
  self.Aluno_idAluno = ko.observable(objEmprestimo.Aluno_idAluno);
  self.dataEmprestimo = ko.observable(objEmprestimo.dataEmprestimo);
  self.Livro_idLivro = ko.observable(objEmprestimo.Livro_idLivro);
  self.id_funcionario= ko.observable(objEmprestimo.id_funcionario);
  self.editing = ko.observable();

  self.editing.subscribe(function(editing){
    if (editing === false){
      $.ajax({
        type: 'PUT',
        url: window.global.urlapi + '/v1/emprestimos/' + self.idEmprestimo(), // ele pega o id pela rota, por isso nao preciso declarar ali em baixo
        data:{
          Aluno_idAluno: self.Aluno_idAluno(),
          Livro_idLivro: self.Livro_idLivro(),
          id_funcionario:self.id_funcionario(),
          dataEmprestimo: self.dataEmprestimo(),
        },
        success: function(result){

        }
      });
    }
  });
}

function Matricula(objMatricula){
  var self = this;
  self.matriculaAluno = ko.observable(objEmprestimo.matriculaAluno);
  //self.CodEmprestimo = ko.observable(objEmprestimo.CodEmprestimo);
}
function Funcionario(objFuncionario){
  var self = this;
  self.idFuncionario = ko.observable(objFuncionario.idAutor);
  //self.CodEmprestimo = ko.observable(objFuncionario.CodEmprestimo);
}
function Codigo(objCodigo){
  var self = this;
  self.idLivros = ko.observable(objCodigo.idLivros);
 // self.CodEmprestimo = ko.observable(objEmprestimo.CodEmprestimo);
}
function AppViewModel() {
  var self = this;
  self.people = ko.observableArray([]);// Lista de pessoas
  self.personName = ko.observable("");// pega o que o cara vai digitar
  self.emprestimos = ko.observableArray();
  self.Aluno_idAluno = ko.observable();
  self.Livro_idLivro = ko.observable();
  self.id_funcionario = ko.observable();
  self.dataEmprestimo = ko.observable();
  self.CodEmprestimo =  ko.observable();
  self.CodEmprestimo2 = ko.observable();
  self.CodEmprestimo3 = ko.observable();
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
      url: window.global.urlapi + '/v1/Emprestimos/' + person.Aluno_idAluno(),
      success: function(result){
        if(!!result.records.success){
          return self.Emprestimos.remove(person);
        }
      }
    })
  };

  self.editar = function(Emprestimos){
    Emprestimos.editing(!Emprestimos.editing());
  };

  self.editRow = function(Emprestimos){
    if(!Emprestimos.editing()){
      Emprestimos.editing(true);
    }
  };

  self.setData = function(data){
    data.forEach(function(value){
      self.Emprestimos.push(new Emprestimos(value));
    });
  };

  $.ajax({
    url: window.global.urlapi + '/v1/emprestimos',
    type: 'GET',
    success: function(result){
      self.setData(result.records);
    }
  });

   self.setEmprestimos = function(data){
    data.forEach(function(value){
      // console.log(value);
      self.emprestimos.push(new Autor(value));
     //console.log(self.autores());
    });
  };

  $.ajax({
    url: window.global.urlapi + '/v1/emprestimos',
    type: 'GET',
    success: function(result){
      self.setAutor(result.records)
    }
  });



  self.add = function(){
    $.ajax({
      url: window.global.urlapi + '/v1/Emprestimos',
      type: 'POST',
      data:{
        idEmprestimo: self.idEmprestimo(),
        dataEmprestimo: self.dataEmprestimo()
      },
        success: function(inserir){ //cria uma funcao inserir
        var secSearch = ko.utils.arrayFirst( //usa o array first
          self.emprestimos(),
          function(secEditingAccount) {
            return secEditingAccount.matriculaAluno() === self.Aluno_idAluno();
          }
        );
        inserir.records.nome = secSearch.CodEmprestimo();

        self.livros.push(new Emprestimos(inserir.records));

        self.Aluno_idAluno('');
        self.idEmprestimo('');
      }
    });
  };
}
self.add = function(){
    $.ajax({
      url: window.global.urlapi + '/v1/Emprestimos',
      type: 'POST',
      data:{
        idEmprestimo: self.idEmprestimo(),
        dataEmprestimo: self.dataEmprestimo()
      },
        success: function(inserir){ //cria uma funcao inserir
        var secSearch = ko.utils.arrayFirst( //usa o array first
          self.emprestimos(),
          function(secEditingAccount) {
            return secEditingAccount.matriculaAluno() === self.Aluno_idAluno();
          }
        );
        inserir.records.nome = secSearch.CodEmprestimo();

        self.livros.push(new Emprestimos(inserir.records));

        self.Aluno_idAluno('');
        self.idEmprestimo('');
      }
    });
  };
}
self.add = function(){
    $.ajax({
      url: window.global.urlapi + '/v1/Emprestimos',
      type: 'POST',
      data:{
        idEmprestimo: self.idEmprestimo(),
        dataEmprestimo: self.dataEmprestimo()
      },
        success: function(inserir){ //cria uma funcao inserir
        var secSearch = ko.utils.arrayFirst( //usa o array first
          self.emprestimos(),
          function(secEditingAccount) {
            return secEditingAccount.matriculaAluno() === self.Aluno_idAluno();
          }
        );
        inserir.records.nome = secSearch.CodEmprestimo();

        self.livros.push(new Emprestimos(inserir.records));

        self.Aluno_idAluno('');
        self.idEmprestimo('');
      }
    });
  };
}


      }
    });
  };
};

// Activates knockout.js
window.model = new AppViewModel();
ko.applyBindings(window.model);