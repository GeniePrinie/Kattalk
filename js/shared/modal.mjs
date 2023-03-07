/**
 * Creates a model in html code
 * @param {string} message Modal message
 */
export function createModal(message) {
  const feedbackModalBody = document.querySelector(".modal-body");
  feedbackModalBody.innerHTML = `<div class="modal-body">${message}</div>`;
}
