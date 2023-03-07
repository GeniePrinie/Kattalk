import { isValidUrl } from "../../shared/validURL.mjs";
import { renderEntries } from "./renderEntries.mjs";

const todaysEntries = document.getElementById("todays-entries");
const weekEntries = document.getElementById("week-entries");
const mediaEntries = document.getElementById("media-entries");
const tagsEntries = document.getElementById("tags-entries");

export function filterEntries(entries) {
  filterByParameter(todaysEntries, entries);
  filterByParameter(weekEntries, entries);
  filterByParameter(mediaEntries, entries);
  filterByParameter(tagsEntries, entries);
}

function filterByParameter(checkbox, entries) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      renderEntries(getFilteredEntries(checkbox.name, entries));
    } else {
      renderEntries(entries);
    }
  });
}

function getFilteredEntries(filterBy, entries) {
  let filteredEntries = [];

  switch (filterBy) {
    case "todaysEntries":
      filteredEntries = entries.filter((entry) => {
        if (isToday(new Date(entry.created))) {
          return true;
        }
      });
      break;
    case "weekEntries":
      filteredEntries = entries.filter((entry) => {
        if (thisWeek(new Date(entry.created))) {
          return true;
        }
      });
      break;
    case "mediaEntries":
      filteredEntries = entries.filter((entry) => {
        if (isValidUrl(entry.media)) {
          return true;
        }
      });
      break;
    case "tagsEntries":
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
