//user interface Controller Modul  / Дэлгэцийн контроллер
var uiController = (function() {
  var DOMstrings = {
    InputType: ".add__type",
    InputDescription: ".add__description",
    InputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.InputType).value,
        description: document.querySelector(DOMstrings.InputDescription).value,
        value: document.querySelector(DOMstrings.InputValue).value,
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    },
  };
})();

//Finance Controller Modul / Санхүүгийн контроллер
var financeController = (function() {
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItems: function(type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);
    },
    seeData: function() {
      return data;
    },
  };
})();

// Connection Controller Modul / Програмын холбогч контроллер
var appController = (function(uiCntrllr, fnCntrllr) {
  var cntrlAddItem = function() {
    // Оруулсан өгөгдлийг дэлгэцнээс олж авна
    var input = uiCntrllr.getInput();
    // Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
    fnCntrllr.addItems(input.type, input.description, input.value);
    // Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
    // Төсвийг тооцоолно
    // Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана
  };
  var setupEventListener = function() {
    var DOM = uiCntrllr.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function() {
      cntrlAddItem();
    });
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        cntrlAddItem();
      }
    });
  };
  return {
    init: function() {
      console.log("Application started ...");
      setupEventListener();
    },
  };
})(uiController, financeController);

appController.init();
