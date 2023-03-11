import { load } from "../shared/storage.mjs";

/**
 * Executes a fetch request without token based of parameter info
 * @param {string} url Fetch URL
 * @param {string} method Fetch method
 * @param {string} body Fetch body
 * @returns {Promise} Response data from api request
 */
export async function fetchRequestWithoutToken(url, method, body) {
  return await fetch(url, {
    method: method,
    body: body,
    headers: {
      "Content-type": "application/json",
    },
  });
}

/**
 * Executes a fetch request with token based of parameter info
 * @param {string} url Fetch URL
 * @param {string} method Fetch method
 * @param {string} body Fetch body
 * @returns {Promise} Response data from api request
 */
export async function fetchRequestWithToken(url, method, body) {
  const token = load("token");
  let options = {
    method: method,
    body: body,
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
  };

  if (body === "") {
    options = {
      method: method,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  }

  return await fetch(url, options);
}
