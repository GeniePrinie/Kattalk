import { createModal } from "../globals/modal.mjs";
import { redirectToLogin } from "../globals/redirect.mjs";
import { register } from "../controllers/userController.mjs";

const formNewAccount = document.querySelector(".form-register");

export function setRegisterFormListener() {
  if (formNewAccount) {
    formNewAccount.addEventListener("submit", (e) => {
      e.preventDefault();
      formNewAccount.checkValidity();
      formNewAccount.classList.add("was-validated");

      const form = e.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      register(profile)
        .then((user) => {
          handleSuccessful(user);
        })
        .catch((error) => {
          handleUnsuccessful(error);
        });
    });
  }
}

function handleSuccessful(user) {
  createModal(`User for <b>${user.name}</b> created successfully.`);
  const clearForm = document.querySelector(".modal-close");
  clearForm.addEventListener("click", redirectToLogin);
}

function handleUnsuccessful(error) {
  createModal(
    `User not created. <br>Error message: <em>${error.message}</em>.`
  );
}
