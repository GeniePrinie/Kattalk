import { getEntry, updateEntry } from "../../controllers/entryController.mjs";
import { renderEditEntry } from "./renderEditEntry.mjs";
import { redirectToHome } from "../../shared/redirect.mjs";
import { createModal } from "../../shared/modal.mjs";

/**
 * Displays edit entry based of URL parameter (id) on current page
 */
export async function displayEditEntry() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  await getEntry(id)
    .then((entry) => {
      const entryData = {
        title: entry.title,
        body: entry.body,
        tags: entry.tags,
        media: entry.media,
        author: entry.author,
      };
      renderEditEntry(entryData);
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Edits entry based of URL parameter (id) on current page when triggered by user
 */
export function setEditFormListener() {
  const formEditEntry = document.querySelector(".form-edit-entry");
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  if (formEditEntry) {
    formEditEntry.addEventListener("submit", (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const entryData = Object.fromEntries(formData.entries());
      const entryDataFixed = restructureUserInput(entryData);

      updateEntry(id, entryDataFixed)
        .then((entry) => {
          createModal(
            `Entry named: <b>${entry.title}</b> successfully updated.`
          );
          const clearForm = document.querySelector(".modal-close-entry");
          clearForm.addEventListener("click", redirectToHome);
        })
        .catch((error) => {
          createModal(
            `<b>Entry not updated.</b> <br>Error message: <em>${error.message}</em>.`
          );
        });
    });
  }
}

/**
 * Removes parameters from entry if user did not fill them out
 * @param {object} entry Input data from user to edit entry
 * @returns {object} Validated user input
 */
function restructureUserInput(entry) {
  const { tags } = entry;

  if (tags.replace(/^\s+|\s+$/g, "") == "") {
    entry.tags = [];
  } else {
    entry.tags = tags.toString().replace(/ /g, "").split(",");
  }

  return entry;
}
