import { isValidUrl } from "../../shared/validURL.mjs";
import { renderPosts } from "./renderPosts.mjs";

const todaysPosts = document.getElementById("todays-posts");
const weekPosts = document.getElementById("week-posts");
const mediaPosts = document.getElementById("media-posts");
const tagsPosts = document.getElementById("tags-posts");

export function filterPosts(entries) {
  filterTodaysPosts(todaysPosts, entries);
  filterWeeksPosts(weekPosts, entries);
  filterMediaPosts(mediaPosts, entries);
  filterTagsPosts(tagsPosts, entries);
}

function filterTodaysPosts(checkbox, entries) {
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

function filterWeeksPosts(checkbox, entries) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      const filteredEntries = entries.filter((entry) => {
        if (thisWeek(new Date(entry.created))) {
          return true;
        }
      });
      renderPosts(filteredEntries);
    } else {
      renderPosts(entries);
    }
  });
}

function filterMediaPosts(checkbox, entries) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      const filteredEntries = entries.filter((entry) => {
        if (isValidUrl(entry.media)) {
          return true;
        }
      });
      renderPosts(filteredEntries);
    } else {
      renderPosts(entries);
    }
  });
}

function filterTagsPosts(checkbox, entries) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      const filteredEntries = entries.filter((entry) => {
        if (entry.tags.length != 0) {
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

function thisWeek(someDate) {
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
