import { getEntry } from "../../controllers/entryController.mjs";
import { redirectToHome } from "../../shared/redirect.mjs";
import { renderSpecificEntry } from "./renderSpecificEntry.mjs";

/**
 * Displays entry based of URL parameter (id) on current page
 */
export function displayEntry() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  getEntry(id)
    .then((entry) => {
      const entryData = {
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
      renderSpecificEntry(entryData);
    })
    .catch((error) => {
      alert(error);
      redirectToHome();
    });
}
