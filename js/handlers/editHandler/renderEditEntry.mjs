import { DEFAULT_AVATAR } from "../../shared/constants.mjs";
import { isValidUrl } from "../../shared/validURL.mjs";

/**
 * Renders out an entry with current data to the html page
 * @param {object} entry Entry data
 */
export function renderEditEntry(rawEntry) {
  const apiEditEntry = document.querySelector(".api-edit-entry");
  const entry = cleanEntryParameters(rawEntry);

  const editHeader = getEditHeader(entry.author);
  const editTitleInput = getEditTitleInput(entry.title);
  const editBodyInput = getEditBodyInput(entry.body);
  const editTagsInput = getEditTagsInput(entry.tags);
  const editMediaInput = getEditMediaInput(entry.media);
  const editButton = getEditButton();
  const cancelButton = getCancelButton();

  apiEditEntry.innerHTML += `
  <div class="container d-flex justify-content-center">
    <div class="accordion card card-custom mt-4 shadow-sm bg-white border-0" id="accordionCreateEntry">
      <div class="card border-0">
        ${editHeader}        
        <div class="card-body">
          <form class="m-0 ps-0 align-self-center form-edit-entry" id="form-edit-entry" method="post" novalidate>
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

/**
 * Make sure the entry data is valid and set default values
 * @param {object} entry Entry data
 * @returns {object} Entry data without errors, and with some default values
 */
function cleanEntryParameters(entry) {
  const { tags, body, media, author } = entry;

  entry.tags = tags.toString().replace(/ /g, "").split(",");
  entry.body = body == null ? "" : body;
  entry.media = isValidUrl(media) ? media : "";
  entry.author.avatar = isValidUrl(author.avatar)
    ? author.avatar
    : DEFAULT_AVATAR;

  return entry;
}

/**
 * Creates the entry title as html code
 * @param {object} author Author of entry
 * @param {string} title Title of entry
 * @returns {string} Entry header section
 */
function getEditHeader(author) {
  const { name, avatar } = author;
  return `
  <div class="card-header bg-white border-0 rounded-bottom" id="headingOne">
    <div class="row">
      <img class="col-2 col-sm-2 img-user m-0" src="${avatar}" alt="${name}"/>
      <p class="text-primary col-3 fw-bold fs-5 mt-3"> Edit entry</p>
    </div>
  </div>`;
}

/**
 * Creates the entry edit title as html code
 * @param {string} title Current title of entry
 * @returns {string} Entry title section
 */
function getEditTitleInput(title) {
  return `
  <input
    name="title"
    type="text"
    id="comment"
    class="form-control mb-3"
    value="${title}"
    aria-label="Title of a new entry"
    required
  />`;
}

/**
 * Creates the entry body as html code
 * @param {string} body Current body of entry
 * @returns {string} Entry body section
 */
function getEditBodyInput(body) {
  return `
  <textarea
    name="body"
    aria-label="Title of a new entry"
    class="form-control mb-3"
    id="formControlTextarea"
    aria-label="Body of a new entry"
    rows="3" >${body}
  </textarea> `;
}

/**
 * Creates the entry tags as html code
 * @param {string} tags Current tags of entry
 * @returns {string} Entry tags section
 */
function getEditTagsInput(tags) {
  return `
  <input
    name="tags"
    type="text"
    id="tags"
    class="form-control mb-3"
    value="${tags}"
    aria-label="Tag(s) of a new entry"
  /> `;
}

/**
 * Creates the entry media as html code
 * @param {string} media Current media of entry
 * @returns {string} Entry media section
 */
function getEditMediaInput(media) {
  return `
  <input
    type="url"
    id="media"
    name="media"
    class="form-control mb-3"
    value="${media}"
    aria-label="Add URL of a media for the new entry"
  /> `;
}

/**
 * Creates the edit entry button as html code
 * @returns {string} Edit entry button section
 */
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

/**
 * Creates the cancel edit entry button as html code
 * @returns {string} Cancel edit entry button section
 */
function getCancelButton() {
  return `
  <button class="btn btn-outline-primary" type="submit">
     <a href="/" class="text-decoration-none">Cancel</a>
  </button>`;
}
