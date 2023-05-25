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
const formDataEmpty = [];

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
  errorInputDayText.innerHTML = "Must be a valid day";
  errorInputMonthText.innerHTML = "Must be a valid day";
  errorInputYearText.innerHTML = "Must be a valid day";
  ageDayNum.innerHTML = "--";
  ageMonthNum.innerHTML = "--";
  ageYearNum.innerHTML = "--";

  let emptyDataInput = true;

  for (const input of form.elements) {
    if (input.type === "number") {
      if (input.value === "") {
        formDataEmpty.push(true);
      } else {
        formDataEmpty.push(false);
      }

      formData.push(Number(input.value));
    }
  }
  if (formDataEmpty[0]) {
    errorInputDayText.innerHTML = "This field is required";
    createErrorDay();
  }
  if (formDataEmpty[1]) {
    errorInputMonthText.innerHTML = "This field is required";
    createErrorMonth();
  }
  if (formDataEmpty[2]) {
    errorInputYearText.innerHTML = "This field is required";
    createErrorYear();
  }

  for (i = 0; i < 3; i++) {
    if (formDataEmpty[i]) {
      emptyDataInput = false;
    }
  }

  let excessDateValue = false;
  let validNumberOfDateValue = false;

  if (emptyDataInput) {
    excessDateValue = excessDate(formData[0], formData[1], formData[2], currentDateSplit[1], currentDateSplit[0], currentDateSplit[2])
    validNumberOfDateValue = validNumberOfDate(formData[0], formData[1], formData[2]);
  }

  if (excessDateValue && validNumberOfDateValue) {
    const calculatedAge = calculateAge(formData[0], formData[1], formData[2]);
    ageYearNum.innerHTML = calculatedAge.yourYear;
    ageMonthNum.innerHTML = calculatedAge.yourMonth;
    ageDayNum.innerHTML = calculatedAge.yourDate;
  }
  formData.length = 0;
  formDataEmpty.length = 0;
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

// Checks whether the date entered does not exceed today's date
function excessDate(date, month, year, currentDate, currentMonth, currentYear) {
  if (year >= currentYear && month >= currentMonth && date > currentDate) {
    createErrorDay()
    createErrorMonth()
    createErrorYear()
    return false;
  } else if (year >= currentYear && month > currentMonth) {
    createErrorMonth()
    createErrorYear()
    return false;
  } else if (year > currentYear) {
    createErrorYear()
    return false;
  }
  return true;
}

function monthWith30Days(date) {
  if (date < 1 || date > 30) {
    createErrorDay()
    return false;
  }
  return true;
}
function monthWith31Days(date) {
  if (date < 1 || date > 31) {
    createErrorDay()
    return false;
  }
  return true;
}

function validNumberOfDateExceptFebruary(date, month) {
  switch (month) {
    // January
    case 1: {
      return monthWith31Days(date);
    }
    // March
    case 3: {
      return monthWith31Days(date);
    }
    // April
    case 4: {
      return monthWith30Days(date);
    }
    // May
    case 5: {
      return monthWith31Days(date);
    }
    // June
    case 6: {
      return monthWith30Days(date);
    }
    // July
    case 7: {
      return monthWith31Days(date);
    }
    // August
    case 8: {
      return monthWith31Days(date);
    }
    // September
    case 9: {
      return monthWith30Days(date);
    }
    // October
    case 10: {
      return monthWith31Days(date);
    }
    // November
    case 11: {
      return monthWith30Days(date);
    }
    // December
    case 12: {
      return monthWith31Days(date);
    }
    default: {
      return false;
    }
  }
}

// Check whether the year entered is a leap year or not
// If it's a leap year, then the date in February will be checked no later than 29 days
function validNumberOfDate(date, month, year) {
  if (year % 4 === 0 || year % 100 === 0) {
    if (month === 2) {
      if (date < 1 || date > 29) {
        createErrorDay()
        return false;
      }
      return true;
    } else {
      return validNumberOfDateExceptFebruary(date, month)
    }
  } else {
    if (month === 2) {
      if (date < 1 || date > 28) {
        createErrorDay()
        return false;
      }
      return true;
    } else {
      return validNumberOfDateExceptFebruary(date, month)
    }
  }
}

function createErrorDay() {
  errorInputDayText.classList.remove("errorNone");
  inputDayLabel.classList.add("errorInputLabel");
  inputDayNum.classList.add("errorInput");
}
function createErrorMonth() {
  errorInputMonthText.classList.remove("errorNone");
  inputMonthLabel.classList.add("errorInputLabel");
  inputMonthNum.classList.add("errorInput");
}
function createErrorYear() {
  errorInputYearText.classList.remove("errorNone");
  inputYearLabel.classList.add("errorInputLabel");
  inputYearNum.classList.add("errorInput");
}