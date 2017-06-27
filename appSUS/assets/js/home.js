// Classe pessoa

function Person(name) {
    var self = this;
    self.name = name;
}
//  funcao para a lista de pessoas
function AppViewModel() {
    var self = this;// o self é ultilizado quando quero referenciar o this, com isso posso usar o self para atribuir o this em qualquer lugar do codigo
    self.people = ko.observableArray([]);//é a lista de pessoas, por isso um array
    self.personName = ko.observable("");//personName recebe o nome que o usuario vai digitar por isso, o parametro passa vazio("")

    self.addPerson = function () {
        self.people.push(new Person(self.personName()));

    };

    self.enter= function(model, event){
        if (event.keyCode === 13){

            self.addPerson();
            self.personName("");

        }


    }

     $.ajax({
    url:  window.global.urlapi +'/81/v1/users',
    type: 'GET',
    success: function(result){
      console.log(result);
    }
  });
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());




