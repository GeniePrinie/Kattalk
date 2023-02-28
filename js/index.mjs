import { Pages } from "./shared/pages.mjs";
import {
  checkIfLoggedIn,
  displayEntries,
  displayPostEntry,
  setCreateFormListener,
} from "./handlers/homeHandler/homeHandler.mjs";
import {
  checkIfLoggedOut,
  setLoginFormListener,
} from "./handlers/loginHandler/loginHandler.mjs";
import { clearTokenAndLogout } from "./handlers/logoutHandler/logoutHandler.mjs";
import { setRegisterFormListener } from "./handlers/registerHandler/registerHandler.mjs";
import { displayProfile } from "./handlers/profileHandler/profileHandler.mjs";
import { displayEntry } from "./handlers/postHandler/postHandler.mjs";
import { editEntry } from "./handlers/editHandler/editHandler.mjs";
import { deleteEntry } from "./handlers/deleteHandler/deleteHandler.mjs";

import {
  getEntry,
  createEntry,
  removeEntry,
  updateEntry,
  reactToEntry,
  commentOnEntry,
} from "../js/controllers/entryController.mjs";

const path = location.pathname;

switch (path) {
  case Pages.Start:
  case Pages.Home:
    checkIfLoggedIn();
    displayPostEntry();
    displayEntries();
    setCreateFormListener();
    break;

  case Pages.Login:
    checkIfLoggedOut();
    setLoginFormListener();
    break;

  case Pages.Logout:
    clearTokenAndLogout();
    break;

  case Pages.Register:
    setRegisterFormListener();
    break;

  case Pages.Profile:
    displayProfile();
    break;

  case Pages.Details:
    displayEntry();
    break;

  case Pages.Details:
    editEntry();
    break;

  case Pages.Delete:
    deleteEntry();
    break;

  default:
    break;
}

// createEntry({
//   title: "W2 pancakes for dinner?",
//   body: "Lots of text about how pancakes are the best, and why you should eat them for dinner everyday",
//   tags: ["hungry", "food", "sweet"],
//   media:
//     "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
// })
//   .then((data) => {
//     console.log(data);
//     console.log(JSON.stringify(data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// getEntry(3519)
//   .then((data) => {
//     console.log(data);
//     console.log(JSON.stringify(data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// updateEntry(3526, {
//   title: "string",
//   body: "string",
//   tags: ["string"],
// })
//   .then((data) => {
//     console.log(data);
//     console.log(JSON.stringify(data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// removeEntry(3741)
//   .then((data) => {
//     console.log(data);
//     console.log(JSON.stringify(data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// reactToEntry(3629, "🥰")
//   .then((data) => {
//     console.log(data);
//     console.log(JSON.stringify(data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// commentOnEntry(3531, {
//   body: "nothing much",
//   replyToId: 1444,
// })
//   .then((data) => {
//     console.log(data);
//     console.log(JSON.stringify(data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });
