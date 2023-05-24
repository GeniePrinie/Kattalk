import { Pages } from "./shared/pages.mjs";

import {
  deleteEntry,
  displayEntry,
  displayEditEntry,
  setEditFormListener,
  checkIfLoggedIn,
  displayPostEntry,
  displayEntries,
  setCreateFormListener,
  checkIfLoggedOut,
  setLoginFormListener,
  clearTokenAndLogout,
  displayProfile,
  setRegisterFormListener,
} from "./handlers/index.mjs";

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
