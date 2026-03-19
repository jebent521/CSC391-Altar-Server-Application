const secretKey =
  'Dr. Fernanda "Surely did not see that" Psihas\' Secrets (All of them) (Do not leak!)';
const submitButton = document.getElementById("SUBMIT");
submitButton.addEventListener("click", (event) => {
  // DO SOMETHING
  let secrets = localStorage.getItem(secretKey);
  if (secrets === null || secrets === undefined) {
    localStorage.setItem(
      secretKey,
      JSON.stringify([
        "Imagine you were sitting there *points at REDACTED* - 2:45pm 10/02/2025",
      ]),
    );
  }
  secrets = JSON.parse(localStorage.getItem(secretKey));

  const main = document.getElementById("main");
  const secretHTML =
    " <h1>TOP SECRET!!!!!</h1>\n" +
    "<p id='secretName'></p>\n" +
    "<ul id='secretList'>\n" +
    "</ul>";
  main.innerHTML = secretHTML + main.innerHTML;
  const name = document.getElementById("secretName");
  name.textContent = secretKey;
  const list = document.getElementById("secretList");
  for (const secret of secrets) {
    const li = document.createElement("li");
    li.textContent = secret;
    list.appendChild(li);
  }

  event.submitter;
});
