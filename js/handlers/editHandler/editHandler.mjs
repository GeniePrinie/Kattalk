import { getEntry, updateEntry } from "../../controllers/entryController.mjs";
import { renderEditEntry } from "./renderEditEntry.mjs";
import { redirectToHome } from "../../shared/redirect.mjs";
import { createModal } from "../../shared/modal.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export async function displayEditEntry() {
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

export function setEditFormListener() {
  const formEditEntry = document.querySelector(".form-edit-entry");

  if (formEditEntry) {
    formEditEntry.addEventListener("submit", (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const entryData = Object.fromEntries(formData.entries());
      const entryDataFixed = restructureUserInput(entryData);

      updateEntry(id, entryDataFixed)
        .then((entry) => {
          handleSuccessful(entry);
        })
        .catch((error) => {
          handleUnsuccessful(error);
        });
    });
  }
}

function restructureUserInput(entry) {
  const body = entry.body.replace(/^\s+|\s+$/g, "");
  const media = entry.media.replace(/^\s+|\s+$/g, "");
  const tags = entry.tags.replace(/^\s+|\s+$/g, "");

  if (body == "") {
    delete entry.body;
  }

  if (media == "") {
    delete entry.media;
  }

  if (tags == "") {
    delete entry.tags;
  } else {
    entry.tags = tags.toString().replace(/ /g, "").split(",");
  }

  return entry;
}

function handleSuccessful(entry) {
  createModal(`Entry named: <b>${entry.title}</b> successfully updated.`);
  const clearForm = document.querySelector(".modal-close-entry");
  clearForm.addEventListener("click", redirectToHome);
}

function handleUnsuccessful(error) {
  createModal(
    `<b>Entry not updated.</b> <br>Error message: <em>${error.message}</em>.`
  );
}
