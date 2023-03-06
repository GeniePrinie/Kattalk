import { renderPosts } from "./renderPosts.mjs";

export function searchPosts(entries) {
  const userSearch = document.querySelector(".search");

  userSearch.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredEntries = entries.filter((entry) => {
      if (entry.title.toLowerCase().includes(searchValue)) {
        return true;
      }
    });

    renderPosts(filteredEntries);
  };

  // userSearch.addEventListener("search", (event) => {
  //   const searchValue = event.target.value.trim().toLowerCase();

  //   const filteredEntries = entries.filter((entry) => {
  //     if (entry.title.toLowerCase().includes(searchValue)) {
  //       return true;
  //     }
  //   });

  //   renderPosts(filteredEntries);
  // });
}
