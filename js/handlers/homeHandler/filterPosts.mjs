import { isValidUrl } from "../../shared/validURL.mjs";
import { renderPosts } from "./renderPosts.mjs";

const todaysPosts = document.getElementById("todays-posts");
const weekPosts = document.getElementById("week-posts");
const mediaPosts = document.getElementById("media-posts");
const tagsPosts = document.getElementById("tags-posts");

export function filterPosts(entries) {
  filterByParameter(todaysPosts, entries);
  filterByParameter(weekPosts, entries);
  filterByParameter(mediaPosts, entries);
  filterByParameter(tagsPosts, entries);
}

function filterByParameter(checkbox, entries) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      renderPosts(getFilteredEntries(checkbox.name, entries));
    } else {
      renderPosts(entries);
    }
  });
}

function getFilteredEntries(filterBy, entries) {
  let filteredEntries = [];

  switch (filterBy) {
    case "todaysPosts":
      filteredEntries = entries.filter((entry) => {
        if (isToday(new Date(entry.created))) {
          return true;
        }
      });
      break;
    case "weekPosts":
      filteredEntries = entries.filter((entry) => {
        if (thisWeek(new Date(entry.created))) {
          return true;
        }
      });
      break;
    case "mediaPosts":
      filteredEntries = entries.filter((entry) => {
        if (isValidUrl(entry.media)) {
          return true;
        }
      });
      break;
    case "tagsPosts":
      filteredEntries = entries.filter((entry) => {
        if (entry.tags.length != 0) {
          return true;
        }
      });
      break;
    default:
      filteredEntries = entries;
      break;
  }

  return filteredEntries;
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
  let lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  return someDate >= lastWeek;
}
