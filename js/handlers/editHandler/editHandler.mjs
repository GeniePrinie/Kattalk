import { getEntry } from "../../controllers/entryController.mjs";
import { renderEditPost } from "./renderEditPost.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export function editEntry() {
  getEntry(id)
    .then((entry) => {
      const postData = {
        title: entry.title,
        body: entry.body,
        tags: entry.tags,
        media: entry.media,
        author: entry.author,
      };
      renderEditPost(postData);
    })
    .catch((error) => {
      console.log(error);
    });
}
