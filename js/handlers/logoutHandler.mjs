import { redirectToLogin } from "../globals/redirect.mjs";
import { remove } from "../globals/storage.mjs";

export function clearTokenAndLogout() {
  remove("token");
  remove("profile");
  redirectToLogin();
}
