import { setRegisterFormListener } from "./handlers/registerForm.mjs";
import { setLoginFormListener } from "./handlers/loginForm.mjs";
import { setLogoutFormListener } from "./handlers/logoutForm.mjs";
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
    setLogoutFormListener();
    break;

  case "/html/user/profile/":
    console.log("user/profile/");
    break;

  default:
    break;
}

// createEntry({
//   title: "dont delete me pls",
//   body: "Lots of text",
//   tags: ["winning"],
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
