import { load } from "../../shared/storage.mjs";
import { renderProfile } from "./renderProfile.mjs";

export function displayProfile() {
  const profile = load("profile");

  renderProfile(profile);
}
