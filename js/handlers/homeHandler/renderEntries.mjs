import { isValidUrl } from "../../shared/validURL.mjs";
import { load } from "../../shared/storage.mjs";
import { DEFAULT_AVATAR } from "../../shared/constants.mjs";

/**
 * Renders out entries to the html page
 * @param {Array} entries Entries' data
 */
export function renderEntries(entries) {
  const apiEntries = document.querySelector(".api-entries");

  if (entries.length == 0) {
    apiEntries.innerHTML = "No entries!"; // Add design!
    return;
  }
  apiEntries.innerHTML = "";

  entries.forEach((rawEntry) => {
    const entry = cleanEntryParameters(rawEntry);

    const entryTitle = getEntryHeader(entry.author, entry.title, entry.id);
    const optionsMenu = getOptionsMenu(entry.author, entry.id);
    const timeAndTags = getTimeAndTags(entry.tags, entry.created);
    const mediaImage = getMediaImage(entry.media);
    const entryBody = getEntryBody(entry.body);
    const interactionCount = getInteractionCount(entry._count);
    const displayComments = getDisplayComments(entry.comments);
    const displayReactions = getDisplayReactions(entry.reactions);

    apiEntries.innerHTML += `
  <div class="container d-flex justify-content-center">
      <div class="card card-custom mt-4 shadow-sm bg-white border-0">
          <div class="card-body pb-0">
              <div class="row">
                  ${entryTitle}
                  ${optionsMenu}
                  ${timeAndTags}
                  ${mediaImage}
                  ${entryBody}
                  ${interactionCount}
                  <div class="collapse" id="collapseReaction">
                      <div class="d-flex justify-content-start">
                          ${displayReactions}
                      </div>
                  </div>
                  <div class="collapse" id="collapseComment">
                      ${displayComments}   
                      <form class="m-2">
                          <input type="text" id="comment" class="form-control rounded-pill" placeholder="Write a comment..."/>
                      </form>               
                  </div>
              </div>
          </div>
      </div>
  </div>`;
  });
}

/**
 * Make sure the entry data is valid and set default values
 * @param {object} entry Entry data
 * @returns {object} Entry data without errors, and with some default values
 */
function cleanEntryParameters(entry) {
  const { tags, body, media, author, created } = entry;

  let buildTags = "";
  if (tags.length != 0) {
    tags.forEach((tag) => {
      buildTags += `#${tag} `;
    });
  }
  entry.tags = buildTags;
  entry.body = body == null ? "" : body;
  entry.media = isValidUrl(media) ? media : "";

  entry.author.avatar = isValidUrl(author.avatar)
    ? author.avatar
    : DEFAULT_AVATAR;

  entry.comments.forEach((comment) => {
    comment.author.avatar = isValidUrl(comment.author.avatar)
      ? comment.author.avatar
      : DEFAULT_AVATAR;
  });

  const m = new Date(created);
  entry.created =
    m.getUTCFullYear() +
    "/" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) +
    "/" +
    ("0" + m.getUTCDate()).slice(-2) +
    " " +
    ("0" + m.getUTCHours()).slice(-2) +
    ":" +
    ("0" + m.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + m.getUTCSeconds()).slice(-2);

  return entry;
}

/**
 * Creates the entry header as html code
 * @param {object} author Author of entry
 * @param {string} title Title of entry
 * @returns {string} Entry header section
 */
function getEntryHeader(author, title, id) {
  const { avatar, name } = author;
  return `<img class="col-2 col-sm-2 rounded img-user m-0 mb-3" src="${avatar}" alt="${name}"/>
          <a href="/html/entry/details/?id=${id}" class="card-title col m-0 pt-3 text-decoration-none text-black">
            <h2 class="fs-5 col">${title} <small><em>written by</em> ${name}</small></h2>
          </a>`;
}

/**
 * Creates the entry options menu as html code if logged in user created it
 * @param {object} author Author of entry
 * @param {number} id Id of entry
 * @returns {string} Entry options menu section
 */
function getOptionsMenu(author, id) {
  const userProfile = load("profile");

  if (userProfile.email == author.email) {
    return `<ul class="navbar-nav mr-auto col-1 text-end">
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link pt-0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </a>
                    <div class="dropdown-menu dots-edit" aria-labelledby="navbarDropdown">
                        <button class="dropdown-item"><a href="/html/entry/edit/?id=${id}" class="text-decoration-none text-black">Edit</a></button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item"><a href="/html/entry/delete/?id=${id}" class="text-decoration-none text-black">Delete</a></button>
                    </div>
                </li>
            </ul>`;
  }
  return "";
}

/**
 * Creates the entry tags and timestamp as html code
 * @param {string} tags Tags of entry
 * @param {string} timestamp Timestamp of entry
 * @returns {string} Entry tags and timestamp section
 */
function getTimeAndTags(tags, timestamp) {
  return `<div class="d-flex justify-content-between">
            <em class="fs-6"><small>${tags}</small></em>
            <small>${timestamp}</small>
        </div>`;
}

/**
 * Creates the entry image as html code
 * @param {string} media Media image of entry (empty if media URL not valid)
 * @returns {string} Entry media image section
 */
function getMediaImage(media) {
  return `<img src="${media}" alt="${media}" class="card-img mt-4" />`;
}

/**
 * Creates the entry body as html code
 * @param {string} body Body of entry
 * @returns {string} Entry body section
 */
function getEntryBody(body) {
  return `<div class="card-text pt-3">${body}</div>`;
}

/**
 * Creates the entry overview of interactions as html code
 * @param {object} count Count of entry reactions and comments
 * @returns {string} Entry interactions section
 */
function getInteractionCount(count) {
  const { reactions, comments } = count;
  return `<div class="d-flex justify-content-center border-top border-bottom mt-3">
            <button class="btn m-1 col-6 align-self-center" type="button" data-toggle="collapse" data-target="#collapseReaction" aria-expanded="false" aria-controls="collapseReaction">
                <i class="fa-regular fa-heart me-2"></i>${reactions} Reaction(s)
            </button>
            <button class="btn m-1 col-6" type="button" data-toggle="collapse" data-target="#collapseComment" aria-expanded="false" aria-controls="collapseComment">
                <i class="fa-regular fa-comment me-2"></i>${comments} Comment(s)
            </button>
        </div>`;
}

/**
 * Creates the entry comments as html code
 * @param {object} comments Comments of entry
 * @returns {string} Entry comment section
 */
function getDisplayComments(comments) {
  let buildCommentSection = "";
  comments.forEach((comment) => {
    const { author, created, body } = comment;
    buildCommentSection += `
        <div class="comment row border-bottom mt-2">
            <img class="col-2 col-sm-2 img-user m-0 mb-3 img-comment" src="${author.avatar}" alt="${author.name}"/>
            <h3 class="card-title col fs-5 m-0 pt-1"><small>${author.name}</small></h3>
            <small class="pb-1">${created}</small>
            <p>${body}</p>
        </div>`;
  });
  return buildCommentSection;
}

/**
 * Creates the entry reactions as html code
 * @param {object} comments Reactions of entry
 * @returns {string} Entry reaction section
 */
function getDisplayReactions(reactions) {
  let buildReactionSection = "";
  reactions.forEach((reaction) => {
    const { symbol, count } = reaction;
    buildReactionSection += `
        <div class="comment mt-2">
            <p>${symbol} <small><em>${count}</em></small>&nbsp;&nbsp;</p>
        </div>`;
  });
  return buildReactionSection;
}
