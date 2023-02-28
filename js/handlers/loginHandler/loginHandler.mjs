import { createModal } from "../../shared/modal.mjs";
import { login } from "../../controllers/userController.mjs";
import { load } from "../../shared/storage.mjs";
import { redirectToHome } from "../../shared/redirect.mjs";

const formLogin = document.querySelector(".form-login");

export function checkIfLoggedOut() {
  const token = load("token");

  if (token !== null) {
    redirectToHome();
  }
}

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
