import { redirectToHome } from "../../shared/redirect.mjs";
import { createModal } from "../../shared/modal.mjs";
import { login } from "../../controllers/userController.mjs";
import { load } from "../../shared/storage.mjs";

/**
 * Redirect to home if bearer token already exists
 */
export function checkIfLoggedOut() {
  const token = load("token");

  if (token !== null) {
    redirectToHome();
  }
}

/**
 * Log user into application based of user input
 */
export function setLoginFormListener() {
  const formLogin = document.querySelector(".form-login");

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
          createModal(`Successful login.`);
          redirectToHome();
        })
        .catch((error) => {
          createModal(
            `Invalid user credentials. <br>Error message: <em>${error.message}</em>.`
          );
        });
    });
  }
}
