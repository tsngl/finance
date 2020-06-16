//user interface Controller Modul  / Дэлгэцийн контроллер
var uiController = (function() {})();

//Finance Controller Modul / Санхүүгийн контроллер
var financeController = (function() {})();

// Connection Controller Modul / Програмын холбогч контроллер
var appController = (function(uiCntrllr, fnCntrllr) {
  var cntrlAddItem = function() {
    // Оруулсан өгөгдлийг дэлгэцнээс олж авна
    console.log("Оруулсан өгөгдлийг олж  авлаа");
    // Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
    // Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
    // Төсвийг тооцоолно
    // Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана
  };
  document.querySelector(".add__btn").addEventListener("click", function() {
    cntrlAddItem();
  });
  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      cntrlAddItem();
    }
  });
})(uiController, financeController);
