const lastAppKey = "AltarServerApp/lastApplication";

const messagebox = document.getElementById("buttonMessage");
const form = document.getElementById("application");

document.getElementById("loadLastBtn").addEventListener("click", () => {
  const formDataStr = localStorage.getItem(lastAppKey);
  if (formDataStr === null) {
    messagebox.innerText = "No previous application found!";
    return;
  }

  messagebox.innerText = "";
  const formData = JSON.parse(formDataStr);
  form.reset()
  for (const [key, value] of Object.entries(formData)) {
    const input = form.elements[key];
    switch (input.type) {
      case "checkbox":
        input.checked = !!value;
        break;
      default:
        input.value = value;
    }
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  messagebox.innerText = "";
  form.reset();
});

/**
 * @param value The value to be checked.
 * @param element The element the value came from.
 * @return true if the value is the default, false otherwise.
 */
function isDefault(value, element) {
  switch (element.type) {
    case "select-one":
      return value === element[0].value;
    default:
      return value === element.defaultValue;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  messagebox.innerText = "";

  const formData = new FormData(form);

  // Serialize and store to localstorage, if anything changed
  // note: this is only safe if the form does not include uploaded files
  let holder = {};
  let wrote = false;
  for (const [key, value] of formData.entries()) {
    if (!isDefault(value, form.elements[key])) {
      holder[key] = value;
      wrote = true;
    }
  }

  if (wrote) localStorage.setItem(lastAppKey, JSON.stringify(holder));
  else messagebox.innerText = "Cannot submit blank form!";
});
