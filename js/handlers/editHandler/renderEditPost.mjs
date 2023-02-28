import { DEFAULT_AVATAR } from "../../shared/constants.mjs";
import { isValidUrl } from "../../shared/validURL.mjs";

const apiEditEntry = document.querySelector(".api-edit-entry");

export function renderEditPost(post) {
  const avatar = isValidUrl(post.author.avatar)
    ? post.author.avatar
    : DEFAULT_AVATAR;

  apiEditEntry.innerHTML += `
  <div class="container d-flex justify-content-center">
    <div
      class="accordion card card-custom mt-4 shadow-sm bg-white border-0"
      id="accordionCreatePost"
    >
      <div class="card border-0">
        <div
          class="card-header bg-white border-0 rounded-bottom"
          id="headingOne"
        >
          <div class="row">
            <img
              class="col-2 col-sm-2 img-user m-0"
              src="${avatar}"
              alt="${post.author.name}"
            />

            <p
              class="text-primary col-3 fw-bold fs-5 mt-3"
              >
              Edit post
            </p>
          </div>
        </div>

        
          <div class="card-body">
            <form
              class="m-0 ps-0 align-self-center form-create-post"
              id="form-create-post"
              method="post"
              novalidate
            >
              <input
                name="title"
                type="text"
                id="comment"
                class="form-control mb-3"
                value="${post.title}"
                aria-label="Title of a new post"
                required
              />

              <textarea
                name="body"
                aria-label="Title of a new post"
                class="form-control mb-3"
                id="formControlTextarea"
                aria-label="Body of a new post"
                rows="3"
              >${post.body}</textarea>

              <input
                name="tags"
                type="text"
                id="tags"
                class="form-control mb-3"
                value="${post.tags}"
                aria-label="Tag(s) of a new post"
              />

              <input
                type="url"
                id="media"
                name="media"
                class="form-control mb-3"
                value="${post.media}"
                aria-label="Add URL of a media for the new post"
              />

              <button
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#feedbackModal"
                type="submit"
              >
                Edit
              </button>
              <button class="btn btn-outline-primary" type="submit">
                <a href="/" class="text-decoration-none" >Cancel</a>
              </button>
            </form>
          </div>
        
      </div>
    </div>
  </div>`;
}
