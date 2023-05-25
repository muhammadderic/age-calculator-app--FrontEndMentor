const form = document.querySelector(".formDate");
const formButton = document.querySelector(".formButton");

const ageYearNum = document.querySelector(".ageYearNum");
const ageMonthNum = document.querySelector(".ageMonthNum");
const ageDayNum = document.querySelector(".ageDayNum");

const inputDayLabel = document.querySelector(".inputDayLabel");
const inputMonthLabel = document.querySelector(".inputMonthLabel");
const inputYearLabel = document.querySelector(".inputYearLabel");
const inputDayNum = document.querySelector(".inputDayNum");
const inputMonthNum = document.querySelector(".inputMonthNum");
const inputYearNum = document.querySelector(".inputYearNum");
const errorInputDayText = document.querySelector(".inputDayNum ~ .errorInputText")
const errorInputMonthText = document.querySelector(".inputMonthNum ~ .errorInputText")
const errorInputYearText = document.querySelector(".inputYearNum ~ .errorInputText")

const formData = [];

const currentDate = new Date().toLocaleDateString()
const currentDateSplit = currentDate.split("/");
for (i = 0; i < currentDateSplit.length; i++) {
  currentDateSplit[i] = Number(currentDateSplit[i]);
}

formButton.addEventListener("click", (e) => {
  e.preventDefault();
  errorInputDayText.classList.add("errorNone");
  errorInputMonthText.classList.add("errorNone");
  errorInputYearText.classList.add("errorNone");
  inputDayLabel.classList.remove("errorInputLabel");
  inputMonthLabel.classList.remove("errorInputLabel");
  inputYearLabel.classList.remove("errorInputLabel");
  inputDayNum.classList.remove("errorInput");
  inputMonthNum.classList.remove("errorInput");
  inputYearNum.classList.remove("errorInput");

  for (const input of form.elements) {
    if (input.type === "number") {
      formData.push(Number(input.value));
    }
  }
  if (formData[2] >= currentDateSplit[2] && formData[1] >= currentDateSplit[0] && formData[0] > currentDateSplit[1]) {
    errorInputDayText.classList.remove("errorNone");
    inputDayLabel.classList.add("errorInputLabel");
    inputDayNum.classList.add("errorInput");
    errorInputMonthText.classList.remove("errorNone");
    inputMonthLabel.classList.add("errorInputLabel");
    inputMonthNum.classList.add("errorInput");
    errorInputYearText.classList.remove("errorNone");
    inputYearLabel.classList.add("errorInputLabel");
    inputYearNum.classList.add("errorInput");
  } else if (formData[2] >= currentDateSplit[2] && formData[1] > currentDateSplit[0]) {
    errorInputMonthText.classList.remove("errorNone");
    inputMonthLabel.classList.add("errorInputLabel");
    inputMonthNum.classList.add("errorInput");
    errorInputYearText.classList.remove("errorNone");
    inputYearLabel.classList.add("errorInputLabel");
    inputYearNum.classList.add("errorInput");
  } else if (formData[2] > currentDateSplit[2]) {
    errorInputYearText.classList.remove("errorNone");
    inputYearLabel.classList.add("errorInputLabel");
    inputYearNum.classList.add("errorInput");
  }
  if (formData[2] % 4 === 0 || formData[2] % 100 === 0) {
    if (formData[1] === 2) {
      if (formData[0] < 1 || formData[0] > 29) {
        errorInputDayText.classList.remove("errorNone");
        inputDayLabel.classList.add("errorInputLabel");
        inputDayNum.classList.add("errorInput");
      }
    } else if (formData[1] % 2 === 0) {
      if (formData[0] < 1 || formData[0] > 30) {
        errorInputDayText.classList.remove("errorNone");
        inputDayLabel.classList.add("errorInputLabel");
        inputDayNum.classList.add("errorInput");
      }
    } else {
      if (formData[0] < 1 || formData[0] > 31) {
        errorInputDayText.classList.remove("errorNone");
        inputDayLabel.classList.add("errorInputLabel");
        inputDayNum.classList.add("errorInput");
      }
    }
  } else {
    if (formData[1] === 2) {
      if (formData[0] < 1 || formData[0] > 28) {
        errorInputDayText.classList.remove("errorNone");
        inputDayLabel.classList.add("errorInputLabel");
        inputDayNum.classList.add("errorInput");
      }
    } else if (formData[1] % 2 === 0) {
      if (formData[0] < 1 || formData[0] > 30) {
        errorInputDayText.classList.remove("errorNone");
        inputDayLabel.classList.add("errorInputLabel");
        inputDayNum.classList.add("errorInput");
      }
    } else {
      if (formData[0] < 1 || formData[0] > 31) {
        errorInputDayText.classList.remove("errorNone");
        inputDayLabel.classList.add("errorInputLabel");
        inputDayNum.classList.add("errorInput");
      }
    }
  }
  if (formData[1] < 1 || formData[1] > 12) {
    errorInputMonthText.classList.remove("errorNone");
    inputMonthLabel.classList.add("errorInputLabel");
    inputMonthNum.classList.add("errorInput");
  }
  if (formData[2] < 1 || formData[2] > currentDateSplit[2]) {
    errorInputYearText.classList.remove("errorNone");
    inputYearLabel.classList.add("errorInputLabel");
    inputYearNum.classList.add("errorInput");
  }
  const calculatedAge = calculateAge(formData[0], formData[1], formData[2]);
  ageYearNum.innerHTML = calculatedAge.yourYear;
  ageMonthNum.innerHTML = calculatedAge.yourMonth;
  ageDayNum.innerHTML = calculatedAge.yourDate;
  formData.length = 0;
})

function calculateAge(date, month, year) {
  yourYear = currentDateSplit[2] - year;
  yourMonth = currentDateSplit[0] - month;
  yourDate = currentDateSplit[1] - date;
  if (currentDateSplit[0] < month) {
    value = month - currentDateSplit[0];
    yourMonth = 12 - value;
    --yourYear;
  }
  if (currentDateSplit[1] < date) {
    value = date - currentDateSplit[1];
    if (month === 2) {
      if (year % 4 === 0 || year % 100 === 0) {
        yourDate = 29 - value;
      } else {
        yourDate = 28 - value;
      }
    } else if (month % 2 === 0) {
      yourDate = 30 - value;
    } else {
      yourDate = 31 - value;
      if (month === currentDateSplit[0]) {
        yourMonth = 12;
      }
    }
    --yourYear;
  }
  return { yourDate, yourMonth, yourYear };
}