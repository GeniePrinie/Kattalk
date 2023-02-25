import { API_SOCIAL_URL, API_EXTRA_DATA } from "../globals/constants.mjs";
import { fetchRequestWithToken } from "../globals/api.mjs";

export async function getEntries() {
  const apiEndpoint = `${API_SOCIAL_URL}/posts`;
  const apiMethod = "GET";
  const apiBody = "";

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid endpoint: Http Status ${response.status}`);
  }

  return await response.json();
}

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

export async function createEntry(data) {
  const apiEndpoint = `${API_SOCIAL_URL}/posts`;
  const apiMethod = "POST";
  const apiBody = JSON.stringify(data);

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid input data: Http Status ${response.status}`);
  }

  return await response.json();
}

export async function updateEntry(id, data) {
  const apiEndpoint = `${API_SOCIAL_URL}/posts/${id}`;
  const apiMethod = "PUT";
  const apiBody = JSON.stringify(data);

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid input data: Http Status ${response.status}`);
  }

  return await response.json();
}

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

export async function commentOnEntry(id, data) {
  const apiEndpoint = `${API_SOCIAL_URL}/posts/${id}/comment`;
  const apiMethod = "POST";
  const apiBody = JSON.stringify(data);

  const response = await fetchRequestWithToken(apiEndpoint, apiMethod, apiBody);

  if (!response.ok) {
    throw new Error(`Invalid entry id: Http Status ${response.status}`);
  }

  return await response.json();
}
