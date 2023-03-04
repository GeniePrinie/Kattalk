import { getEntries, createEntry } from "../../controllers/entryController.mjs";
import { renderAllPosts } from "./renderAllPosts.mjs";
import { renderCreateEntry } from "./renderCreateEntry.mjs";
import { load } from "../../shared/storage.mjs";
import { redirectToHome, redirectToLogin } from "../../shared/redirect.mjs";
import { createModal } from "../../shared/modal.mjs";

export function checkIfLoggedIn() {
  const token = load("token");

  if (token === null) {
    redirectToLogin();
  }
}

export function displayPostEntry() {
  renderCreateEntry();
}

export function displayEntries() {
  getEntries()
    .then((entries) => {
      renderAllPosts(entries);
    })
    .catch((error) => {
      console.log(error);
    });
}

// for (let i = 0; i < 10; i++) {
//   const entry = entries[i];
//   const postData = {
//     title: entry.title,
//     body: entry.body,
//     tags: entry.tags,
//     media: entry.media,
//     reactions: entry.reactions,
//     comments: entry.comments,
//     created: entry.created,
//     id: entry.id,
//     author: entry.author,
//     count: entry._count,
//   };
//   renderAllPosts(postData);
// }
// const userSearch = document.querySelector(".search");

// userSearch.onkeyup = function (event) {
//   const searchValue = event.target.value.trim().toLowerCase();
//   const apiEntries = document.querySelector(".api-entries");
//   apiEntries.innerHTML = "";

//   const filteredEntries = entries.filter((entry) => {
//     if (entry.title && entry.title.toLowerCase().includes(searchValue)) {
//       return true;
//     }
//   });

//   for (let i = 0; i < 10; i++) {
//     const entry = filteredEntries[i];
//     const postData = {
//       title: entry.title,
//       body: entry.body,
//       tags: entry.tags,
//       media: entry.media,
//       reactions: entry.reactions,
//       comments: entry.comments,
//       created: entry.created,
//       id: entry.id,
//       author: entry.author,
//       count: entry._count,
//     };
//     renderAllPosts(postData);
//   }
// };

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

function restructureUserInput(post) {
  const body = post.body;
  const media = post.media;
  const tags = post.tags;

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
  createModal(`Post named: <b>${post.title}</b> successfully created.`);
  const clearForm = document.querySelector(".modal-close-post");
  clearForm.addEventListener("click", redirectToHome);
}

function handleUnsuccessful(error) {
  createModal(
    `<b>Post not created.</b> <br>Error message: <em>${error.message}</em>.`
  );
}
