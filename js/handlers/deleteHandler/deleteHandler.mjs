import { removeEntry } from "../../controllers/entryController.mjs";
import { redirectToHome } from "../../shared/redirect.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export function deleteEntry() {
  removeEntry(id)
    .then((httpStatus) => {
      if (httpStatus == "204") {
        redirectToHome();
      }
    })
    .catch((error) => {
      console.log(error);
    });
  //
}
