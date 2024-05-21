import "./../../scripts/app";
import "./styles";

import User from "./../../scripts/user";
import Request from "./../../scripts/request";
import Endpoints from "./../../../config/endpoints";
import Cookie from "../../scripts/cookie";


console.log("Welcome to login page!");


$(document).ready(function () {
  $('.content').css('display','block');
});



$(document).ready(function() {
  let clause = window.innerWidth < 768;
  config.particles.number.value = clause ? 80 : 150;
  particlesJS("particle", config);
 })

var config = {
  particles: {
      number: {
          value: 50,
          density: {
              enable: true,
              value_area: 9234,
          },
      },
      color: {
          value: ["#FF6F91", "#fffe4f", "#D65DB1","#433E94"],
      },
      shape: {
          type: ["circle","triangle","edge","image"],
          stroke: {
              width: 0,
              color: "#000000",
          },
          polygon: {
              nb_sides: 12,
          },
          image: {
              src: "images/Telspiel Logo_Icon PNG.png" ,
              width: 2314,
              height: 2314,
          },
      },
      opacity: {
          value: 1,
          random: true,
          anim: {
              enable: true,
              speed: 1,
              opacity_min: 0,
              sync: false,
          },
      },
      size: {
          value: 30,
          random: true,
          anim: {
              enable: true,
              speed: 3,
              size_min: 0.3,
              sync: false,
          },
      },
      line_linked: {
          enable: true,
          distance: 200,
          color: "#800080",
          opacity: 0.4,
          width: 1,
      },
      move: {
          enable: true,
          speed: 1.3,
          direction: "top",
          random: true,
          straight: true,
          out_mode: "out",
          bounce: false,
          attract: {
              enable: true,
              rotateX: 2082.2488,
              rotateY: 3363.6328,
          },
      },
  },
  interactivity: {
      detect_on: "canvas",
      events: {
          onhover: {
              enable: true,
              mode: "repulse",
          },
          onclick: {
              enable: true,
              mode: "push",
          },
          resize: true,
      },
      modes: {
          grab: {
              distance: 70,
              line_linked: {
                  opacity: 0.25,
              },
          },
          bubble: {
              distance: 100,
              size: 5,
              duration: 8.598243,
              opacity: 0,
              speed: 3,
          },
          repulse: {
              distance: 150,
              duration: 0.8,
          },
          push: {
              particles_nb: 3,
              
          },
          remove: {
              particles_nb: 2,
          },
      },
  },
  retina_detect: true,
};



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
        // print all keys in data
       // console.log(Object.keys(data.data));
        if (Endpoints.validateResponse(data)) {
          
          // const userData = data.data || {};
          // console.log(JSON.stringify(userData));
          if (data.otpRequired) {
            $(".otp-wrapper").removeClass('d-none');
            $(".login-text").addClass('d-none');
            $(".user-verify-btn").addClass('d-none');
            $(".login-btn").addClass('d-none');
            $(".logo-type").css('margin-top','120px');
            $(".form-control-sm").addClass('d-none');
            $(".toggle-password").addClass('d-none');
            $(".remember-me").addClass('d-none');

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
} else {
      $('.otp-number-input').val('');
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


// login animation -------------------------------------------------------------------------------------------------

// function([string1, string2],target id,[color1,color2])    
// consoleText(['END TO END ENCRYPTION', 'DLT FRIENDLY', 'INTELLIGENT ROUTING', 'API COMPATIBILITY', 'TRANSPARENCY' , 'ANALYTICS' , 'TRACKING', 'INSIGHTS', 'SEGMENTATION'], 'text',['tomato','rebeccapurple','lightblue']);

// function consoleText(words, id, colors) {
//   if (colors === undefined) colors = ['#fff'];
//   var visible = true;
//   var con = document.getElementById('console');
//   var letterCount = 1;
//   var x = 1;
//   var waiting = false;
//   var target = document.getElementById(id)
//   target.setAttribute('style', 'color:' + colors[0])
//   window.setInterval(function() {

//     if (letterCount === 0 && waiting === false) {
//       waiting = true;
//       target.innerHTML = words[0].substring(0, letterCount)
//       window.setTimeout(function() {
//         var usedColor = colors.shift();
//         colors.push(usedColor);
//         var usedWord = words.shift();
//         words.push(usedWord);
//         x = 1;
//         target.setAttribute('style', 'color:' + colors[0])
//         letterCount += x;
//         waiting = false;
//       }, 1000)
//     } else if (letterCount === words[0].length + 1 && waiting === false) {
//       waiting = true;
//       window.setTimeout(function() {
//         x = -1;
//         letterCount += x;
//         waiting = false;
//       }, 1000)
//     } else if (waiting === false) {
//       target.innerHTML = words[0].substring(0, letterCount)
//       letterCount += x;
//     }
//   }, 120)
//   window.setInterval(function() {
//     if (visible === true) {
//       con.className = 'console-underscore hidden'
//       visible = false;

//     } else {
//       con.className = 'console-underscore'

//       visible = true;
//     }
//   }, 400)
// }
