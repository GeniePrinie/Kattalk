import { API_SOCIAL_URL } from "../shared/constants.mjs";
import { save, remove } from "../shared/storage.mjs";
import { fetchRequestWithoutToken } from "../shared/api.mjs";

/**
 * Creates a new user by using a POST api request
 * @param {object} profile User profile
 * @returns {Promise} Response data from api
 */
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

/**
 * Gets a bearer token by using a POST api request and saves it in local storage
 * @param {object} profile User profile
 */
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

/**
 * Clears the local storage of bearer token and user profile
 */
export async function logout() {
  remove("token");
  remove("profile");
}
