import { redirectToLogin } from "../shared/redirect.mjs";
import { remove } from "../shared/storage.mjs";

export function clearTokenAndLogout() {
  remove("token");
  remove("profile");
  redirectToLogin();
}
