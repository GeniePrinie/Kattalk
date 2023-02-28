import { DEFAULT_AVATAR } from "../../shared/constants.mjs";
import { load } from "../../shared/storage.mjs";
import { isValidUrl } from "../../shared/validURL.mjs";

const apiCreateEntry = document.querySelector(".api-create-entry");

export function renderCreateEntry() {
  const profile = load("profile");
  const avatar = isValidUrl(profile.avatar) ? profile.avatar : DEFAULT_AVATAR;
  const name = profile.name;

  apiCreateEntry.innerHTML += `
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
              alt="${name}"
            />

            <button
              class="btn col-3 btn-link fw-bold"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Create a new post
            </button>
          </div>
        </div>

        <div
          id="collapseOne"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionCreatePost"
        >
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
                placeholder="What's the title?"
                aria-label="Title of a new post"
                required
              />

              <textarea
                name="body"
                aria-label="Title of a new post"
                class="form-control mb-3"
                id="formControlTextarea"
                placeholder=". . . and the body?"
                aria-label="Body of a new post"
                rows="3"
              ></textarea>

              <input
                name="tags"
                type="text"
                id="tags"
                class="form-control mb-3"
                placeholder=". . . and the tag(s)? ex: cool, awesome, trendy"
                aria-label="Tag(s) of a new post"
              />

              <input
                type="url"
                id="media"
                name="media"
                class="form-control mb-3"
                placeholder=". . . and the media URL? ex: https://url.com/image.jpg"
                aria-label="Add URL of a media for the new post"
              />

              <button
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#feedbackModal"
                type="submit"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
