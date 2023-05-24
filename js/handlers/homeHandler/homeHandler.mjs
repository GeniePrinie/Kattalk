import { getEntries, createEntry } from "../../controllers/entryController.mjs";
import { renderEntries } from "./renderEntries.mjs";
import { searchEntries } from "./searchEntries.mjs";
import { filterEntries } from "./filterEntries.mjs";
import { renderCreateEntry } from "./renderCreateEntry.mjs";
import { redirectToHome, redirectToLogin } from "../../shared/redirect.mjs";
import { createModal } from "../../shared/modal.mjs";
import { load } from "../../shared/storage.mjs";

/**
 * Checks if user is already logged in
 */
export function checkIfLoggedIn() {
  const token = load("token");

  if (token === null) {
    redirectToLogin();
  }
}

/**
 * Displays post entry
 */
export function displayPostEntry() {
  renderCreateEntry();
}

/**
 * Displays all the entries
 */
export function displayEntries() {
  getEntries()
    .then((entries) => {
      renderEntries(entries);
      searchEntries(entries);
      filterEntries(entries);
    })
    .catch((error) => {
      alert(error);
      redirectToHome();
    });
}

/**
 * Create entry based of user input
 */
export function setCreateFormListener() {
  const formCreateEntry = document.querySelector(".form-create-entry");

  if (formCreateEntry) {
    formCreateEntry.addEventListener("submit", (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const entryData = Object.fromEntries(formData.entries());
      const entryDataFixed = restructureUserInput(entryData);

      createEntry(entryDataFixed)
        .then((entry) => {
          createModal(
            `Entry named: <b>${entry.title}</b> successfully created.`
          );
          const clearForm = document.querySelector(".modal-close-entry");
          clearForm.addEventListener("click", redirectToHome);
        })
        .catch((error) => {
          createModal(
            `<b>Entry not created.</b> <br>Error message: <em>${error.message}</em>.`
          );
        });
    });
  }
}

/**
 * Validate user input when creating a new entry
 * @param {object} entry Input data from user to create a new entry
 * @returns {object} Validated user input
 */
function restructureUserInput(entry) {
  if (entry.body == "") {
    delete entry.body;
  }

  if (entry.media == "") {
    delete entry.media;
  }

  if (entry.tags == "") {
    delete entry.tags;
  } else {
    entry.tags = entry.tags.toString().replace(/ /g, "").split(",");
  }

  return entry;
}
