const secretKey =
  'Dr. Fernanda "Surely did not see that" Psihas\' Secrets (All of them) (Do not leak!)';

addEventListener("submit", (event) => {
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
});
