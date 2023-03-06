import { renderPosts } from "./renderPosts.mjs";

const todaysPosts = document.getElementById("todays-posts");
const weekPosts = document.getElementById("week-posts");
const mediaPosts = document.getElementById("media-posts");
const tagsPosts = document.getElementById("tags-posts");

export function filterPosts(entries) {
  createEventListener(todaysPosts, entries);
  createEventListener(weekPosts, entries);
  createEventListener(mediaPosts, entries);
  createEventListener(tagsPosts, entries);
}

function createEventListener(checkbox, entries) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      const filteredEntries = entries.filter((entry) => {
        if (isToday(new Date(entry.created))) {
          return true;
        }
      });
      renderPosts(filteredEntries);
    } else {
      renderPosts(entries);
    }
  });
}

function isToday(someDate) {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
}

// const filteredEntries = entries.filter((entry) => {
//   if (entry.title.toLowerCase().includes(searchValue)) {
//     return true;
//   }
// });
