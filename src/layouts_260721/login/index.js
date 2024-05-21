import "./../../scripts/app";
import "./styles";

import User from "./../../scripts/user";
import Request from "./../../scripts/request";
import Endpoints from "./../../../config/endpoints";
import Cookie from "../../scripts/cookie";

console.log("Welcome to login!");

User.logout();

$(function () {

  $("#userId").val(Cookie.get("WTWPKEY"));
  $("#userPass").val(Cookie.get("WTWPVAL"));
  console.log(typeof Cookie.get("WTWPKEY"));
  console.log(Cookie.get("WTWPVAL"));
  if (Cookie.get("WTWPKEY") && Cookie.get("WTWPVAL")) {
    $("#rememberMe").prop("checked", true);
  }

  $("#login-btn").click(function (e) {
    e.preventDefault();
    const params = {
      username: $("#userId").val(),
      password: $("#userPass").val(),
      appName: "web-tool"
    };

    if (params.username && params.password) {
      Request(Endpoints.get("login"), "POST", params).done(data => {
        console.log(data);
        if (Endpoints.validateResponse(data)) {
          // const userData = data.data || {};
          // console.log(JSON.stringify(userData));
          if (data.otpRequired) {
            $(".otp-wrapper").removeClass('d-none');
            $(".user-verify-btn").addClass('d-none');
          } else {
            proceedWithLoggedinuser(data, params);
          }
        }
      });
    } else {
      alert("Enter both username and password!");
    }
  });
});

$(".toggle-password").click(function() {

  $(this).toggleClass("icon-eye icon-eye-off");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});

$(".otp-submit").on('click', function (e) {
  e.preventDefault();
  const params = {
    username: $("#userId").val(),
    password: $("#userPass").val(),
    userOtp: otpCodeTemp
  };

  Request(Endpoints.get("verifyOtp"), "POST", params).done(data => {
    if (Endpoints.validateResponse(data)) {
      if (data.code == 1000) {
        proceedWithLoggedinuser(data, params);
      } else {
        alert("Invalid OTP");
      }

    }
  });
});

$("#resend-otp").on('click', function () {
  const params = {
    username: $("#userId").val(),
    password: $("#userPass").val()
  };

  if (params.username && params.password) {
    Request(Endpoints.get("login"), "POST", params).done(data => {
      if (Endpoints.validateResponse(data)) {
        // const userData = data.data || {};
        if (data.code == 1000) {
          proceedWithLoggedinuser(data, params);
        }
      }
    });
  } else {
    alert("Enter both username and password!");
  }
})


function proceedWithLoggedinuser(data, params) {
  let userData = data.data;
  let visual = true;
  if (userData.isVisualizeAllowed == "Y") {
    visual = true;
  } else {
    visual = false;
  }

  let rememberMe = $('#rememberMe').is(":checked");
  if (rememberMe) {
    Cookie.set("WTWPKEY", params.username);
    Cookie.set("WTWPVAL", params.password);
  } else {
    Cookie.del("WTWPKEY");
    Cookie.del("WTWPVAL");
  }

  User.setName(userData.username)
    .setToken(userData.authToken)
    .setLastLoginTime(userData.lastLoginTime)
    .setLastLoginIp(userData.lastLoginIp)
    .setShortUrlVisual(visual)
    .setUserPrivilage(userData.userPrivileges)
    .setUserId(userData.userId)
    .setJWTToken(data.authJwtToken)
    .login(userData);
  User.updateTokenExpiry();
}

/* Secure Password Field */
window.onload = function () {
  init();
}
function init() {
  var x = document.getElementsByTagName("input")["Password"];
  var style = window.getComputedStyle(x);
  console.log(style);

  if (style.webkitTextSecurity) {
  } else {
    x.setAttribute("type", "password");
  }
}
/* CodeEnds Herer */

/* OTP style code here */
var otpCodeTemp = "";
$(document).ready(function () {
  $('.otp-event').each(function () {
    var $input = $(this).find('.otp-number-input');
    var $submit = $(this).find('.otp-submit');
    $input.keydown(function (ev) {
      var otp_val = $(this).val();
      if (ev.keyCode == 37) {
        $(this).prev().focus();
        ev.preventDefault();
      } else if (ev.keyCode == 39) {
        $(this).next().focus();
        ev.preventDefault();
      } else if (otp_val.length == 1 && ev.keyCode != 8 && ev.keyCode != 46) {
        var otp_next_number = $(this).next();
        if (otp_next_number.length == 1 && otp_next_number.val().length == 0) {
          otp_next_number.focus();
        }
      } else if (otp_val.length == 0 && ev.keyCode == 8) {
        $(this).prev().val("");
        $(this).prev().focus();
      } else if (otp_val.length == 1 && ev.keyCode == 8) {
        $(this).val("");
      } else if (otp_val.length == 0 && ev.keyCode == 46) {
        next_input = $(this).next();
        next_input.val("");
        while (next_input.next().length > 0) {
          next_input.val(next_input.next().val());
          next_input = next_input.next();
          if (next_input.next().length == 0) {
            next_input.val("");
            break;
          }
        }
      }

    }).focus(function () {
      $(this).select();
      var otp_val = $(this).prev().val();
      if (otp_val === "") {
        $(this).prev().focus();
      } else if ($(this).next().val()) {
        $(this).next().focus();
      }
    }).keyup(function (ev) {
      otpCodeTemp = "";
      $input.each(function (i) {
        if ($(this).val().length != 0) {
          $(this).addClass('otp-filled-active');
        } else {
          $(this).removeClass('otp-filled-active');
        }
        otpCodeTemp += $(this).val();
      });
      if ($(this).val().length == 1 && ev.keyCode != 37 && ev.keyCode != 39) {
        $(this).next().focus();
        ev.preventDefault();
      }
      $input.each(function (i) {
        if ($(this).val() != '') {
          $submit.prop('disabled', false);
        } else {
          $submit.prop('disabled', true);
        }
      });

    });
    $input.on("cut copy paste", function (e) {
      e.preventDefault();
    });
  });

});

/* Code Ends here */