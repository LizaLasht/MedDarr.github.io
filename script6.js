var price = 0;
function updatePrice() {
  let s = document.getElementsByName("prodType");
  let select = s[0];
  let temp1 = 0;
  let temp2 = 0;
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
  }

  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = select.value == "2" ? "block" : "none";
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function (radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
        temp1 += optionPrice;
      }
    }
  });

  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = select.value == "3" ? "block" : "none";
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
        temp2 += propPrice;
      }
    }
  });
  if (select.value == "1") {
    price -= temp1 + temp2;
  }
  if (select.value == "2") {
    price -= temp2;
  }
  if (select.value == "3") {
    price -= temp1;
  }
}

var f1 = document.getElementsByName("field4");
var res = document.getElementById("result");
function calc() {
  res.innerHTML = f1[0].value * price;
  return false;
}

function getPrices() {
    return {
        prodTypes:[1000,2000,700],
        prodOptions: {
          r1:1000,
          r2:2000,
          r3:3000,
          r4:500,
          r5:1000
        },
        prodProperties: {
          m1:0,
          m2:600,
          m3: 1000,
          m4:2000,
          m5: 1500,
        }
    };
}

window.addEventListener("DOMContentLoaded", function (event) {
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";

  let s = document.getElementsByName("prodType");
  let select = s[0];
  select.addEventListener("change", function (event) {
    let target = event.target;
    console.log(target.value);
    updatePrice();
  });

  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function (radio) {
    radio.addEventListener("change", function (event) {
      let r = event.target;
      console.log(r.value);
      updatePrice();
    });
  });

  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function (event) {
      let c = event.target;
      console.log(c.name);
      console.log(c.value);
      updatePrice();
    });
  });

  let but = document.getElementById("button");
  but.addEventListener("click", function (event) {
    let f1 = document.getElementsByName("field4");
    if (f1[0].value.match(/^[1-9][0-9]*$/g) == null) {
        res.innerHTML = "Введено неверное количество товара";
    }
    else calc();
    return false;
  });

  updatePrice();
});
