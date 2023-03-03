import { getEntry } from "../../controllers/entryController.mjs";
import { renderSpecificPost } from "./renderSpecificPost.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export function displayEntry() {
  getEntry(id)
    .then((entry) => {
      const postData = {
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
      renderSpecificPost(postData);
    })
    .catch((error) => {
      console.log(error);
    });
}
