const header = document.querySelector(".header");
fetch("/html/shared/header.html")
  .then((res) => res.text())
  .then((data) => {
    header.innerHTML = data;
  });
