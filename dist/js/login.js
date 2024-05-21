/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"login": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/layouts/login/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/login/styles.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/login/styles.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"\\n\\nbody {\\n  margin: 0;\\n  padding: 0;\\n}\\n\\n#particle {\\n  height: 100vh;\\n  overflow: hidden;\\n  background: #fffefe;\\n  z-index: 0 !important;\\n  background: url('/images/2024-holi.jpg');\\n  background-size: cover;\\n}\\n\\n.logo-type {\\n  font-family: 'Poppins', sans-serif;\\n  letter-spacing: 1px;\\n  font-size: 56px;\\n  position: absolute;\\n  z-index: 1;\\n  top: 5%;\\n  margin-left: auto;\\n  margin-right: auto;\\n  left: 0;\\n  right: 0;\\n  text-align: center;\\n  max-width: 220px;\\n  margin-top: 10px;\\n} \\n\\n.logo:hover{\\n  transform: scale(1.1);\\n} \\n\\n\\n.fa-solid{\\n    background-color: papayawhip;\\n    border-radius: 0.2em;\\n    padding: 0.3em;\\n    animation: rotation 16s infinite linear;\\n  }\\n\\n  @keyframes rotation {\\n    from {\\n      transform: rotate(0deg);\\n    }\\n    to {\\n      transform: rotate(359deg);\\n    }\\n  }  \\n\\n\\n/* \\n.logo-type::before {\\n  content: \\\"HABITIC\\\";\\n  position: absolute;\\n  color: transparent;\\n\\n  margin-left: auto;\\n  margin-right: auto;\\n  left: 0;\\n  right: 0;\\n  text-align: center;\\n\\n  background-image: repeating-linear-gradient(\\n    45deg,\\n    transparent 0,\\n    transparent 2px,\\n    rgb(158, 109, 223) 2px,\\n    rgb(100, 65, 156) 4px\\n    \\n  );\\n  -webkit-background-clip: text;\\n  background-clip: none;\\n  top: 0px;\\n  left: 0;\\n  z-index: -1;\\n  transition: 1s;\\n\\n}\\n\\n.logo-type::after {\\n  content: \\\"HABITIC\\\";\\n  position: absolute;\\n  color: transparent;\\n\\n  margin-left: auto;\\n  margin-right: auto;\\n  left: 0;\\n  right: 0;\\n  text-align: center;\\n\\n  background-image: repeating-linear-gradient(\\n    135deg,\\n    transparent 0,\\n    transparent 2px,\\n    rgb(103, 77, 173) 2px,\\n    rgb(67, 48, 119) 4px\\n  );\\n  -webkit-background-clip: text;\\n  background-clip: none;\\n  top: 0px;\\n  left: 0px;\\n  transition: 1s;\\n}\\n\\n.logo-type:hover:before {\\n  top: 10px;\\n  left: 10px;\\n}\\n\\n.logo-type:hover:after {\\n  top: -10px;\\n  left: -10px;\\n} */ \\n\\n\\n\\n\\n\\n\\n\\n\\n\\n#login-btn {\\n  font-size: 19px;\\n}\\n\\n.field-icon {\\n  float: right;\\n  padding-right: 20px;\\n  margin-left: -25px;\\n  margin-top: -28px;\\n  position: relative;\\n  z-index: 2;\\n}\\n\\na {\\n  color: #101010;\\n}\\n\\np.privacy_terms {\\n  color: #101010;\\n}\\n\\n.otp-wrapper {\\n  text-align: center;\\n  margin-top: 30px;\\n}\\n\\n.otp-container {\\n  display: inline-block;\\n}\\n\\n.otp-number-input {\\n  width: 26px;\\n  height: 33px;\\n  margin: 0 2px;\\n  border: none;\\n  border-bottom: 2px solid rgba(0, 0, 0, 0.2);\\n  padding: 0;\\n  color: rgba(0, 0, 0, 0.7);\\n  margin-bottom: 0;\\n  padding-bottom: 0;\\n  font-size: 30px;\\n  box-shadow: none;\\n  text-align: center;\\n  background-color: none;\\n  font-weight: 600;\\n  border-radius: 0;\\n  outline: 0;\\n  transition: border 0.3s ease;\\n}\\n\\n.otp-number-input:focus {\\n  border-color: rgba(0, 0, 0, 0.5);\\n}\\n\\n.otp-number-input.otp-filled-active {\\n  border-color: #00bb09;\\n}\\n\\n.otp-submit {\\n  background: #42b549;\\n  border: 0;\\n  color: #fff;\\n  margin-top: 30px;\\n  padding: 10px 15px;\\n  font-size: 14px;\\n  border-radius: 3px;\\n  letter-spacing: 1px;\\n  font-weight: 500;\\n  cursor: pointer;\\n\\n}\\n\\n.otp-submit[disabled] {\\n  opacity: 0.6;\\n  cursor: default;\\n}\\n\\n\\n\\n.login-form{\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  flex-direction: column;\\n  margin-top: 150px;\\n  \\n  position: absolute;\\n  max-width: 500px;\\n \\n  margin-left: auto;\\n  margin-right: auto;\\n  left: 0;\\n  right: 0;\\n  text-align: center;\\n  border-radius: 10px;\\n  padding: 50px;\\n  padding-top: 60px;\\n}\\n\\n\\n#login-form{\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  flex-direction: column;\\n  margin-top: 200px;\\n  position: absolute;\\n  max-width: 500px;\\n \\n  margin-left: auto;\\n  margin-right: auto;\\n  left: 0;\\n  right: 0;\\n  text-align: center;\\n  border-radius: 10px;\\n  padding: 50px;\\n  padding-top: 60px;\\n}\\n\\n\\n.login-form h1{\\n  text-align: center;\\n  \\n}\\n\\n#login-btn{\\n    border: 1px solid #e951a5;\\n    border-radius: 20px;\\n    margin: 0 auto;\\n    max-width: 30vh;\\n    background-color: #6617cb;\\n    background-image: linear-gradient(315deg, #6617cb 0%, #cb218e 74%);\\n    transform: translateZ(20px);\\n}\\n\\n\\n\\n\\n\\n\\n\\n.animate-charcter-1\\n{\\n  background-color: #ffa69e;\\n  background-image: linear-gradient(315deg, #ffa69e 0%, #5d4954 74%);\\n   text-transform: uppercase;\\n  /* background-image: linear-gradient(\\n    -225deg,\\n    #231557 0%,\\n    #44107a 29%,\\n    #ff76a4 67%,\\n    #fffc98 100%\\n  ); */\\n  background-size: auto auto;\\n  margin-bottom: 100px;\\n  background-clip: border-box;\\n  background-size: 20% auto;\\n  color: #fff;\\n  background-clip: text;\\n  text-fill-color: transparent;\\n  -webkit-background-clip: text;\\n  -webkit-text-fill-color: transparent;\\n  animation: textclip 2s linear infinite;\\n  display: inline-block;\\n  font-size: 20px;\\n  max-height: 20px;    \\n  ;\\n}\\n\\n@keyframes textclip {\\n  to {\\n    background-position: 20% center;\\n  }\\n}\\n\\n.container{\\n  position: absolute;\\n  display: flex;\\n  justify-content: center;\\n  justify-content: space-between;\\n}\\n\\n\\n\\n\\n.container h3 {\\n  margin: 20px;\\n  display: inline\\n}\\n\\n.footer-div{\\n  position: absolute; \\n  background-color: transparent;\\n}\\n\\na{\\n  color: #fff;\\n}\\n\\n.marquee-container{\\n  position: absolute;\\n  max-height: 25px;\\n  margin-top: 10px;\\n  \\n}\\n\\n.marquee-container:hover{\\n  font-style: italic;\\n}\\n\\n.card{\\n  transform: translateY(3px); \\n  \\n}\\n\\n.card:hover{\\n  transform: translateY(0px);\\n}\\n\\n\\n.footer-div{\\n  background-image: linear-gradient(315deg, #4e00b4 0%, #c2007b 74%);\\n/* background-image: linear-gradient(315deg, #7a6888 0%, #6c5779 74%); */\\n}\\n\\n\\n\\n\\n\\n\\n/* .console-container {\\n \\n  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;\\n  font-size:2em;\\n  text-align:center;\\n  \\n  width:600px;\\n  display:block;\\n  position:absolute;\\n  color:white;\\n  top:0;\\n  bottom:0;\\n  left:0;\\n  right:0;\\n  margin:auto;\\n}\\n.console-underscore {\\n   display:inline-block;\\n  position:relative;\\n  top:-0.14em;\\n  left:10px;\\n} */\\n\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/login/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/login/index.js":
/*!************************************!*\
  !*** ./src/layouts/login/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/login/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../scripts/cookie */ \"./src/scripts/cookie.js\");\n\n\n\n\n\n\n\n\nconsole.log(\"Welcome to login page!\");\n\n$(document).ready(function () {\n  $('.content').css('display', 'block');\n});\n\n$(document).ready(function () {\n  let clause = window.innerWidth < 768;\n  config.particles.number.value = clause ? 80 : 150;\n  particlesJS(\"particle\", config);\n});\n\nvar config = {\n  particles: {\n    number: {\n      value: 50,\n      density: {\n        enable: true,\n        value_area: 9234\n      }\n    },\n    color: {\n      value: [\"#FF6F91\", \"#fffe4f\", \"#D65DB1\", \"#433E94\"]\n    },\n    shape: {\n      type: [\"circle\", \"triangle\", \"edge\", \"image\"],\n      stroke: {\n        width: 0,\n        color: \"#000000\"\n      },\n      polygon: {\n        nb_sides: 12\n      },\n      image: {\n        src: \"images/Telspiel Logo_Icon PNG.png\",\n        width: 2314,\n        height: 2314\n      }\n    },\n    opacity: {\n      value: 1,\n      random: true,\n      anim: {\n        enable: true,\n        speed: 1,\n        opacity_min: 0,\n        sync: false\n      }\n    },\n    size: {\n      value: 30,\n      random: true,\n      anim: {\n        enable: true,\n        speed: 3,\n        size_min: 0.3,\n        sync: false\n      }\n    },\n    line_linked: {\n      enable: true,\n      distance: 200,\n      color: \"#800080\",\n      opacity: 0.4,\n      width: 1\n    },\n    move: {\n      enable: true,\n      speed: 1.3,\n      direction: \"top\",\n      random: true,\n      straight: true,\n      out_mode: \"out\",\n      bounce: false,\n      attract: {\n        enable: true,\n        rotateX: 2082.2488,\n        rotateY: 3363.6328\n      }\n    }\n  },\n  interactivity: {\n    detect_on: \"canvas\",\n    events: {\n      onhover: {\n        enable: true,\n        mode: \"repulse\"\n      },\n      onclick: {\n        enable: true,\n        mode: \"push\"\n      },\n      resize: true\n    },\n    modes: {\n      grab: {\n        distance: 70,\n        line_linked: {\n          opacity: 0.25\n        }\n      },\n      bubble: {\n        distance: 100,\n        size: 5,\n        duration: 8.598243,\n        opacity: 0,\n        speed: 3\n      },\n      repulse: {\n        distance: 150,\n        duration: 0.8\n      },\n      push: {\n        particles_nb: 3\n\n      },\n      remove: {\n        particles_nb: 2\n      }\n    }\n  },\n  retina_detect: true\n};\n\n_scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].logout();\n\n$(function () {\n\n  $(\"#userId\").val(_scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"WTWPKEY\"));\n  $(\"#userPass\").val(_scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"WTWPVAL\"));\n  console.log(typeof _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"WTWPKEY\"));\n  console.log(_scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"WTWPVAL\"));\n  if (_scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"WTWPKEY\") && _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"WTWPVAL\")) {\n    $(\"#rememberMe\").prop(\"checked\", true);\n  }\n\n  $(\"#login-btn\").click(function (e) {\n    e.preventDefault();\n    const params = {\n      username: $(\"#userId\").val(),\n      password: $(\"#userPass\").val(),\n      appName: \"web-tool\"\n    };\n\n    if (params.username && params.password) {\n      Object(_scripts_request__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"login\"), \"POST\", params).done(data => {\n        console.log(data);\n        // print all keys in data\n        // console.log(Object.keys(data.data));\n        if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n\n          // const userData = data.data || {};\n          // console.log(JSON.stringify(userData));\n          if (data.otpRequired) {\n            $(\".otp-wrapper\").removeClass('d-none');\n            $(\".login-text\").addClass('d-none');\n            $(\".user-verify-btn\").addClass('d-none');\n            $(\".login-btn\").addClass('d-none');\n            $(\".logo-type\").css('margin-top', '120px');\n            $(\".form-control-sm\").addClass('d-none');\n            $(\".toggle-password\").addClass('d-none');\n            $(\".remember-me\").addClass('d-none');\n          } else {\n            proceedWithLoggedinuser(data, params);\n          }\n        }\n      });\n    } else {\n      alert(\"Enter both username and password!\");\n    }\n  });\n});\n\n$(\".toggle-password\").click(function () {\n\n  $(this).toggleClass(\"icon-eye icon-eye-off\");\n  var input = $($(this).attr(\"toggle\"));\n  if (input.attr(\"type\") == \"password\") {\n    input.attr(\"type\", \"text\");\n  } else {\n    input.attr(\"type\", \"password\");\n  }\n});\n\n$(\".otp-submit\").on('click', function (e) {\n  e.preventDefault();\n  const params = {\n    username: $(\"#userId\").val(),\n    password: $(\"#userPass\").val(),\n    userOtp: otpCodeTemp\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"verifyOtp\"), \"POST\", params).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n      if (data.code == 1000) {\n        proceedWithLoggedinuser(data, params);\n      } else {\n        alert(\"Invalid OTP\");\n      }\n    } else {\n      $('.otp-number-input').val('');\n    }\n  });\n});\n\n$(\"#resend-otp\").on('click', function () {\n  const params = {\n    username: $(\"#userId\").val(),\n    password: $(\"#userPass\").val()\n  };\n\n  if (params.username && params.password) {\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"login\"), \"POST\", params).done(data => {\n      if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n        // const userData = data.data || {};\n        if (data.code == 1000) {\n          proceedWithLoggedinuser(data, params);\n        }\n      }\n    });\n  } else {\n    alert(\"Enter both username and password!\");\n  }\n});\n\nfunction proceedWithLoggedinuser(data, params) {\n  let userData = data.data;\n  let visual = true;\n  if (userData.isVisualizeAllowed == \"Y\") {\n    visual = true;\n  } else {\n    visual = false;\n  }\n\n  let rememberMe = $('#rememberMe').is(\":checked\");\n  if (rememberMe) {\n    _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].set(\"WTWPKEY\", params.username);\n    _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].set(\"WTWPVAL\", params.password);\n  } else {\n    _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].del(\"WTWPKEY\");\n    _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].del(\"WTWPVAL\");\n  }\n\n  _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].setName(userData.username).setToken(userData.authToken).setLastLoginTime(userData.lastLoginTime).setLastLoginIp(userData.lastLoginIp).setShortUrlVisual(visual).setUserPrivilage(userData.userPrivileges).setUserId(userData.userId).setJWTToken(data.authJwtToken).login(userData);\n  _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].updateTokenExpiry();\n}\n\n/* Secure Password Field */\nwindow.onload = function () {\n  init();\n};\nfunction init() {\n  var x = document.getElementsByTagName(\"input\")[\"Password\"];\n  var style = window.getComputedStyle(x);\n  console.log(style);\n\n  if (style.webkitTextSecurity) {} else {\n    x.setAttribute(\"type\", \"password\");\n  }\n}\n/* CodeEnds Herer */\n\n/* OTP style code here */\nvar otpCodeTemp = \"\";\n$(document).ready(function () {\n  $('.otp-event').each(function () {\n    var $input = $(this).find('.otp-number-input');\n    var $submit = $(this).find('.otp-submit');\n    $input.keydown(function (ev) {\n      var otp_val = $(this).val();\n      if (ev.keyCode == 37) {\n        $(this).prev().focus();\n        ev.preventDefault();\n      } else if (ev.keyCode == 39) {\n        $(this).next().focus();\n        ev.preventDefault();\n      } else if (otp_val.length == 1 && ev.keyCode != 8 && ev.keyCode != 46) {\n        var otp_next_number = $(this).next();\n        if (otp_next_number.length == 1 && otp_next_number.val().length == 0) {\n          otp_next_number.focus();\n        }\n      } else if (otp_val.length == 0 && ev.keyCode == 8) {\n        $(this).prev().val(\"\");\n        $(this).prev().focus();\n      } else if (otp_val.length == 1 && ev.keyCode == 8) {\n        $(this).val(\"\");\n      } else if (otp_val.length == 0 && ev.keyCode == 46) {\n        next_input = $(this).next();\n        next_input.val(\"\");\n        while (next_input.next().length > 0) {\n          next_input.val(next_input.next().val());\n          next_input = next_input.next();\n          if (next_input.next().length == 0) {\n            next_input.val(\"\");\n            break;\n          }\n        }\n      }\n    }).focus(function () {\n      $(this).select();\n      var otp_val = $(this).prev().val();\n      if (otp_val === \"\") {\n        $(this).prev().focus();\n      } else if ($(this).next().val()) {\n        $(this).next().focus();\n      }\n    }).keyup(function (ev) {\n      otpCodeTemp = \"\";\n      $input.each(function (i) {\n        if ($(this).val().length != 0) {\n          $(this).addClass('otp-filled-active');\n        } else {\n          $(this).removeClass('otp-filled-active');\n        }\n        otpCodeTemp += $(this).val();\n      });\n      if ($(this).val().length == 1 && ev.keyCode != 37 && ev.keyCode != 39) {\n        $(this).next().focus();\n        ev.preventDefault();\n      }\n      $input.each(function (i) {\n        if ($(this).val() != '') {\n          $submit.prop('disabled', false);\n        } else {\n          $submit.prop('disabled', true);\n        }\n      });\n    });\n    $input.on(\"cut copy paste\", function (e) {\n      e.preventDefault();\n    });\n  });\n});\n\n/* Code Ends here */\n\n// login animation -------------------------------------------------------------------------------------------------\n\n// function([string1, string2],target id,[color1,color2])    \n// consoleText(['END TO END ENCRYPTION', 'DLT FRIENDLY', 'INTELLIGENT ROUTING', 'API COMPATIBILITY', 'TRANSPARENCY' , 'ANALYTICS' , 'TRACKING', 'INSIGHTS', 'SEGMENTATION'], 'text',['tomato','rebeccapurple','lightblue']);\n\n// function consoleText(words, id, colors) {\n//   if (colors === undefined) colors = ['#fff'];\n//   var visible = true;\n//   var con = document.getElementById('console');\n//   var letterCount = 1;\n//   var x = 1;\n//   var waiting = false;\n//   var target = document.getElementById(id)\n//   target.setAttribute('style', 'color:' + colors[0])\n//   window.setInterval(function() {\n\n//     if (letterCount === 0 && waiting === false) {\n//       waiting = true;\n//       target.innerHTML = words[0].substring(0, letterCount)\n//       window.setTimeout(function() {\n//         var usedColor = colors.shift();\n//         colors.push(usedColor);\n//         var usedWord = words.shift();\n//         words.push(usedWord);\n//         x = 1;\n//         target.setAttribute('style', 'color:' + colors[0])\n//         letterCount += x;\n//         waiting = false;\n//       }, 1000)\n//     } else if (letterCount === words[0].length + 1 && waiting === false) {\n//       waiting = true;\n//       window.setTimeout(function() {\n//         x = -1;\n//         letterCount += x;\n//         waiting = false;\n//       }, 1000)\n//     } else if (waiting === false) {\n//       target.innerHTML = words[0].substring(0, letterCount)\n//       letterCount += x;\n//     }\n//   }, 120)\n//   window.setInterval(function() {\n//     if (visible === true) {\n//       con.className = 'console-underscore hidden'\n//       visible = false;\n\n//     } else {\n//       con.className = 'console-underscore'\n\n//       visible = true;\n//     }\n//   }, 400)\n// }\n\n//# sourceURL=webpack:///./src/layouts/login/index.js?");

/***/ }),

/***/ "./src/layouts/login/styles.css":
/*!**************************************!*\
  !*** ./src/layouts/login/styles.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/login/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/login/styles.css?");

/***/ })

/******/ });