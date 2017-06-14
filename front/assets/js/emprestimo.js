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
    console.log(editing);
    if (editing === false){
      $.ajax({
        type: 'PUT',
        url: window.global.urlapi + '/v1/emprestimos/' + self.idEmprestimo(), // ele pega o id pela rota, por isso nao preciso declarar ali em baixo
        data:{
          Aluno_idAluno: self.(),
          Livro_idLivro: self.
          id_funcionario:self.id_funcionario(),
          dataEmprestimo: self.dataEmprestimo(),
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
  self.Emprestimos = ko.observableArray();
  self.idEmprestimo = ko.observable();
  self.dataEmprestimo = ko.observable();
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
    url: window.global.urlapi + '/v1/Emprestimos',
    type: 'GET',
    success: function(result){
      self.setData(result.records);
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
          self.autores(),
          function(secEditingAccount) {
            return secEditingAccount.matriculaAluno() === self.Aluno_idAluno();
          }
        );
        inserir.records.nome = secSearch.nomeAutor();

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