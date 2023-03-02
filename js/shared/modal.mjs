const modal = document.querySelector(".modal-component");

fetch("/html/shared/modal.html")
  .then((res) => res.text())
  .then((data) => {
    modal.innerHTML = data;
  });

export function createModal(message) {
  const feedbackModalBody = document.querySelector(".modal-body");
  feedbackModalBody.innerHTML = `<div class="modal-body">${message}</div>`;
}
