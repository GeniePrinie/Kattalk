import { isValidUrl } from "../shared/validURL.mjs";
import { load } from "../shared/storage.mjs";

export function renderPost(post, apiClassName) {
  const apiEntry = document.querySelector(apiClassName);
  const postTitle = getPostTitle(post.author, post.title, post.id);
  const optionsMenu = getOptionsMenu(post.author);
  const timeAndTags = getTimeAndTags(post.tags, post.created);
  const mediaImage = getMediaImage(post.media);
  const postBody = getPostBody(post.body);
  const interactionCount = getInteractionCount(post.count);
  const displayComments = getDisplayComments(post.comments);
  const displayReactions = getDisplayReactions(post.reactions);

  apiEntry.innerHTML += `
  <div class="container d-flex justify-content-center">
      <div class="card card-custom mt-4 shadow-sm bg-white border-0">
          <div class="card-body pb-0">
              <div class="row">
                  ${postTitle}
                  ${optionsMenu}
                  ${timeAndTags}
                  ${mediaImage}
                  ${postBody}
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
}

function getPostTitle(author, title, id) {
  const authorName = author.name;
  const authorAvatar = isValidUrl(author.avatar)
    ? author.avatar
    : "https://images.unsplash.com/photo-1627373574917-572a86881d73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80";

  return `<img class="col-2 col-sm-2 rounded img-user m-0 mb-3" src="${authorAvatar}" alt="${authorName}"/>
          <a href="/html/post/?id=${id}" class="card-title col m-0 pt-3 text-decoration-none text-black">
            <h2 class="fs-5 col">${title} <small><em>written by</em> ${authorName}</small></h2>
          </a>`;
}

function getOptionsMenu(author) {
  const userProfile = load("profile");

  if (userProfile.email == author.email) {
    return `<ul class="navbar-nav mr-auto col-1 text-end">
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link pt-0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </a>
                    <div class="dropdown-menu dots-edit" aria-labelledby="navbarDropdown">
                        <button class="dropdown-item">Edit</button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item">Delete</button>
                    </div>
                </li>
            </ul>`;
  }
  return "";
}

function getTimeAndTags(tags, timestamp) {
  let hashtags = "";
  if (tags != "") {
    const seperatedTags = tags.toString().replace(/ /g, "").split(",");
    seperatedTags.forEach((tag) => {
      hashtags += `#${tag} `;
    });
  }

  return `<div class="d-flex justify-content-between">
            <em class="fs-6"><small>${hashtags}</small></em>
            <small>${timestamp}</small>
        </div>`;
}

function getMediaImage(media) {
  const photo = isValidUrl(media) ? media : "";

  return `<img src="${photo}" alt="${photo}" class="card-img mt-4" />`;
}

function getPostBody(body) {
  return `<div class="card-text pt-3">${body}</div>`;
}

function getInteractionCount(count) {
  return `<div class="d-flex justify-content-center border-top border-bottom mt-3">
            <button class="btn m-1 col-6 align-self-center" type="button" data-toggle="collapse" data-target="#collapseReaction" aria-expanded="false" aria-controls="collapseReaction">
                <i class="fa-regular fa-heart me-2"></i>${count.reactions} Reaction(s)
            </button>
            <button class="btn m-1 col-6" type="button" data-toggle="collapse" data-target="#collapseComment" aria-expanded="false" aria-controls="collapseComment">
                <i class="fa-regular fa-comment me-2"></i>${count.comments} Comment(s)
            </button>
        </div>`;
}

function getDisplayComments(comments) {
  let buildCommentSection = "";
  comments.forEach((comment) => {
    const authorName = comment.author.name;
    const authorAvatar = isValidUrl(comment.author.avatar)
      ? comment.author.avatar
      : "https://images.unsplash.com/photo-1627373574917-572a86881d73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80";

    buildCommentSection += `
        <div class="comment row border-bottom mt-2">
            <img class="col-2 col-sm-2 img-user m-0 mb-3 img-comment" src="${authorAvatar}" alt="${authorName}"/>
            <h3 class="card-title col fs-5 m-0 pt-1"><small>${authorName}</small></h3>
            <small class="pb-1">${comment.created}</small>
            <p>${comment.body}</p>
        </div>`;
  });
  return buildCommentSection;
}

function getDisplayReactions(reactions) {
  let buildReactionSection = "";
  reactions.forEach((reaction) => {
    buildReactionSection += `
        <div class="comment mt-2">
            <p>${reaction.symbol} <small><em>${reaction.count}</em></small>&nbsp;&nbsp;</p>
        </div>`;
  });
  return buildReactionSection;
}