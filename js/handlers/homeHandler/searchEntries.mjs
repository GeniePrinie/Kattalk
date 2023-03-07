import { renderEntries } from "./renderEntries.mjs";

export function searchEntries(entries) {
  const userSearch = document.querySelector(".search");

  userSearch.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredEntries = entries.filter((entry) => {
      if (entry.title.toLowerCase().includes(searchValue)) {
        return true;
      }
    });

    renderEntries(filteredEntries);
    return filteredEntries;
  };
}
