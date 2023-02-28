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
      for (let i = 0; i < 10; i++) {
        const entry = entries[i];
        const postData = {
          title: entry.title,
          body: entry.body,
          tags: entry.tags,
          media: entry.media,
          reactions: entry.reactions,
          comments: entry.comments,
          created: entry.created,
          id: entry.id,
          author: entry.author,
          count: entry._count,
        };
        renderAllPosts(postData);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

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

// formCreatePost.addEventListener("submit", (e) => {
//   const form = e.target;
//   const formData = new FormData(form);
//   const profile = Object.fromEntries(formData.entries());

//   if (profile.body == "") {
//     delete profile.body;
//   }

//   if (profile.tags == "") {
//     delete profile.tags;
//   }

//   if (profile.media == "") {
//     delete profile.media;
//   }

//   createEntry(profile)
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });
// setPostFormListener();

// export function searchEntries(entries) {
//   const userSearch = document.querySelector(".search"); // linked to user input

//   userSearch.onkeyup = function (event) {
//     const searchValue = event.target.value.trim().toLowerCase();

//     const filteredEntries = entries.filter((entry) => {
//       if (recipe.title.rendered.toLowerCase().includes(searchValue)) {
//         return true;
//       }
//     });

//     renderAllPosts(filteredPosts);
//   };
// }

// const formCreatePost = document.querySelector(".form-create-post");

// export function setPostFormListener() {
//   // if (formCreatePost) {
//   //   formCreatePost.addEventListener("submit", (e) => {
//   //     const form = e.target;
//   //     const formData = new FormData(form);
//   //     const profile = Object.fromEntries(formData.entries());
//   //     createEntry(profile)
//   //       .then(() => {
//   //         handleSuccessful();
//   //       })
//   //       .catch((error) => {
//   //         handleUnsuccessful(error);
//   //       });
//   //   });
//   // }
// }

// function handleSuccessful() {
//   createModal(`You've created a post!.`);
//   redirectToHome();
// }

// function handleUnsuccessful(error) {
//   createModal(
//     `Post not created. <br>Error message: <em>${error.message}</em>.`
//   );
// }
