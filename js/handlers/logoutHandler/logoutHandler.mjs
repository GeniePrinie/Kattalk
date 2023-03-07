import { redirectToLogin } from "../../shared/redirect.mjs";
import { remove } from "../../shared/storage.mjs";

/**
 * Clear local storage and redirect to login page
 */
export function clearTokenAndLogout() {
  remove("token");
  remove("profile");
  redirectToLogin();
}
