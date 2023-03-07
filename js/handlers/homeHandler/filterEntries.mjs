import { isValidUrl } from "../../shared/validURL.mjs";
import { renderEntries } from "./renderEntries.mjs";

/**
 * Filters entries based on user checking checkbox
 * @param {Array} entries Entries' data
 */
export function filterEntries(entries) {
  const todaysEntries = document.getElementById("todays-entries");
  const weekEntries = document.getElementById("week-entries");
  const mediaEntries = document.getElementById("media-entries");
  const tagsEntries = document.getElementById("tags-entries");

  filterByParameter(todaysEntries, entries);
  filterByParameter(weekEntries, entries);
  filterByParameter(mediaEntries, entries);
  filterByParameter(tagsEntries, entries);
}

/**
 * Check if checkbox is clicked and create new list of entries that fit the criteria
 * @param {HTMLElement} checkbox Filter criteria element
 * @param {Array} entries Entries' data
 */
function filterByParameter(checkbox, entries) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked == true) {
      renderEntries(getFilteredEntries(checkbox.name, entries));
    } else {
      renderEntries(entries);
    }
  });
}

/**
 * Filter the list of entries based of input parameter
 * @param {string} filterBy Filter criteria element
 * @param {Array} entries Entries' data
 * @returns {Array} Filtered entries
 */
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

/**
 * Checks if input date is today
 * @param {Date} someDate Date object
 * @returns {boolean} If input date is from today
 */
function isToday(someDate) {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
}

/**
 * Checks if input date is from this week
 * @param {Date} someDate Date object
 * @returns {boolean} If input date is from the last 7 days
 */
function thisWeek(someDate) {
  let lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  return someDate >= lastWeek;
}
