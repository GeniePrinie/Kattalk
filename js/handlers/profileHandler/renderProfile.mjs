import { isValidUrl } from "../../shared/validURL.mjs";
import { DEFAULT_AVATAR, DEFAULT_BANNER } from "../../shared/constants.mjs";

/**
 * Renders out a user profile to the html page
 * @param {object} profile User profile
 */
export function renderProfile(profile) {
  const displayAccount = document.querySelector(".display-account");

  const profilePhoto = getProfileHeader(profile.name, profile.avatar);
  const profileUserInfo = getProfileUserInfo(profile.name, profile.email);
  const profileBanner = getProfileBanner(profile.banner);

  displayAccount.innerHTML = `
    ${profilePhoto}
    ${profileUserInfo}
    ${profileBanner}
 `;
}

/**
 * Creates the user profile header as html code
 * @param {string} name Name of user
 * @param {string} avatar Avatar of user
 * @returns {string} User profile header section
 */
function getProfileHeader(name, avatar) {
  const avatarImage = isValidUrl(avatar) ? avatar : DEFAULT_AVATAR;

  return `
    <div>
        <div class="card shadow-sm bg-white border-0 mt-1 rounded-0">
            <div class="card-body">
                <img
                src="${avatarImage}"
                alt="${name}"
                class="img-profile d-block ms-auto me-auto"
                />
                <h1 class="my-2 text-center user-owner">${name}</h1>
            </div>
        </div>
    </div>`;
}

/**
 * Creates the user profile info as html code
 * @param {string} name Name of user
 * @param {string} email Email of user
 * @returns {string} User profile info section
 */
function getProfileUserInfo(name, email) {
  return `
    <div class="container mt-5 px-4 d-flex justify-content-center">
        <div class="card card-custom mt-4 shadow-sm bg-white border-0">
            <div class="card-body">
                <h2 class="card-title fs-4">Info</h2>
                <div class="card-text">
                Name: ${name}
                <br />
                Email: ${email}
                <br />
                </div>
            </div>
        </div>
    </div>`;
}

/**
 * Creates the user profile banner as html code
 * @param {string} banner Banner of user
 * @returns {string} User profile banner section
 */
function getProfileBanner(banner) {
  const bannerImage = isValidUrl(banner) ? banner : DEFAULT_BANNER;

  return `
    <style>
        main {
            background-image: url("${bannerImage}");
        }
    </style>`;
}
