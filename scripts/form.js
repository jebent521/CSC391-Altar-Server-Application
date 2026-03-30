const lastAppKey = "AltarServerApp/lastApplication";

const messagebox = document.getElementById("buttonMessage");
const form = document.getElementById("application");

/**
 * promise list of profane words read from a JSON file on the internet
 */
const profanity = fetch(
  "https://raw.githubusercontent.com/zautumnz/profane-words/refs/heads/master/words.json",
).then(async function (response) {
  return await response.json();
});

async function checkProfanity(text) {
  const cusses = await profanity;
  let totalCount = 0;
  for (const cuss of cusses) {
    const escaped = cuss.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "gi");
    const matches = text.match(regex);
    if (matches) {
      totalCount += matches.length;
    }
  }

  // NOTE: Some profanity matches multiple words in the list, and are double-
  // counted or more. This isn't an issue, since precisely which message the
  // user gets doesn't really matter.
  if (totalCount === 0) return null;
  if (totalCount <= 3) return "Watch your profanity";
  if (totalCount <= 5) return "You better clean up your language there buster";
  return '<img alt="gif warning you to stop swearing" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2lsY3lqN2hpYjMxMDRjNWdseThmdWtzbDl5Zjk0bnlwcDNzanNwZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4vYksifnc7Sw/giphy.gif">';
}

document
  .getElementById("loadLastBtn")
  .addEventListener("click", () => loadLastForm(true));

function loadLastForm(verbose) {
  const formDataStr = localStorage.getItem(lastAppKey);
  if (formDataStr === null && verbose) {
    messagebox.innerText = "No previous application found!";
    return;
  }

  messagebox.innerText = "";
  const formData = JSON.parse(formDataStr);
  form.reset();
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
}

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

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  messagebox.innerText = "";

  const formData = new FormData(form);

  // Serialize and store to localstorage, if anything changed
  // note: this is only safe if the form does not include uploaded files
  let holder = {};
  let wrote = false;
  let profane = false;
  for (const [key, value] of formData.entries()) {
    profane |= (await checkProfanity(value)) !== null;

    if (!isDefault(value, form.elements[key])) {
      holder[key] = value;
      wrote = true;
    }
  }

  if (profane) {
    messagebox.innerText = "Cannot submit profane form!";
    return;
  }

  if (wrote) localStorage.setItem(lastAppKey, JSON.stringify(holder));
  else messagebox.innerText = "Cannot submit blank form!";
});

document.querySelectorAll(".form-control").forEach((textbox) => {
  textbox.addEventListener("input", async function (event) {
    const message = await checkProfanity(event.target.value);
    const sibling = textbox.nextElementSibling;
    if (sibling && sibling.classList.contains("profanity-warning")) {
      sibling.innerHTML = message;
    } else {
      const feedback = document.createElement("div");
      feedback.className = "text-warning profanity-warning";
      feedback.innerHTML = message;
      textbox.after(feedback);
    }
  });
});

// The following runs immediately, not as a callback
loadLastForm(false);
