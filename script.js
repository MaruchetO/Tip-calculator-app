const bill = document.querySelector(".bill-input");
const tip = document.querySelectorAll(".tip");
const custom = document.querySelector(".custom");
const selected = document.querySelector(".selected");
const people = document.querySelector(".people-input");
const error = document.querySelector(".error");
const tipAmount = document.querySelector(".tip-number");
const total = document.querySelector(".total-number");
const resetBtn = document.querySelector(".reset");
// toFixed but flooring - https://quickref.me/truncate-a-number-to-a-given-number-of-decimal-places-without-rounding.html
const toFixed = (n, fixed) =>
  `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];

// demoValue();
defaultValue();

function demoValue() {
  bill.value = 142.55;
  // tip.value = 15;
  people.value = 5;
  calculation();
  defaultClick();
}

function defaultValue() {
  bill.value = "";
  people.value = "";
  // defaultClick();
}

function defaultClick() {
  document.querySelector("#btn3").click();
}

bill.addEventListener("input", (e) => {
  const v = e.target.value;
  if (!v) {
    disableButton();
  } else {
    enableButton();
  }
  calculation();
});

function selectedButton(selector) {
  const button = document.querySelector(selector);
  if (!button.classList.contains("selected")) {
    turnOffPreviousButton();
    button.classList.add("selected");
  }
}

function turnOffPreviousButton() {
  const previousButton = document.querySelector(".selected");
  if (previousButton) {
    previousButton.classList.remove("selected");
  }
}

tip.forEach((element) => {
  element.addEventListener("click", () => {
    calculation(element.value);
  });
  custom.addEventListener("input", () => {
    calculation(custom.value);
  });
});

people.addEventListener("input", (e) => {
  const peopleValue = people.value;
  const v = e.target.value;
  if (!v) {
    disableButton();
  } else {
    enableButton();
  }
  if (peopleValue === "0" || peopleValue === 0) {
    error.style.opacity = "1";
    calculation();
  } else {
    error.style.opacity = "0";
    calculation();
  }
});

function calculation(tipValue) {
  const billValue = bill.value;
  const peopleValue = people.value;
  const cal = (billValue * (tipValue / 100)) / peopleValue;
  const calFixed = toFixed(cal, 2);
  if (billValue === "0" || billValue === 0 || billValue === "") {
    tipAmount.innerText = "$0.00";
    total.innerText = "$0.00";
  }
  if (peopleValue === "0" || peopleValue === 0 || peopleValue === "") {
    tipAmount.innerText = "$0.00";
    total.innerText = "$0.00";
  } else {
    error.style.opacity = "0";
    tipAmount.innerText = `$${calFixed}`; //floor
    // tipAmount.innerText = `$${cal.toFixed(2)}`; //round
    total.innerText = `$${(
      (Number(billValue) + billValue * (tipValue / 100)) /
      peopleValue
    ).toFixed(2)}`;
  }
}

resetBtn.addEventListener("click", () => {
  // localStorage.clear();
  // location.reload();
  // action = "/index.html";
  reset();
});

function reset() {
  tipAmount.innerText = "$0.00";
  total.innerText = "$0.00";
  defaultValue();
  disableButton();
  turnOffPreviousButton();
}

function disableButton() {
  const button = document.querySelector(".reset");
  button.classList.add("disabled");
  button.disabled = true;
}

function enableButton() {
  const button = document.querySelector(".reset");
  button.classList.remove("disabled");
  button.disabled = false;
}
