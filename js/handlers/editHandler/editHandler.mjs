import { getEntry, updateEntry } from "../../controllers/entryController.mjs";
import { renderEditPost } from "./renderEditPost.mjs";
import { redirectToHome } from "../../shared/redirect.mjs";
import { createModal } from "../../shared/modal.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export async function displayEditEntry() {
  await getEntry(id)
    .then((entry) => {
      const postData = {
        title: entry.title,
        body: entry.body,
        tags: entry.tags,
        media: entry.media,
        author: entry.author,
      };
      renderEditPost(postData);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function setEditFormListener() {
  const formEditPost = document.querySelector(".form-edit-post");

  if (formEditPost) {
    formEditPost.addEventListener("submit", (e) => {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const postData = Object.fromEntries(formData.entries());
      const post = restructureUserInput(postData);

      updateEntry(id, post)
        .then((post) => {
          handleSuccessful(post);
        })
        .catch((error) => {
          handleUnsuccessful(error);
        });
    });
  }
}

function restructureUserInput(post) {
  const body = post.body.replace(/^\s+|\s+$/g, "");
  const media = post.media.replace(/^\s+|\s+$/g, "");
  const tags = post.tags.replace(/^\s+|\s+$/g, "");

  if (body == "") {
    delete post.body;
  }

  if (media == "") {
    delete post.media;
  }

  if (tags == "") {
    delete post.tags;
  } else {
    post.tags = tags.toString().replace(/ /g, "").split(",");
  }

  return post;
}

function handleSuccessful(post) {
  createModal(`Post named: <b>${post.title}</b> successfully updated.`);
  const clearForm = document.querySelector(".modal-close-post");
  clearForm.addEventListener("click", redirectToHome);
}

function handleUnsuccessful(error) {
  createModal(
    `<b>Post not updated.</b> <br>Error message: <em>${error.message}</em>.`
  );
}
