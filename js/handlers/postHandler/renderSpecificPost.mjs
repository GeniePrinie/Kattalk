import { renderPost } from "../renderPost.mjs";

const pageTitle = document.querySelector("title");

export function renderSpecificPost(post) {
  renderPost(post, ".api-entry");
  pageTitle.innerHTML = `Kattalk | ${post.title}`;
}
