const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const modal = document.querySelector(".modal-component");

if (header) {
  fetch("/html/shared/header.html")
    .then((res) => res.text())
    .then((data) => {
      header.innerHTML = data;
    });
}

if (footer) {
  fetch("/html/shared/footer.html")
    .then((res) => res.text())
    .then((data) => {
      footer.innerHTML = data;
    });
}

if (modal) {
  fetch("/html/shared/modal.html")
    .then((res) => res.text())
    .then((data) => {
      modal.innerHTML = data;
    });
}
