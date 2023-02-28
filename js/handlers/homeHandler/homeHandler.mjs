import { getEntries, createEntry } from "../../controllers/entryController.mjs";
import { renderAllPosts } from "./renderAllPosts.mjs";
import { renderCreateEntry } from "./renderCreateEntry.mjs";

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
