//place in this <div class="display-account"></div>

//  name, email, banner, avatar

// ${accountOwnerName}
// ${accountOwnerEmail}
// ${accountOwnerBanner}
// ${accountOwnerAvatar}

<div>
  <div class="card shadow-sm bg-white border-0 mt-1 rounded-0">
    <div class="card-body">
      <img
        src="${accountOwnerAvatar}"
        alt="${accountOwnerName}"
        class="rounded-circle img-profile d-block ms-auto me-auto"
      />
      <h1 class="my-2 text-center user-owner">${accountOwnerName}</h1>
    </div>
  </div>
</div>;

//bio
<div class="container mt-5 px-4 d-flex justify-content-center">
  <div class="card card-custom mt-4 shadow-sm bg-white border-0">
    <div class="card-body">
      <h2 class="card-title fs-4">Info</h2>
      <div class="card-text">
        Name: ${accountOwnerName}
        <br />
        Email: ${accountOwnerEmail}
        <br />
      </div>
    </div>
  </div>
</div>;

// background img
{
  /* <style>
    main {
        background-image: url("${accountOwnerBanner}");
    }
</style> */
}
