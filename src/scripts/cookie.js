const Cookie = {
  get: (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return null;
  },
  set: (cname, cvalue, exdays) => {
    var dt = new Date();
    dt.setTime(dt.getTime() + (exdays || 36500) * 24 * 60 * 60 * 1000);
    document.cookie =
      cname + "=" + cvalue + "; expires=" + dt.toUTCString() + "; path=/";
    return cvalue;
  },
  del: (cname) => {
    var dt = new Date();
    dt.setTime(dt.getTime() - 24 * 60 * 60 * 1000);
    document.cookie = cname + "=0; expires=" + dt.toUTCString() + "; path=/";
    return true;
  }
};

export default Cookie;
