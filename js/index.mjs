import { setRegisterFormListener } from "./handlers/registerHandler.mjs";
import { setLoginFormListener } from "./handlers/loginHandler.mjs";
import { clearTokenAndLogout } from "./handlers/logoutHandler.mjs";
import { displayEntries } from "./handlers/homeHandler.mjs";
import { redirectToHome, redirectToLogin } from "./globals/redirect.mjs";
import { load } from "./globals/storage.mjs";
import {
  getEntry,
  createEntry,
  removeEntry,
  updateEntry,
  reactToEntry,
  commentOnEntry,
} from "../js/controllers/entryController.mjs";

const path = location.pathname;
const token = load("token");

switch (path) {
  case "/":
  case "/index.html":
    if (token === null) {
      redirectToLogin();
    }
    displayEntries();
    break;

  case "/html/user/login/":
    if (token !== null) {
      redirectToHome();
    }
    setLoginFormListener();
    break;

  case "/html/user/register/":
    setRegisterFormListener();
    break;

  case "/html/user/logout/":
    clearTokenAndLogout();
    break;

  case "/html/user/profile/":
    console.log("user/profile/");
    break;

  default:
    break;
}

// createEntry({
//   title: "Whant pancakes for dinner?",
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

// removeEntry(3526)
//   .then((data) => {
//     console.log(data);
//     console.log(JSON.stringify(data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// reactToEntry(3527, "🥰")
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
