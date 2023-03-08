import { removeEntry } from "../../controllers/entryController.mjs";
import { redirectToHome } from "../../shared/redirect.mjs";

/**
 * Deletes entry based of URL parameter (id) on current page
 */
export function deleteEntry() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  removeEntry(id)
    .then((apiResponse) => {
      if (apiResponse == "204") {
        redirectToHome();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
