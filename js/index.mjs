import { Pages } from "./shared/pages.mjs";
import {
  checkIfLoggedIn,
  displayPostEntry,
  displayEntries,
  setCreateFormListener,
} from "./handlers/homeHandler/homeHandler.mjs";
import {
  checkIfLoggedOut,
  setLoginFormListener,
} from "./handlers/loginHandler/loginHandler.mjs";
import { clearTokenAndLogout } from "./handlers/logoutHandler/logoutHandler.mjs";
import { setRegisterFormListener } from "./handlers/registerHandler/registerHandler.mjs";
import { displayProfile } from "./handlers/profileHandler/profileHandler.mjs";
import { displayEntry } from "./handlers/detailsHandler/detailsHandler.mjs";
import {
  displayEditEntry,
  setEditFormListener,
} from "./handlers/editHandler/editHandler.mjs";
import { deleteEntry } from "./handlers/deleteHandler/deleteHandler.mjs";

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

  case Pages.Edit:
    displayEditEntry().then(() => setEditFormListener());
    break;

  case Pages.Delete:
    deleteEntry();
    break;

  default:
    break;
}
