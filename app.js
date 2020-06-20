//user interface Controller Modul  / Дэлгэцийн контроллер
var uiController = (function() {
  var DOMstrings = {
    InputType: ".add__type",
    InputDescription: ".add__description",
    InputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    IncLabel: ".budget__income--value",
    ExpLabel: ".budget__expenses--value",
    tusuwLabel: ".budget__value",
    percentageLabel: ".budget__expenses--percentage",
    expensePercentage: ".item__percentage",
    containerDiv: ".container",
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.InputType).value,
        description: document.querySelector(DOMstrings.InputDescription).value,
        // parseInt функц нь тэмдэгтийг тооруу хөрвүүлнэ
        value: parseInt(document.querySelector(DOMstrings.InputValue).value),
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    },
    clearFields: function() {
      var fields = document.querySelectorAll(
        DOMstrings.InputDescription + ", " + DOMstrings.InputValue
      );
      // Convert List to Array
      var fieldsArr = Array.prototype.slice.call(fields);

      for (var i = 0; i < fieldsArr.length; i++) {
        fieldsArr[i].value = "";
      }
      fieldsArr[0].focus();
      /* for dawtalttai adil , forEach => Element bureer ni dawtana
      fieldsArr.forEach(function(el, index, array) {
        el.value = "";
      });
      */
    },
    addListItem: function(item, type) {
      // Орлого зарлагын элемэнтийг агуулсан HTML-г бэлтгэнэ
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">+$VALUE$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline">-</i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">-$VALUE$</div><div class="item__percentage">1%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline">-</i></button></div></div></div>';
      }
      // Тэр HTML дотроо орлого зарлагын утгуудыг replace ашиглан өөрчилөх
      html = html.replace("%id%", item.id);
      html = html.replace("%DESCRIPTION%", item.description);
      html = html.replace("$VALUE$", item.value);
      //html = html.replace("##PERCENTAGE##", percentage);
      // Бэлтгэсэн HTML  ээ ДОМ-руу хийж өгнө
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
    ViewFinance: function(tusuv) {
      document.querySelector(DOMstrings.IncLabel).textContent =
        "+" + tusuv.totalInc;
      document.querySelector(DOMstrings.ExpLabel).textContent =
        "-" + tusuv.totalExp;
      document.querySelector(DOMstrings.tusuwLabel).textContent =
        "+" + tusuv.tusuw;
      if (tusuv.percentage !== 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          tusuv.percentage;
      }
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
    tusuw: 0,
    percentage: 0,
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.items[type].forEach(function(el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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
        ///  percent = (data.items.exp.value * 100) / data.totals.inc;
      }

      data.items[type].push(item);
      return item;
    },
    deleteItem: function(type, id) {
      var ids = data.items[type].map(function(el) {
        return el.id;
      });
      var index = ids.indexOf(id);
      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
    },
    tusuwTootsooloh: function() {
      // Нийт орлогын нийлбэрйиг тооцоолно
      calculateTotal("inc");
      //Нийт зарлагын нийлбэрийг тооцоолно
      calculateTotal("exp");
      // Өрхийн төсвийг шинээр тооцоолно
      data.tusuw = data.totals.inc - data.totals.exp;
      // Зарлагын хувийг тооцоолно
      data.percentage = Math.round((data.totals.exp * 100) / data.totals.inc);
    },
    tusuwAwah: function() {
      return {
        tusuw: data.tusuw,
        percentage: data.percentage,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
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
    if (input.description !== "" && input.value !== "") {
      // Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
      item = fnCntrllr.addItems(input.type, input.description, input.value);
      // Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана
      uiCntrllr.addListItem(item, input.type);
      uiCntrllr.clearFields();
      // Төсвийг тооцоолно
      fnCntrllr.tusuwTootsooloh();
      // Эцсийн үлдэгдэлийг тооцоолно
      var tusuw = fnCntrllr.tusuwAwah();
      //Төсвийн тооцоог дэлгэцэнд гаргана
      uiCntrllr.ViewFinance(tusuw);
    }
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
    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function(event) {
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);

          //Санхүүгийн модулиас type, id ашиглан устгана
          fnCntrllr.deleteItem(type, itemId);
          //
        }
      });
  };
  return {
    init: function() {
      console.log("Application started ...");
      uiCntrllr.ViewFinance({
        tusuw: 0,
        percentage: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListener();
    },
  };
})(uiController, financeController);

appController.init();
