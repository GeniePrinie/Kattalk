import { renderAllPosts } from "./renderAllPosts.mjs";
// import { searchAllPosts } from "./homeHandler.mjs";

try {
  renderAllPosts().then((posts) => {
    renderAllPosts(posts);
    // searchAllPosts(posts);
  });
} catch (error) {
  document.querySelector(".api-entries").innerHTML = `<div>${error}</div>`;
}
