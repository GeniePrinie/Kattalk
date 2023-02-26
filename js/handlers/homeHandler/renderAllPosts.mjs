import { renderPost } from "../renderPost.mjs";

export function renderAllPosts(post) {
  renderPost(post, ".api-entries");
}

// const apiEntries = document.querySelector(".api-entries");

// export function renderPosts(post) {
//   apiEntries.innerHTML += `
//     <div class="container d-flex justify-content-center">
//         <div class="card card-custom mt-4 shadow-sm bg-white border-0">
//             <div class="card-body pb-0">
//                 <div class="row">
//                     <img class="col-2 col-sm-2 rounded img-user m-0 mb-3" src="${avatar}" alt="${author}"/>
//                     <a href="/html/post/?id=${id}" class="card-title col m-0 pt-3 text-decoration-none text-black">
//                         <h2 class="fs-5">${title} <small><em>written by</em> ${author}</small></h2>
//                     </a>
//                     <ul class="navbar-nav mr-auto col-1 text-end">
//                         <li class="nav-item dropdown">
//                             <a href="#" class="nav-link pt-0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                 <i class="fa-solid fa-ellipsis-vertical"></i>
//                             </a>
//                             <div class="dropdown-menu dots-edit" aria-labelledby="navbarDropdown">
//                                 <button class="dropdown-item">Edit</button>
//                                 <div class="dropdown-divider"></div>
//                                 <button class="dropdown-item">Delete</button>
//                             </div>
//                         </li>
//                     </ul>
//                     <div class="d-flex justify-content-between">
//                         <em class="fs-6"><small>${tags}</small></em>
//                         <small>${created}</small>
//                     </div>
//                     <img src="${media}" alt="${media}" class="card-img mt-4"/>
//                     <div class="card-text pt-3">${body}</div>
//                     <div class="d-flex justify-content-center border-top border-bottom mt-3">
//                         <div class="m-1 col-6 align-self-center">
//                             <i class="fa-regular fa-heart me-2"></i>${countReactions} Reaction(s)
//                         </div>
//                         <div class="m-1 col-6 align-self-center" >
//                             <i class="fa-regular fa-comment me-2"></i>${countComments} Comment(s)
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div> `;
// }
