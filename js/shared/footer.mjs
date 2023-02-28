const footer = document.querySelector(".footer");
fetch("/html/shared/footer.html")
  .then((res) => res.text())
  .then((data) => {
    footer.innerHTML = data;
  });
