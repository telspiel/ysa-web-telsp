import "./../styles/app";

import User from "./user";

const loginInfo = require("./../partials/loginInfo.hbs");
const shortUrlNav = require("./../partials/shortUrlNav.hbs");

if (typeof window === "object") {
  let app = (window.app = window.app || {});
  app.store = {};
  app.requests = [];
}

function outsideClick(event, notelem) {
  notelem = $(notelem); // jquerize (optional)
  // check outside click for multiple elements
  var clickedOut = true, i, len = notelem.length;
  for (i = 0; i < len; i++) {
    if (event.target == notelem[i] || notelem[i].contains(event.target)) {
      clickedOut = false;
    }
  }
  if (clickedOut) return true;
  else return false;
}

$(() => {

  if (User.getUserPrivilage() == "SHOW_CREDIT_HISTORY") {
    $("#creditHistory").removeClass("d-none");
  }


  var modal = document.getElementById("avatar-img");
  window.addEventListener('click', function (e) {
    // console.log("click click click")
    if (outsideClick(e, modal)) {
      // close modal
      $(".profile-options").addClass("d-none");
    }else{
      $(".profile-options").toggleClass("d-none");
    }
  });

  // window.addEventListener('click', function (e) {
  //   if (document.getElementById('avatar-img').contains(e.target)) {
  //     $(".profile-options").toggleClass("d-none");
  //   } else {
  //     $(".profile-options").toggleClass("d-none");
  //   }
  // });

  if (User.isLoggedIn()) {
    // $("#userId").html(User.getUserId());
    $("#topNavList").html(
      loginInfo({
        name: User.getName(),
        shortURL: User.getShortUrlVisual(),
        lastLoginTime: new Date(User.getLastLoginTime()).toUTCString(),
        lastLoginIp: User.getLastLoginIp(),
      })
    );
    if (User.getShortUrlVisual() == "true") {
      console.log(User.getShortUrlVisual());

      //      $("#shortUrlNav").html(
      //        shortUrlNav({
      //          name: User.getName(),
      //          shortURL: User.getShortUrlVisual(),
      //        })
      //      );

    } else {
      $("#shortUrlNav").html("");
    }
  } else {
    console.log("Not logged In");
  }
});
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-5VS8M5W");
