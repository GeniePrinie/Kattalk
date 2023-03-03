import { DEFAULT_AVATAR } from "../../shared/constants.mjs";
import { isValidUrl } from "../../shared/validURL.mjs";

const apiEditEntry = document.querySelector(".api-edit-entry");

export function renderEditPost(post) {
  const editHeader = getEditHeader(post.author.name, post.author.avatar);
  const editTitleInput = getEditTileInput(post.title);
  const editBodyInput = getEditBodyInput(post.body);
  const editTagsInput = getEditTagsInput(post.tags);
  const editMediaInput = getEditMediaInput(post.media);
  const editButton = getEditButton();
  const cancelButton = getCancelButton();

  apiEditEntry.innerHTML += `
  <div class="container d-flex justify-content-center">
    <div class="accordion card card-custom mt-4 shadow-sm bg-white border-0" id="accordionCreatePost">
      <div class="card border-0">
        ${editHeader}        
        <div class="card-body">
          <form class="m-0 ps-0 align-self-center form-edit-post" id="form-edit-post" method="post" novalidate>
              ${editTitleInput}
              ${editBodyInput}
              ${editTagsInput}
              ${editMediaInput}
              ${editButton}
              ${cancelButton}
          </form>
        </div>
      </div>
    </div>
  </div>`;
}

function getEditHeader(name, avatar) {
  const authorAvatar = isValidUrl(avatar) ? avatar : DEFAULT_AVATAR;

  return `
  <div class="card-header bg-white border-0 rounded-bottom" id="headingOne">
    <div class="row">
      <img class="col-2 col-sm-2 img-user m-0" src="${authorAvatar}" alt="${name}"/>
      <p class="text-primary col-3 fw-bold fs-5 mt-3"> Edit post</p>
    </div>
  </div>`;
}

function getEditTileInput(title) {
  return `
  <input
    name="title"
    type="text"
    id="comment"
    class="form-control mb-3"
    value="${title}"
    aria-label="Title of a new post"
    required
  />`;
}

function getEditBodyInput(body) {
  return `
  <textarea
    name="body"
    aria-label="Title of a new post"
    class="form-control mb-3"
    id="formControlTextarea"
    aria-label="Body of a new post"
    rows="3" >${body}
  </textarea> `;
}

function getEditTagsInput(tags) {
  const hashtags = tags.length == 0 ? "" : tags.join(", ");
  return `
  <input
    name="tags"
    type="text"
    id="tags"
    class="form-control mb-3"
    value="${hashtags}"
    aria-label="Tag(s) of a new post"
  /> `;
}

function getEditMediaInput(media) {
  const photo = media == null ? "" : media;
  return `
  <input
    type="url"
    id="media"
    name="media"
    class="form-control mb-3"
    value="${photo}"
    aria-label="Add URL of a media for the new post"
  /> `;
}

function getEditButton() {
  return `
  <button
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#feedbackModal"
    type="submit">
      Edit
  </button>`;
}

function getCancelButton() {
  return `
  <button class="btn btn-outline-primary" type="submit">
     <a href="/" class="text-decoration-none">Cancel</a>
  </button>`;
}
