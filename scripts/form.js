const secretKey =
  'Dr. Fernanda "Surely did not see that" Psihas\' Secrets (All of them) (Do not leak!)';
const form = document.getElementById("application");
form.addEventListener("submit", (event) => {
  event.preventDefault();

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
  const header = document.createElement("h1");
  header.textContent = "TOP SECRET!!!!!";
  const secretName = document.createElement("p");
  secretName.innerText = secretKey;
  const secretList = document.createElement("ul");
  main.prepend(header, secretName, secretList);

  for (const secret of secrets) {
    const li = document.createElement("li");
    li.textContent = secret;
    secretList.appendChild(li);
  }
});
