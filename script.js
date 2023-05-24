console.log("I work!")

const form = document.querySelector(".formDate");
const formButton = document.querySelector(".formButton");

const formData = [];

const currentDate = new Date().toLocaleDateString()
const currentDateSplit = currentDate.split("/");
for (i = 0; i < currentDateSplit.length; i++) {
  currentDateSplit[i] = Number(currentDateSplit[i]);
}

formButton.addEventListener("click", (e) => {
  e.preventDefault();
  for (const input of form.elements) {
    if (input.type === "number") {
      formData.push(Number(input.value));
    }
  }
  const calculatedAge = calculateAge(formData[0], formData[1], formData[2]);
  formData.length = 0;
  console.log(calculatedAge);
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