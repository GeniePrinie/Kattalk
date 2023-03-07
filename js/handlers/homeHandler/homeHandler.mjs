import { getEntries, createEntry } from "../../controllers/entryController.mjs";
import { renderPosts } from "./renderPosts.mjs";
import { searchPosts } from "./searchPosts.mjs";
import { filterPosts } from "./filterPosts.mjs";
import { renderCreateEntry } from "./renderCreateEntry.mjs";
import { load } from "../../shared/storage.mjs";
import { redirectToHome, redirectToLogin } from "../../shared/redirect.mjs";
import { createModal } from "../../shared/modal.mjs";

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
 * Displays the post entry functionality
 */
export function displayPostEntry() {
  renderCreateEntry();
}

/**
 * Displays the post entries functionality
 */
export function displayEntries() {
  getEntries()
    .then((entries) => {
      renderPosts(entries);
      searchPosts(entries);
      filterPosts(entries);
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Displays the post entries functionality
 */
export function setCreateFormListener() {
  const formCreatePost = document.querySelector(".form-create-post");

  if (formCreatePost) {
    formCreatePost.addEventListener("submit", (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const postData = Object.fromEntries(formData.entries());
      const post = restructureUserInput(postData);

      createEntry(post)
        .then((post) => {
          handleSuccessful(post);
        })
        .catch((error) => {
          handleUnsuccessful(error);
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
  const body = entry.body;
  const media = entry.media;
  const tags = entry.tags;

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

function handleSuccessful(post) {
  createModal(`Post named: <b>${post.title}</b> successfully created.`);
  const clearForm = document.querySelector(".modal-close-post");
  clearForm.addEventListener("click", redirectToHome);
}

function handleUnsuccessful(error) {
  createModal(
    `<b>Post not created.</b> <br>Error message: <em>${error.message}</em>.`
  );
}
