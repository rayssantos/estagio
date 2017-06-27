 function Emprestimos(objEmprestimo) {
   var self = this;

  //self.idEmprestimo = ko.observable(objEmprestimo.idEmprestimo);
  self.Aluno_idAluno = ko.observable(self.Aluno_idAluno); //
  self.matriculaAluno = ko.observable(objEmprestimo.matriculaAluno),
  self.dataEmprestimo = ko.observable(objEmprestimo.dataEmprestimo);
  self.Livro_idLivro = ko.observable(objEmprestimo.Livro_idLivro);
  self.nomedofuncionario = ko.observable(objEmprestimo.nomedofuncionario);
  self.editing = ko.observable();
  self.idLivros = ko.observable(objEmprestimo.idLivros),
  self.nome = ko.observable(objEmprestimo.nome),
  self.Nome = ko.observable(objEmprestimo.nome)
  self.nomeMatricula = ko.observable(objEmprestimo.matriculaAluno);
  self.nomeCodigo = ko.observable(objEmprestimo.nomeCodigo);

  self.editing.subscribe(function(editing){
    if (editing === false){
      $.ajax({
        type: 'PUT',
        url: window.global.urlapi + '/v1/emprestimos/' + self.idEmprestimo(), // ele pega o id pela rota, por isso nao preciso declarar ali em baixo
        data:{
          Aluno_idAluno: self.Aluno_idAluno(),
          Livro_idLivro: self.Livro_idLivro(),
          dataEmprestimo: self.dataEmprestimo(),
          nomedofuncionario: self.nomedofuncionario()
        },
        success: function(result){

        }
      });
    }
  });
}

function Matricula(objMatricula){
  var self = this;
  self.matriculaAluno = ko.observable(objMatricula.matriculaAluno);
  self.nomeMatricula = ko.observable(objMatricula.matriculaAluno);

}

function Codigo(objCodigo){
  var self = this;
  self.idLivros = ko.observable(objCodigo.idLivros);
  self.nomeCodigo = ko.observable(objCodigo.idLivros);

}
function AppViewModel() {
  var self = this;
  console.log(self.nomeMatricula);
  self.idEmprestimo = ko.observable();
  self.Aluno_idAluno = ko.observable();
  self.matriculaAluno = ko.observable();
  self.Livro_idLivro = ko.observable();
  self.idLivros = ko.observable();
  self.dataEmprestimo = ko.observable();
  self.nomedofuncionario = ko.observable();
  self.nomeMatricula = ko.observable();
  self.nomeCodigo = ko.observable();
  self.matriculas = ko.observableArray();
  self.codigos = ko.observableArray();
  self.emprestimos = ko.observableArray();
  self.editing = ko.observable();
  //self.id_funcionario = ko.observable();


  self.excluir = function(person){
    $.ajax({
      type: 'DELETE',
      url: window.global.urlapi + '/v1/emprestimos/' + person.idEmprestimo(),
      success: function(result){
        if(!!result.records.success){
          return self.emprestimos.remove(person);
        }
      }
    })
  };

  self.editar = function(emprestimos){
    emprestimos.editing(!emprestimos.editing());
  };

  self.editRow = function(emprestimos){
    if(!emprestimos.editing()){
      emprestimos.editing(true);
    }
  };

  self.setData = function(data){
    data.forEach(function(value){
      self.emprestimos.push(new Emprestimos(value));
    });
  };

  $.ajax({
    url: window.global.urlapi + '/v1/emprestimos',
    type: 'GET',
    success: function(result){
      self.setData(result.records);
    }
  });

  self.setMatricula = function(data){
    data.forEach(function(value){
      self.matriculas.push(new Matricula(value));
    });
  };

   $.ajax({
    url: window.global.urlapi + '/v1/alunos',
    type: 'GET',
    success: function(result){
      self.setMatricula(result.records)
    }
  });
  self.setCodigo = function(data){
    data.forEach(function(value){
      self.codigos.push(new Codigo(value));
    });
  };
   $.ajax({
    url: window.global.urlapi + '/v1/livros',
    type: 'GET',
    success: function(result){
      self.setCodigo(result.records)
    }
  });

  self.add = function(){
    $.ajax({
      url: window.global.urlapi + '/v1/emprestimos',
      type: 'POST',
      data:{
        dataEmprestimo: self.dataEmprestimo(),
        matriculaAluno: self.nomeMatricula(),
        idLivros: self.idLivros(),
        Aluno_idAluno: self.Aluno_idAluno(),
        Livro_idLivro: self.Livro_idLivro(),
        nomedofuncionario: self. nomedofuncionario(),
        nomeCodigo: self.nomeCodigo(),
        nomeMatricula: self.matriculaAluno(),



         },

        success: function(inserir){
         // console.log(inserir);
        var secSearch = ko.utils.arrayFirst(
          self.emprestimos(),
          function(secEditingAccount) {
            return secEditingAccount.matriculaAluno() === self.Aluno_idAluno();
          }
        );
        inserir.records.matriculaAluno = secSearch.matriculaAluno();
        inserir.records.idLivros = secSearch.nomeCodigo();

        self.emprestimos.push(new Emprestimos(inserir.records));
        //self.codigos.push(new Codigos(inserir.records));
        //self.matriculas.push(new Matriculas(inserir.records));

         self.nomeMatricula('');
         //self.nomeCodigo('');
      }
    });
  };
}


// Activates knockout.js
window.model = new AppViewModel();
ko.applyBindings(window.model);

