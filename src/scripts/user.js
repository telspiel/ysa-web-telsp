import Cookie from "./cookie";

class User {
  constructor() {
    this.name = Cookie.get("webToolUser");
    this.token = Cookie.get("tokenWebTool");
    this.shortUrlVisual = Cookie.get("shortUrlVisual");
    this.lastLoginTime = Cookie.get("lastLoginTime");
    this.lastLoginIp = Cookie.get("lastLoginIp");
    this.userPrivilage = Cookie.get("webtoolUserPrivilage");
    this.userId = Cookie.get("webtoolUserId");
    this.jwtToken = Cookie.get("webtoolJWT");
  }

  getName() {
    return this.name;
  }

  getToken() {
    return this.token;
  }

  getJWTToken() {
    return this.jwtToken;
  }

  getUserPrivilage() {
    return this.userPrivilage;
  }

  getUserId() {
    return this.userId;
  }

  getShortUrlVisual() {
    return this.shortUrlVisual;
  }
  getLastLoginTime() {
    return this.lastLoginTime;
  }
  getLastLoginIp() {
    return this.lastLoginIp;
  }

  setLastLoginTime(lastLoginTime) {
    this.lastLoginTime = lastLoginTime;
    Cookie.set("lastLoginTime", lastLoginTime, 7);
    return this;
  }
  setLastLoginIp(lastLoginIp) {
    this.lastLoginIp = lastLoginIp;
    Cookie.set("lastLoginIp", lastLoginIp, 7);
    return this;
  }
  setName(name) {
    this.name = name;
    Cookie.set("webToolUser", name, 7);
    return this;
  }
  setJWTToken(jwt) {
    this.jwtToken = jwt;
    Cookie.set("webtoolJWT", jwt, 7);
    return this;
  }
  setUserId(id) {
    this.userId = id;
    Cookie.set("webtoolUserId", id, 7);
    return this;
  }
  setToken(token) {
    this.token = token;
    Cookie.set("tokenWebTool", token, 7);
    return this;
  }

  updateTokenExpiry() {
    var dt = new Date();
    dt.setTime(dt.getTime() + 10 * 60 * 1000);
    // expirt time set to 30 seconds
    Cookie.set("tokenWebToolExpiry", dt, 7)
  }

  setShortUrlVisual(shortUrlVisual) {
    this.shortUrlVisual = shortUrlVisual;
    Cookie.set("shortUrlVisual", shortUrlVisual, 7);
    return this;
  }

  setUserPrivilage(userPrivilage) {
    this.userPrivilage = userPrivilage;
    Cookie.set("webtoolUserPrivilage", userPrivilage, 7);
    return this;
  }

  isLoggedIn() {
    return this.getToken() ? true : false;
  }

  login() {
    this.isLoggedIn() && (window.location.href = "/dashboard");
    return this;
  }

  logout() {
    this.name = "";
    this.token = "";
    Cookie.del("name");
    Cookie.del("tokenWebTool");
    Cookie.del("shortUrlVisual");
    Cookie.del("lastLoginTime");
    Cookie.del("lastLoginIp");
    Cookie.del("webtoolUserPrivilage");
    Cookie.del("webtoolUserId");
    Cookie.del("webtoolJWT");
    return this;
  }
}

export default new User();
