import { createModal } from "../globals/modal.mjs";
import { login } from "../controllers/userController.mjs";
import { redirectToHome } from "../globals/redirect.mjs";

const formLogin = document.querySelector(".form-login");

export function setLoginFormListener() {
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      formLogin.checkValidity();
      formLogin.classList.add("was-validated");

      const form = e.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      login(profile)
        .then(() => {
          handleSuccessful();
        })
        .catch((error) => {
          handleUnsuccessful(error);
        });
    });
  }
}

function handleSuccessful() {
  createModal(`Successful login.`);
  redirectToHome();
}

function handleUnsuccessful(error) {
  createModal(
    `Invalid user credentials. <br>Error message: <em>${error.message}</em>.`
  );
}
