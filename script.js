console.log("I work!")

const form = document.querySelector(".formDate");
const formButton = document.querySelector(".formButton");

const formData = [];

formButton.addEventListener("click", (e) => {
  e.preventDefault();
  for (const input of form.elements) {
    if (input.type === "number") {
      formData.push(input.value);
    }
  }
})
