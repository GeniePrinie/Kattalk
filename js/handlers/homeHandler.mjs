import { getEntries } from "../controllers/entryController.mjs";

const apiEntries = document.querySelector(".api-entries");

export function displayEntries() {
  getEntries()
    .then((entries) => {
      for (let i = 0; i < 100; i++) {
        const entry = entries[i];
        const id = entry.id;
        const title = entry.title;
        const body = entry.body;
        const tags = entry.tags;
        const media = entry.media;
        const created = entry.created;
        const author = entry.author.name;
        const avatar =
          entry.author.avatar !== ""
            ? entry.author.avatar
            : "https://images.unsplash.com/photo-1627373574917-572a86881d73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80";

        apiEntries.innerHTML += `
        <div class="container d-flex justify-content-center">
        <div class="card card-custom mt-4 shadow-sm bg-white border-0">
        <div class="card-body pb-0">
          <div class="row">
            <img
              class="col-2 col-sm-2 rounded img-user m-0 mb-3"
              src="${avatar}"
              alt="${author}"
            />
            <a
                href="/html/post/3558"
                class="card-title col m-0 pt-3 text-decoration-none text-black"
              >
            <h2 class="fs-5">
              ${title} <small><em>written by</em> ${author}</small>
            </h2>
            </a>
            <ul class="navbar-nav mr-auto col-1 text-end">
              <li class="nav-item dropdown">
                <a
                  href="#"
                  class="nav-link pt-0"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  ><i class="fa-solid fa-ellipsis-vertical"></i
                ></a>
                <div
                  class="dropdown-menu dots-edit"
                  aria-labelledby="navbarDropdown"
                >
                  <button class="dropdown-item">Edit</button>

                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item">Delete</button>
                </div>
              </li>
            </ul>
            <div class="d-flex justify-content-between">
              <em class="fs-6"> <small> ${tags} </small></em>
              <small>${created}</small>
            </div>
            <img src="${media}" alt="${media}" class="card-img mt-4" />
            <div class="card-text pt-3">${body}</div>

            <div
              class="d-flex justify-content-center border-top border-bottom mt-3"
            >
              <button class="btn m-1 col-6 align-self-center">
                <i class="fa-regular fa-heart me-2"></i>Like
              </button>
              <button
                class="btn m-1 col-6"
                type="button"
                data-toggle="collapse"
                data-target="#collapseComment"
                aria-expanded="false"
                aria-controls="collapseComment"
              >
                <i class="fa-regular fa-comment me-2"></i>
                Comment
              </button>
            </div>
            <div class="collapse" id="collapseComment">
              <form class="m-2">
                <input
                  type="text"
                  id="comment"
                  class="form-control rounded-pill"
                  placeholder="Write a comment..."
                />
              </form>
            </div>
          </div>
        </div>
        </div>
      </div> `;
      }
    })
    // let counter =
    // let title = "";
    // let body = "";
    // let tags = "";
    // let media = "";
    // let created = "";
    // let author = "";
    // let avatar = "";
    // let id = "";
    // entries.forEach((entry) => {
    //   if (entry.id == "3558") {
    //     title = entry.title;
    //     body = entry.body;
    //     tags = entry.tags;
    //     media = entry.media;
    //     created = entry.created;
    //     author = entry.author.name;
    //     avatar = entry.author.avatar;
    //     id = entry.id;
    //     if (avatar == "") {
    //       avatar =
    //         "https://images.unsplash.com/photo-1627373574917-572a86881d73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80";
    //     }
    //   }
    // });
    .catch((error) => {
      console.log(error);
    });
}
