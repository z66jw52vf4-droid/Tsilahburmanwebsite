document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.querySelector(".form-note");
      var btn = form.querySelector("button[type=submit]");
      if (btn) btn.disabled = true;
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function (response) {
        if (response.ok) {
          if (note) {
            note.textContent = "Thank you — your message has been received. I'll be in touch soon.";
            note.style.display = "block";
            note.style.color = "var(--terracotta)";
          }
          form.reset();
        } else {
          if (note) {
            note.textContent = "Something went wrong. Please email tsilah.burman@gmail.com directly.";
            note.style.display = "block";
            note.style.color = "#c00";
          }
          if (btn) btn.disabled = false;
        }
      }).catch(function () {
        if (note) {
          note.textContent = "Something went wrong. Please email tsilah.burman@gmail.com directly.";
          note.style.display = "block";
          note.style.color = "#c00";
        }
        if (btn) btn.disabled = false;
      });
    });
  }
});
