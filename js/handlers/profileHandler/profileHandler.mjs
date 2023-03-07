import { load } from "../../shared/storage.mjs";
import { renderProfile } from "./renderProfile.mjs";

/**
 * Display profile of the logged in user
 */
export function displayProfile() {
  const profile = load("profile");

  renderProfile(profile);
}
