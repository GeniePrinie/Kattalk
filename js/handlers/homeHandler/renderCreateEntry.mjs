import { DEFAULT_AVATAR } from "../../shared/constants.mjs";
import { load } from "../../shared/storage.mjs";
import { isValidUrl } from "../../shared/validURL.mjs";

const apiCreateEntry = document.querySelector(".api-create-entry");

export function renderCreateEntry() {
  const profile = load("profile");
  const createHeader = getCreateHeader(profile.name, profile.avatar);
  const createTitleInput = getCreateTitleInput();
  const createBodyInput = getCreateBodyInput();
  const createTagsInput = getCreateTagsInput();
  const createMediaInput = getCreateMediaInput();
  const entryButton = getEntryButton();

  apiCreateEntry.innerHTML += `
  <div class="container d-flex justify-content-center">
    <div class="accordion card card-custom mt-4 shadow-sm bg-white border-0" id="accordionCreateEntry">
      <div class="card border-0">
        ${createHeader}   
        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionCreateEntry">
          <div class="card-body">
            <form class="m-0 ps-0 align-self-center form-create-entry" id="form-create-entry" method="post" novalidate>
              ${createTitleInput}
              ${createBodyInput}
              ${createTagsInput}
              ${createMediaInput}
              ${entryButton}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function getCreateHeader(name, avatar) {
  const authorAvatar = isValidUrl(avatar) ? avatar : DEFAULT_AVATAR;

  return `
  <div class="card-header bg-white border-0 rounded-bottom" id="headingOne">
    <div class="row">
      <img class="col-2 col-sm-2 img-user m-0" src="${authorAvatar}" alt="${name}"/>

      <button class="btn col-3 btn-link fw-bold" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Create a new entry
      </button>
    </div>
  </div>`;
}

function getCreateTitleInput() {
  return `
  <input 
    name="title" 
    type="text" 
    id="comment" 
    class="form-control mb-3" 
    placeholder="What's the title?" 
    aria-label="Title of a new entry" 
    required 
  />`;
}

function getCreateBodyInput() {
  return `
  <textarea
    name="body"
    aria-label="Title of a new entry"
    class="form-control mb-3"
    id="formControlTextarea"
    placeholder=". . . and the body?"
    aria-label="Body of a new entry"
    rows="3">
  </textarea>`;
}

function getCreateTagsInput() {
  return `
  <input
    name="tags"
    type="text"
    id="tags"
    class="form-control mb-3"
    placeholder=". . . and the tag(s)? ex: cool, awesome, trendy"
    aria-label="Tag(s) of a new entry"
  />`;
}

function getCreateMediaInput() {
  return `
  <input
    type="url"
    id="media"
    name="media"
    class="form-control mb-3"
    placeholder=". . . and the media URL? ex: https://url.com/image.jpg"
    aria-label="Add URL of a media for the new entry"
  />`;
}

function getEntryButton() {
  return `
  <button 
    class="btn btn-primary" 
    data-toggle="modal" 
    data-target="#feedbackModal" 
    type="submit">
      Post
  </button>`;
}
