function checkAccess() {
  const code = prompt("Enter images' password:");

  if (!code) {
    return;
  }
  
  fetch(`./gallery/private/${code}.html`)
    .then(response => {
      console.log("Status:", response.status);
      if (response.status === 200) {
        window.location.href = `./gallery/private/${code}.html`;
      } else {
        console.log("Redirecting to error.html");
        window.location.href = `./gallery/private/error.html`;
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
      window.location.href = `./gallery/private/error.html`;
    });
}

function unlockJournal() {
  const input = document.getElementById("passwordInput")?.value;
  const message = document.getElementById("unlockMessage");
  const journalSection = document.getElementById("journalEntry");

  if (!input || !journalSection) return;

  const correctPassword = "lunar_beans";

  if (input !== correctPassword) {
    message.textContent = "Nope. Try again.";
    input.setAttribute("aria-invalid", "true");
    return;
  }

  journalSection.classList.remove("locked");
  message.textContent = "Unlocked.";
  
  renderJournal();
}

function renderJournal() {
  const el = document.getElementById("journal");
  const journalSection = document.getElementById("journalEntry");

  if (!el || !journalSection) return;

  const journal = [
    "Had a long conversation with Alex last night about where we're headed. Feels good finally. So different from how things ended with Morgan.",
    "I've been reorganising everything. Alex has her own folder now. I keep telling myself I have to clean up my archive and move on..",
    "Sometimes late at night I look back at those photos. The ones she sent me. The ones I took of her. Things we did that I'll probably never do again with anyone else. At least not like that.",
    "It ended messy. Unfinished. I'm not ready to delete it yet."
  ];

  el.innerHTML = journal.map(p => `<p>${p}</p>`).join("");
}

window.unlockJournal = unlockJournal;

// TODO: clean up old archive references
// paths: alex-2024/, morgan-2024/
