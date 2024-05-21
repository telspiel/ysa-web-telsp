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
/******/ 		"quick-message": 0
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
/******/ 	deferredModules.push(["./src/layouts/quick-message/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/quick-message/styles.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/quick-message/styles.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"#send-message-form {\\n  width: 70%;\\n  padding: 20px 0 0 50px;\\n}\\n\\n#fileUpload {\\n  float: right;\\n}\\n\\n.scheduleMsgFields {\\n  display: flex;\\n  justify-content: space-between;\\n}\\n\\n.scheduleMsgFields > input {\\n  width: 20%;\\n}\\n\\n.removeRow {\\n  padding: 10px;\\n  cursor: pointer;\\n}\\n\\n.charCount {\\n  float: right;\\n  display: none;\\n}\\n\\n#saveBulkUpload {\\n  width: 20%;\\n}\\ninput::-webkit-outer-spin-button,\\ninput::-webkit-inner-spin-button {\\n  -webkit-appearance: none;\\n  margin: 0;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/quick-message/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/quick-message/index.js":
/*!********************************************!*\
  !*** ./src/layouts/quick-message/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/quick-message/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\n// $(\"#cancelForm\").click(() => {\n//   $(\"#sendMessage\")[0].reset();\n// });\n\nlet pureMsg = \"\";\nlet shortList;\nlet campaignName = \"\";\nlet selectedShortUrlText = [];\n\n$(window).bind(\"load\", function () {\n\n  const visual = _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getShortUrlVisual();\n  console.log(typeof visual);\n  if (visual == \"true\") {\n    // $(\"#isShortUrlVisual\").removeClass(\"d-none\");\n    $(\"#shortURLNote\").removeClass(\"d-none\");\n  } else if (visual == \"false\") {\n    $(\"#isShortUrlVisual\").addClass(\"d-none\");\n    // $(\"#shortURLNote\").addClass(\"d-none\");\n  }\n});\n\n// Woirking on it\nfunction updatedwithShortURL(shortname) {\n  var cursorPos = $('#msgText').prop('selectionStart');\n  var v = $('#msgText').val();\n  var textBefore = v.substring(0, cursorPos);\n  var textAfter = v.substring(cursorPos, v.length);\n\n  var shortObj = shortList.filter(p => p.name == shortname)[0];\n  $(\"#msgText\").val(textBefore + \"\" + shortObj.hostName + \"/xxxxxx\" + textAfter);\n  messageCountUpdate();\n}\n\nfunction genCampaignName() {\n  const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n  var CName = _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName() + \"-campaign-\" + dTime;\n  campaignName = CName;\n  return CName;\n}\n\nfunction updateMessagePart() {\n  messageCountUpdate();\n\n  var type = $(\"input[name=msgType]:checked\").val();\n  var part = $(\"input[name=msgPart]:checked\").val();\n  var charCount = parseInt($(\"#charCount\").text());\n\n  if (!isPlainMsg) {\n    $(\"input[name=msgType][value=unicode]\").prop(\"checked\", true);\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Message Encoding Selected as Unicode\");\n  }\n  if (isPlainMsg) {\n    $(\"input[name=msgType][value=plain]\").prop(\"checked\", true);\n  }\n\n  if (type === \"plain\" && part === \"single\" && charCount > 160) {\n    $(\"input[name=msgPart][value=multi]\").prop(\"checked\", true);\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"You are sending a multipart message\", {\n      clearTime: 3 * 1000\n    });\n  } else if (type === \"plain\" && part === \"multi\" && charCount <= 160) {\n    $(\"input[name=msgPart][value=single]\").prop(\"checked\", true);\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"You are sending a singlepart message\", {\n      clearTime: 3 * 1000\n    });\n  } else if (type === \"unicode\" && part === \"single\" && charCount > 70) {\n    $(\"input[name=msgPart][value=multi]\").prop(\"checked\", true);\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"You are sending a multipart message\", {\n      clearTime: 3 * 1000\n    });\n  } else if (type === \"unicode\" && part === \"multi\" && charCount <= 70) {\n    $(\"input[name=msgPart][value=single]\").prop(\"checked\", true);\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"You are sending a singlepart message\", {\n      clearTime: 3 * 1000\n    });\n  }\n};\n\n$(function () {\n  $(\"#campaignName\").val(genCampaignName());\n\n  $(\"#sendMessage\").on('reset', function (event) {\n\n    $(\"#shortUrlName\").val(null).trigger('change');\n    $(\"#short_url\").addClass('d-none');\n    $('#charCount').html('0 character');\n    $('#smsCr').html('0');\n    $('#totalMobile').html('0');\n    $(\".displayTemplateTextSpan\").addClass(\"d-none\");\n    // $(\"#entityId\").prop(\"disabled\", false);\n    // $(\"#operatorTemplateId\").prop(\"disabled\", false);\n    $(\".service_type\").addClass(\"d-none\");\n    $(\"#entityId\").val('').removeAttr(\"readonly\");\n    $(\"#operatorTemplateId\").removeAttr(\"readonly\");\n    $(\"#msgText\").html('');\n  });\n\n  // $(\"input[name=msgType][value=unicode]\").on(\"change\",function(){\n  //   Alert.info(\"You are sending a unicode message\", {\n  //     clearTime: 3 * 1000\n  //   }\n  //   )});\n\n  //   $(\"input[name=msgType][value=plain]\").on(\"change\",function(){\n  //   Alert.info(\"You are sending a plain message\", {\n  //     clearTime: 3 * 1000\n  //   }\n  //   )});\n\n  $(\"#msgText\").keyup(updateMessagePart);\n  $(\"#msgText\").on(\"paste\", function () {\n    // Use a timeout to allow the paste operation to complete\n    setTimeout(updateMessagePart, 100);\n  });\n\n  // function displayShortURLShortNote() {\n  //   var shortname = $(\"#shortUrlName\").val();\n  //   var shortObj = shortList.filter(p => p.name == shortname)[0];\n  //   if (shortObj.isDynamic == \"N\") {\n  //     $(\"#staticUrlNote\").removeClass(\"d-none\");\n  //     $(\"#dynamicUrlNote\").addClass(\"d-none\");\n  //   } else if (shortObj.isDynamic == \"Y\") {\n  //     $(\"#dynamicUrlNote\").removeClass(\"d-none\");\n  //     $(\"#staticUrlNote\").addClass(\"d-none\");\n  //   }\n  // }\n\n  $(\"#isShortUrlSelected-1,#isShortUrlSelected-0\").click(function () {\n    // pureMsg = $(\"#msgText\").val();\n    if ($(this).val() == \"Y\") {\n      pureMsg = $(\"#msgText\").val();\n    } else {\n      $(\"#msgText\").val(pureMsg);\n      $(\"#shortUrlName\")[0].selectize.clear();\n      messageCountUpdate();\n    }\n  });\n\n  $('#messageModal').on('shown.bs.modal', function (e) {\n    // do something...\n    $(\"#modelMessage\").html($(\"#msgText\").val());\n    var serviceType = $(\"input[name=msgType]:checked\").val();\n    // if ((serviceType == \"plain\") || (serviceType == \"unicode\")) {\n    var testmsg = $(\"#msgText\").val();\n    var test = testmsg.replace(/\\`/g, \"'\");\n    $(\"#modelMessage\").html(test);\n    // }\n    if (!isPlainMsg) {\n      $(\"#modelCharCount\").html($(\"#charCount\").html() + \" Unicode\");\n    }\n    $(\"#modelCharCount\").html($(\"#charCount\").html());\n    // var totalCr = parseInt($(\"#smsCr\").html()) * parseInt($(\"#totalMobile\").html());\n    $(\"#modelSmsCr\").html($(\"#smsCr\").html());\n    $(\"#sender\").html($(\"#senderIdSelect\").val());\n  });\n\n  $('#translationModal').on('hidden.bs.modal', function () {\n    // do something…\n    $(\"#convertedText\").html(\"\");\n    $(\"#convOriginalText\").val(\"\");\n  });\n\n  var convertedText;\n\n  $(\"#convertBtn\").click(function () {\n    if ($(\"#convOriginalText\").val()) {\n      const additionalData = {\n        loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n        text: $(\"#convOriginalText\").val(),\n        targetLanguage: $(\"#targetLanguage\").val()\n      };\n\n      Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"translateText\"), \"POST\", additionalData, { showMainLoader: true }).done(data => {\n        if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n          console.log(data);\n          $(\"#convertedText\").html(data.convertedText);\n          convertedText = data.convertedText;\n          messageCountUpdate();\n        }\n      });\n    }\n  });\n\n  $(\"#checkboxId\").click(function () {\n    if ($('#checkboxId').is(\":checked\")) {\n      $(\"#msgText\").val(\"\");\n    }\n  });\n\n  $(\"#cpyClose\").click(function () {\n    $(\"#msgText\").val(convertedText);\n    messageCountUpdate();\n  });\n\n  // mODAL cLICK eVENT\n  $(\"#sendNow\").click(function () {\n\n    const formData = {};\n    var TextValue = $(\"#msgText\").val();\n    var serviceType = $(\"input[name=msgType]:checked\").val();\n    // if ((TextValue.match(/\\`|\\~/)) && (serviceType == \"plain\") || (serviceType == \"unicode\")) {\n    var test = TextValue.replace(/\\`/g, \"'\");\n    TextValue = TextValue.replace(/\\`/g, \"'\");\n    // $(\"#modelMessage\").html($(\"#msgText\").val(test));\n    $(\"#msgText\").val(test);\n    // }\n\n    $(\"#sendMessage\").serializeArray().forEach(i => {\n      if (i.value) {\n        formData[i.name] = i.value;\n      }\n    });\n\n    const additionalData = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      shortUrlName: $(\"#shortUrlName\").val()\n    };\n    var serviceType = $(\"input[name=serviceType]:checked\").val();\n    if (serviceType == \"trans\" || serviceType == \"promo\") {\n      delete formData['serviceSubType'];\n    }\n\n    formData['perMsgCredit'] = $('#modelSmsCr').text();\n\n    $(\"#btnSubmit\").attr(\"disabled\", true);\n    $(\"#btnCancel\").attr(\"disabled\", true);\n    $(\"#sendNow\").addClass(\"d-none\");\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"quickMessage\"), \"POST\", $.extend({}, formData, additionalData), { showMainLoader: true }).done(data => {\n      if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n        $('#messageModal').modal('hide');\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        if (data.result === \"Success\") {\n          $(\"#sendMessage\")[0].reset();\n          $(\"#campaignName\").val(genCampaignName());\n        }\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n          clearTime: 10 * 1000\n        }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(data.message, {\n          clearTime: 10 * 1000\n        }));\n        $(\"#btnSubmit\").attr(\"disabled\", false);\n        $(\"#btnCancel\").attr(\"disabled\", false);\n        $(\"#sendNow\").removeClass(\"d-none\");\n      }\n    });\n  });\n\n  $(\"#sendMessage\").submit(function (e) {\n    const dateTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n\n    e.preventDefault();\n\n    // var ar = /^(\\d|\\w|-)+$/;\n    var ar = /^[a-zA-Z0-9!@#\\$%\\^\\&*\\)\\(+=._-]+$/;\n    if ($(\"#campaignName\").val() != campaignName) {\n      if (ar.test($(\"#campaignName\").val()) == false) {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"Campaign Name should not contain space or special character\", {\n          clearTime: 10 * 1000\n        });\n        return;\n      }\n    }\n\n    // if campaign name contains % then show alert message\n\n    if ($(\"#campaignName\").val().indexOf(\"%\") != -1) {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"Campaign Name should not contain % character \", {\n        clearTime: 10 * 1000\n      });\n      return;\n    }\n\n    const data = {\n      // campaignName: CName,\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      serviceType: $(\"input[name=serviceType]:checked\").val(),\n      msgText: this[9].value,\n      mobileNumber: this[1].value,\n      senderIdType: this[7].value\n    };\n    var validForm = true;\n    var type = $(\"input[name=msgType]:checked\").val();\n    var part = $(\"input[name=msgPart]:checked\").val();\n\n    if (isPlainMsg && (type == \"plain\" || type == \"FL\")) {\n      validForm = true;\n    } else if (!isPlainMsg && (type == \"unicode\" || type == \"FU\")) {\n      validForm = true;\n    } else {\n      validForm = false;\n      if (isPlainMsg && (type == \"unicode\" || type == \"FU\")) {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"Message Type Mismatch, Please select Message Type Plain to send SMS.\", {\n          clearTime: 10 * 1000\n        });\n      } else if (!isPlainMsg && (type == \"plain\" || type == \"FL\")) {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"Message Type Mismatch, Please select Message Type Unicode to send SMS.\", {\n          clearTime: 10 * 1000\n        });\n      } else {\n        validForm = true;\n      }\n    }\n    if (validForm) {\n\n      var sectionToCheck = $(\"#msgText\").val();\n      var allFoundCharacters = sectionToCheck.match(/[\\[\\]\\{\\}\\\\|\\^€\\~]/g);\n      var splCharCount = allFoundCharacters ? allFoundCharacters.length : 0; //count\n      var charCount = parseInt($(\"#msgText\").val().length) + parseInt(splCharCount);\n\n      if (isPlainMsg && charCount > 160 && part == \"single\") {\n        validForm = false;\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"You are trying to send a Multipart SMS, Please select Message Part as Multipart to send the SMS.\", {\n          clearTime: 10 * 1000\n        });\n      } else if (!isPlainMsg && charCount > 70 && part == \"single\") {\n        validForm = false;\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"You are trying to send a Multipart SMS, Please select Message Part as Multipart to send the SMS.\", {\n          clearTime: 10 * 1000\n        });\n      } else if (isPlainMsg && charCount < 160 && part == \"multi\") {\n        validForm = false;\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"You are trying to send a Singlepart SMS, Please select Message Part as Singlepart to send the SMS.\", {\n          clearTime: 10 * 1000\n        });\n      } else if (!isPlainMsg && charCount < 70 && part == \"multi\") {\n        validForm = false;\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"You are trying to send a Singlepart SMS, Please select Message Part as Singlepart to send the SMS.\", {\n          clearTime: 10 * 1000\n        });\n      } else {\n        validForm = true;\n      }\n    }\n\n    //var regEx = new RegExp(\"^\\d[\\d\\s]*$\");\n    var regEx = new RegExp(\"^(\\d{10})+\\s\");\n    var mobileTextarea = $(\"#mobileNumber\").val();\n    //if(regEx.test(mobileTextarea.trim())){\n    if (validForm) {\n      // console.log(\"true\");\n      $('#messageModal').modal('show');\n      // console.log(\"false\");\n    }\n  });\n});\n\n$(window).bind(\"load\", function () {\n  const visual = _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getShortUrlVisual();\n  if (visual == \"true\") {\n    $(\"#isShortUrlVisual\").removeClass(\"d-none\");\n    $(\"#shortURLNote\").removeClass(\"d-none\");\n  } else if (visual == \"false\") {\n    $(\"#isShortUrlVisual\").addClass(\"d-none\");\n    $(\"#disnote\").addClass(\"d-none\");\n    // $(\"#shortURLNote\").addClass(\"d-none\");\n  }\n});\n\nvar isPlainMsg = true;\n$(\"#msgText\").keyup(() => {\n  //  $(\"#charCount\").html($(\"#msgText\").val().length);\n  messageCountUpdate();\n});\n\n$(\"#mobileNumber\").keyup(() => {\n  var count = $('#mobileNumber').val().split(/[\\n\\r]+[0-9]{1}/g).length;\n  var fieldLength = $('#mobileNumber').val().length;\n  if (fieldLength != 0) {\n    $(\"#totalMobile\").html(count);\n  } else {\n    $(\"#totalMobile\").html(\"0\");\n  }\n});\n\nfunction messageCountUpdate() {\n\n  var sectionToCheck = $(\"#msgText\").val();\n  var allFoundCharacters = sectionToCheck.match(/[\\[\\]\\{\\}\\\\|\\^€\\~]/g);\n  var splCharCount = allFoundCharacters ? allFoundCharacters.length : 0; //count\n\n  if (sectionToCheck.match(/[\\~]/g)) {\n    var charCount = parseInt($(\"#msgText\").val().length) + parseInt(\"0\");\n  } else {\n    var charCount = parseInt($(\"#msgText\").val().length) + parseInt(splCharCount);\n  }\n\n  // dollar in plain text\n  var plain = new RegExp(\"^[A-Za-z0-9_~\\\\`\\\\-!:\\\\/.@\\\\|\\\\,#\\\\$%\\\\^&\\\\*\\\\(\\\\)\\n\\s +=\\\\\\\\{}\\\\[\\\\];'\\\"<>?]*$\");\n  var count = charCount;\n  var sms = 0;\n  if (plain.test($(\"#msgText\").val().trim())) {\n\n    isPlainMsg = true;\n    if (charCount > 160) {\n      var n = count / 153;\n      var dec = Math.ceil(n);\n      sms = dec;\n    } else if (count != 0 && count <= 160) {\n      sms = 1;\n    } else {\n      sms = 0;\n    }\n    $(\"#charCount\").html(charCount + \" characters\");\n  } else {\n    isPlainMsg = false;\n    if (charCount > 70) {\n      var n = count / 67;\n      var dec = Math.ceil(n);\n      sms = dec;\n    } else if (count != 0 && count <= 70) {\n      sms = 1;\n    } else {\n      sms = 0;\n    }\n    var type = $(\"input[name=msgType]:checked\").val();\n    if (type == \"plain\") {\n      $(\"#charCount\").html(charCount + \" characters\");\n    }\n    if (type == \"unicode\") {\n      $(\"#charCount\").html(charCount + \" unicode characters\");\n    }\n  }\n  $(\"#smsCr\").html(sms);\n}\n$(() => {\n  const data1 = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"listShortUrl\"), \"POST\", data1).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(resData)) {\n      console.log(resData);\n      shortList = resData.data.shortUrlList;\n      const source = app.store.senderIdList = resData.data.shortUrlList.map(o => ({\n        id: o.shortUrlId,\n        name: o.name\n      }));\n      source.forEach(i => {\n        var o = new Option(i.name, i.name);\n        $(o).html(i.name);\n        $(\"#shortUrlName\").append(o);\n      });\n\n      $('#shortUrlName').selectize({\n        hideSelected: true,\n        plugins: ['remove_button'],\n        onItemAdd(value, $item) {\n          // console.log(value, $item)\n          // $('#shortUrlName').val($('#shortUrlName').val().reverse()).trigger(\"change\");\n          // pureMsg = $(\"#msgText\").val();\n          // console.log(pureMsg)\n          selectedShortUrlText.push(value);\n          updatedwithShortURL(value);\n        },\n        onItemRemove(value) {\n          removeShortUrlInMsgText(value);\n        }\n      });\n    }\n  });\n});\n\nfunction removeShortUrlInMsgText(value) {\n  let unSelecteData = value;\n  // console.log(\"unSelecteData\",selectedShortUrlText)\n  // console.log(\"shortUrlName\", $('#shortUrlName').val())\n  var unSelecteData_index = selectedShortUrlText.indexOf(unSelecteData);\n  var shortObj = shortList.filter(p => p.name == unSelecteData)[0];\n  // console.log(\"shortObj\",shortObj)\n  // console.log(\"unSelecteData_index\",unSelecteData_index)\n  let finding_text = shortObj.hostName + \"/xxxxxx\";\n  let msg_txt = $(\"#msgText\").val();\n\n  let index = getIndex(msg_txt, finding_text, unSelecteData_index + 1);\n  if (index === -1) {\n    console.log(\"msg_txt\", msg_txt);\n    console.log(\"finding_text\", finding_text);\n    console.log(\"unSelecteData_index\", unSelecteData_index);\n    console.log(index, finding_text.length);\n  } else {\n    selectedShortUrlText.splice(unSelecteData_index, 1);\n  }\n\n  let new_text = msg_txt.slice(0, index) + msg_txt.slice(index + finding_text.length);\n\n  $(\"#msgText\").val(new_text);\n\n  messageCountUpdate();\n}\n\nfunction getIndex(str, substr, ind) {\n  var Len = str.length,\n      i = -1;\n  while (ind-- && i++ < Len) {\n    i = str.indexOf(substr, i);\n    if (i < 0) break;\n  }\n  return i;\n}\n\n$(document).ready(function () {\n  const datalist = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    messageType: \"other\",\n    messageSubType: \"\"\n  };\n  var senderIdList = document.getElementById(\"senderIdSelect\");\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"senderIdListByMessageType\"), \"POST\", datalist).done(data => {\n    const tempList = data.data.senderIdList;\n    $.each(tempList, function (key, value) {\n      senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);\n    });\n    $(\"#senderIdSelect\").select2();\n  });\n  $(\".messagetype\").click(function () {\n    var selValue = $(this).val();\n    if (selValue == \"trans\" || selValue == \"promo\") {\n      $(\".service_type\").addClass(\"d-none\");\n    } else {\n      $(\".service_type\").removeClass(\"d-none\");\n    }\n  });\n});\n\n$(\".messagetype\").click(function () {\n  var selValue = $(this).val();\n  if (selValue == \"trans\" || selValue == \"service\") {\n    $('#senderIdSelect').empty().append('<option selected disabled >-- Select --</option>');\n    $('#templatename').empty();\n    // .append('<option selected>-- Select --</option>');\n    const datalist = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      messageType: \"other\",\n      messageSubType: \"\"\n    };\n    var senderIdList = document.getElementById(\"senderIdSelect\");\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"senderIdListByMessageType\"), \"POST\", datalist).done(data => {\n      const tempList = data.data.senderIdList;\n      $.each(tempList, function (key, value) {\n        senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);\n      });\n      $(\"#senderIdSelect\").select2();\n    });\n  } else {\n    $('#senderIdSelect').empty().append('<option selected disabled >-- Select --</option>');\n    $('#templatename').empty();\n    // .append('<option selected>-- Select --</option>');\n    const datalist = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      messageType: selValue,\n      messageSubType: \"\"\n    };\n    var senderIdList = document.getElementById(\"senderIdSelect\");\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"senderIdListByMessageType\"), \"POST\", datalist).done(data => {\n      const tempList = data.data.senderIdList;\n      $.each(tempList, function (key, value) {\n        senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);\n      });\n      $(\"#senderIdSelect\").select2();\n    });\n  }\n});\n\nvar selectTemplateName;\n\n$(\"#senderIdSelectDiv .senderIdSelect\").change(function () {\n  $('#templatename').empty().append('<option selected value=\"\">-- Select --</option>');\n  var senderid = $(this).children(\"option:selected\").val();\n  var serviceType = $(\"input[name=serviceType]:checked\").val();\n  if (serviceType == \"service\") {\n    var service = $(\"input[name=serviceSubType]:checked\").val();\n  } else {\n    var service = \"\";\n  }\n  $(\"input[name=serviceType]:checked\").val();\n  const datalist = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    messageType: serviceType,\n    messageSubType: service,\n    senderId: senderid\n  };\n  var templateTitleSelect = document.getElementById(\"templatename\");\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"viewAllContentTemplateListByMessageType\"), \"POST\", datalist).done(data => {\n    const tempList = data.data.contentTemplateList;\n    selectTemplateName = tempList;\n    $.each(tempList, function (key, value) {\n      templateTitleSelect.options[templateTitleSelect.options.length] = new Option(value.templateTitle, value.templateId);\n    });\n    $(\"#templatename\").select2();\n  });\n});\n\n$(\"#templatename\").change(function () {\n  var contentTemplateId = $(this).children(\"option:selected\").val();\n  var txt = selectTemplateName.find(x => x.templateId == contentTemplateId);\n  if (txt) {\n    $(\"#msgText\").text(txt.templateText);\n    $(\"#displayTemplateText\").html(txt.templateText);\n    messageCountUpdate();\n    // $(\".displayTemplateTextSpan\").removeClass(\"d-none\");\n    if (!isPlainMsg) {\n      $(\"input[name=msgType][value=unicode]\").prop(\"checked\", true);\n      // Alert.clearAll();\n      // Alert.info(\"You are sending a unicode message\", {\n      //   clearTime: 3 * 1000\n      // }\n      // );\n    }\n    if (isPlainMsg) {\n      $(\"input[name=msgType][value=plain]\").prop(\"checked\", true);\n      // Alert.clearAll();\n      // Alert.info(\"You are sending a plain message\", {\n      //   clearTime: 3 * 1000\n      // }\n      // );\n    }\n    updateMessagePart();\n\n    $(\"#entityId\").val(txt.entityId);\n    $(\"#operatorTemplateId\").val(txt.operatorTemplateId);\n    $(\"#entityId\").prop(\"readonly\", true);\n    $(\"#operatorTemplateId\").prop(\"readonly\", true);\n  } else {\n    $(\"#displayTemplateText\").html(\"\");\n    $(\".displayTemplateTextSpan\").addClass(\"d-none\");\n    $(\"#entityId\").val('');\n    $(\"#operatorTemplateId\").val('');\n    $(\"#entityId\").removeAttr(\"readonly\");\n    $(\"#operatorTemplateId\").removeAttr(\"readonly\");\n  }\n});\n\n//# sourceURL=webpack:///./src/layouts/quick-message/index.js?");

/***/ }),

/***/ "./src/layouts/quick-message/styles.css":
/*!**********************************************!*\
  !*** ./src/layouts/quick-message/styles.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/quick-message/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/quick-message/styles.css?");

/***/ })

/******/ });