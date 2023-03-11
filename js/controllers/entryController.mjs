import { API_SOCIAL_URL, API_EXTRA_DATA } from "../shared/constants.mjs";
import { fetchRequestWithToken } from "../shared/api.mjs";

/**
 * Gets all entries by using a GET api request
 * @returns {Promise} Response data from api
 */
export async function getEntries() {
  const apiEndpoint = `${API_SOCIAL_URL}/posts${API_EXTRA_DATA}`;
  const apiMethod = "GET";
  const apiBody = "";

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid endpoint: Http Status ${response.status}`);
  }

  return await response.json();
}

/**
 * Gets a specific entry by using a GET api request
 * @param {number} id Entry id
 * @returns {Promise} Response data from api
 */
export async function getEntry(id) {
  const apiEndpoint = `${API_SOCIAL_URL}/posts/${id}${API_EXTRA_DATA}`;
  const apiMethod = "GET";
  const apiBody = "";

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid entry id: Http Status ${response.status}`);
  }

  return await response.json();
}

/**
 * Creates an entry by using a POST api request
 * @param {object} body Entry body
 * @returns {Promise} Response data from api
 */
export async function createEntry(body) {
  const apiEndpoint = `${API_SOCIAL_URL}/posts`;
  const apiMethod = "POST";
  const apiBody = JSON.stringify(body);

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid input data: Http Status ${response.status}`);
  }

  return await response.json();
}

/**
 * Updates a specific entry by using a PUT api request
 * @param {number} id Entry id
 * @param {object} body Entry body
 * @returns {Promise} Response data from api
 */
export async function updateEntry(id, body) {
  const apiEndpoint = `${API_SOCIAL_URL}/posts/${id}`;
  const apiMethod = "PUT";
  const apiBody = JSON.stringify(body);

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid input data: Http Status ${response.status}`);
  }

  return await response.json();
}

/**
 * Removes a specific entry by using a DELETE api request
 * @param {number} id Entry id
 * @returns {Promise} Response data from api
 */
export async function removeEntry(id) {
  const apiEndpoint = `${API_SOCIAL_URL}/posts/${id}`;
  const apiMethod = "DELETE";
  const apiBody = "";

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid entry id: Http Status ${response.status}`);
  }

  return await response.json();
}

/**
 * Adds a reaction emoji to a specific entry by using a PUT api request
 * @param {number} id Entry id
 * @param {string} emoji Entry emoji
 * @returns {Promise} Response data from api
 */
export async function reactToEntry(id, emoji) {
  const apiEndpoint = `${API_SOCIAL_URL}/posts/${id}/react/${emoji}`;
  const apiMethod = "PUT";
  const apiBody = "";

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid entry id: Http Status ${response.status}`);
  }

  return await response.json();
}

/**
 * Adds a comment to a specific entry by using a POST api request
 * @param {number} id Entry id
 * @param {object} body Entry body
 * @returns {Promise} Response data from api
 */
export async function commentOnEntry(id, body) {
  const apiEndpoint = `${API_SOCIAL_URL}/posts/${id}/comment`;
  const apiMethod = "POST";
  const apiBody = JSON.stringify(body);

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid entry id: Http Status ${response.status}`);
  }

  return await response.json();
}
