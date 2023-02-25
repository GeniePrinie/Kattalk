import { load } from "../globals/storage.mjs";

export async function fetchRequestWithoutToken(url, method, body) {
  return await fetch(url, {
    method: method,
    body: body,
    headers: {
      "Content-type": "application/json",
    },
  });
}

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
        "Content-type": "application/json",
      },
    };
  }

  return await fetch(url, options);
}
