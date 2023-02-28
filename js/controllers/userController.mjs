import { API_SOCIAL_URL } from "../shared/constants.mjs";
import { save, remove } from "../shared/storage.mjs";
import { fetchRequestWithoutToken } from "../shared/api.mjs";

export async function register(profile) {
  const apiEndpoint = API_SOCIAL_URL + "/auth/register";
  const apiMethod = "POST";
  const apiBody = JSON.stringify(profile);

  const response = await fetchRequestWithoutToken(
    apiEndpoint,
    apiMethod,
    apiBody
  );

  if (!response.ok) {
    throw new Error(`Invalid user input: Http Status ${response.status}`);
  }

  return await response.json();
}

export async function login(profile) {
  const apiEndpoint = API_SOCIAL_URL + "/auth/login";
  const apiMethod = "POST";
  const apiBody = JSON.stringify(profile);

  const response = await fetchRequestWithoutToken(
    apiEndpoint,
    apiMethod,
    apiBody
  );

  if (!response.ok) {
    throw new Error(`Invalid user: Http Status ${response.status}`);
  }

  const { accessToken, ...user } = await response.json();

  save("token", accessToken);
  save("profile", user);

  // const userName = profile.name;
  // const userOwner = document.querySelector(".user-owner");
  // userOwner.innerHTML += `${userName}`;
}

export async function logout() {
  remove("token");
  remove("profile");
}
