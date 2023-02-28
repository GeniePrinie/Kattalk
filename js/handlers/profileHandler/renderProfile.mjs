import { isValidUrl } from "../../shared/validURL.mjs";
import { DEFAULT_AVATAR, DEFAULT_BANNER } from "../../shared/constants.mjs";

const displayAccount = document.querySelector(".display-account");

export function renderProfile(profile) {
  const profilePhoto = getProfilePhoto(profile.name, profile.avatar);
  const profileUserInfo = getProfileUserInfo(profile.name, profile.email);
  const profileBanner = getProfileBanner(profile.banner);

  displayAccount.innerHTML = `
    ${profilePhoto}
    ${profileUserInfo}
    ${profileBanner}
 `;
}

function getProfilePhoto(name, avatar) {
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

function getProfileBanner(banner) {
  const bannerImage = isValidUrl(banner) ? banner : DEFAULT_BANNER;

  return `
    <style>
        main {
            background-image: url("${bannerImage}");
        }
    </style>`;
}
