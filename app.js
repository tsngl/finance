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
var financeController = (function() {})();

// Connection Controller Modul / Програмын холбогч контроллер
var appController = (function(uiCntrllr, fnCntrllr) {
  var cntrlAddItem = function() {
    // Оруулсан өгөгдлийг дэлгэцнээс олж авна
    console.log(uiCntrllr.getInput());
    // Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
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
