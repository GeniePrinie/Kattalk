import { redirectToLogin } from "../globals/redirect.mjs";
import { remove } from "../globals/storage.mjs";

export function setLogoutFormListener() {
  remove("token");
  remove("profile");
  redirectToLogin();
}
