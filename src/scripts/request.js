import Loader from "./loader";
import Cookie from "./cookie";
import User from "./user";

export default (Request = (url, method, data, options = {}) => {

  if (typeof url !== "string") {
    return false;
  }

  var tokenExpiry = Date.parse(Cookie.get("tokenWebToolExpiry"));
  var currentDate = new Date();
  if (currentDate < tokenExpiry) {
    User.updateTokenExpiry();
  } else {
    if (Cookie.get("tokenWebTool")) {
      User.logout();
      window.location.href = "/login"
    }
  }

  let basicParams = {
    url: url,
    method: method || "POST",
    data: typeof data === "object" && JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    crossDomain: true,
    cache: false,
    headers: {
      "Authorization": Cookie.get("webtoolJWT")
    },
    options,
    statusCode: {
      401: function (xhr) {
        User.logout();
        window.location.href = "/login"
      }
    }
  }

  let multipartParams = {
    data: data,
    contentType: false,
    processData: false,
  }

  let params = basicParams;
  let processData = typeof options.processData;
  if (processData !== 'undefined') {
    params = Object.assign({}, basicParams, multipartParams);
  }

  options.showMainLoader && Loader.showMainLoader();
  return $.ajax(
    $.extend(
      {}, params
    )
  )
    .done((data, textStatus, jqXHR) => {
      window.app.requests.push({
        success: true,
        response: data,
        xhr: jqXHR
      });
    })
    .fail((jqXHR, textStatus, errorThrown) => {
      window.app.requests.push({
        success: false,
        response: errorThrown,
        xhr: jqXHR
      });
    })
    .always(() => {
      Loader.hideMainLoader();
    });
});
