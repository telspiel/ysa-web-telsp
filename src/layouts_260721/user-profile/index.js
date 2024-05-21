import "./../../scripts/app";
import "./styles";
import Form from "./../../scripts/profileForm";
import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import ViewUser from "./../../scripts/userProfile";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

console.log("Welcome to User-Profile");


if (!User.isLoggedIn()) {
  window.location.href = "/login";
}
//

//
$(document).ready(function() {
  $('#newPassword').keyup(function() {
    var pswd = $(this).val();
    if(/^[a-zA-Z0-9- ]*$/.test(pswd) == false) {
        $('#specialChar').removeClass('invalid').addClass('valid');
      $('#specialChar .fa').removeClass('fa-times').addClass('fa-check');
  }
  else {
    $('#specialChar').removeClass('valid').addClass('invalid');
    $('#specialChar .fa').removeClass('fa-check').addClass('fa-times');
  }
    if ( pswd.length < 8 ) {
    $('#length').removeClass('valid').addClass('invalid');
    $('#length .fa').removeClass('fa-check').addClass('fa-times');
    } else {
        $('#length').removeClass('invalid').addClass('valid');
        $('#length .fa').removeClass('fa-times').addClass('fa-check');
    }
    //validate letter
if ( pswd.match(/[A-z]/) ) {
    $('#letter').removeClass('invalid').addClass('valid');
    $('#letter .fa').removeClass('fa-times').addClass('fa-check');
} else {
    $('#letter').removeClass('valid').addClass('invalid');
    $('#letter .fa').removeClass('fa-check').addClass('fa-times');
}

//validate capital letter
if ( pswd.match(/[A-Z]/) ) {
    $('#capital').removeClass('invalid').addClass('valid');
      $('#capital .fa').removeClass('fa-times').addClass('fa-check');
} else {
    $('#capital').removeClass('valid').addClass('invalid');
    $('#capital .fa').removeClass('fa-check').addClass('fa-times');
}

//validate number
if ( pswd.match(/\d/) ) {
    $('#number').removeClass('invalid').addClass('valid');
  $('#number .fa').removeClass('fa-times').addClass('fa-check');
} else {
    $('#number').removeClass('valid').addClass('invalid');
    $('#number .fa').removeClass('fa-check').addClass('fa-times');
}
  }).focus(function() {
      $('#pswd_info').show();
  }).blur(function() {
      $('#pswd_info').hide();
  });

});
$("#controls-form").submit(function(e){
var newpass =$('#newPassword').val();
var confpass =$('#confirmPassword').val();
  if(newpass != confpass){
    confirm("Please make sure your passwords match");
    return;
  }
  e.preventDefault();
  const data = {
    loggedInUserName: User.getName(),
    oldPassword: this[0].value,
    newPassword: this[1].value
  };
  Request(Endpoints.get("updatedPassword"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    Alert.clearAll();
    data.message &&
    (data.result === "Success"
      ? Alert.success(data.message, {
        clearTime: 10 * 1000
      })
      : Alert.error(data.message, {
        clearTime: 10 * 1000
      }));
  });
});
// user Profile
const data = {
  loggedInUserName:User.getName(),
};
Request(Endpoints.get("profileDetails"), "POST", data).done(data => {
  if (Endpoints.validateResponse(data)) {
    console.log(data);
    const user = data.data.user;
      const viewuser = $.extend(true, {}, ViewUser);
    viewuser.fields.forEach((field) => {
      field.value = user[field.name];
      field.disabled = true;
    });
    new Form(viewuser).render("#view-user-form");

  }
});
