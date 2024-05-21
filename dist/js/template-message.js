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
/******/ 		"template-message": 0
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
/******/ 	deferredModules.push(["./src/layouts/template-message/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/template-message/styles.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/template-message/styles.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".controls-form button {\\n  background: var(--primary-color);\\n  border-color: var(--primary-color);\\n  width: 50%;\\n}\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n#misTable_filter,#misTable_info{\\ndisplay:none;\\n}\\n\\ntbody td{\\n  white-space: pre-line !important;\\n}\\ninput::-webkit-outer-spin-button,\\ninput::-webkit-inner-spin-button {\\n  -webkit-appearance: none;\\n  margin: 0;\\n}\\n.table td, .table th {\\n  white-space: break-spaces !important;\\n}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/template-message/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/template-message/index.js":
/*!***********************************************!*\
  !*** ./src/layouts/template-message/index.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/template-message/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\nconsole.log(\"Welcome to Template-message\");\n\nvar uploadedFileName = '';\nvar tparams;\nlet campaignName = \"\";\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\nfunction genCampaignName() {\n  const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n  var CName = _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName() + \"-campaign-\" + dTime;\n  campaignName = CName;\n  return CName;\n}\n\n$(document).ready(function () {\n  $(\"#campaignName\").val(genCampaignName());\n  $(\"#schedule_date\").datetimepicker({\n    minDate: '0',\n    minTime: '0',\n    dateFormat: 'yy-mm-dd',\n    timeFormat: 'HH:mm:ss',\n    format: 'Y-m-d H:i',\n    step: 1\n  }).attr('readonly', 'readonly');\n\n  $(\"#schedule_date\").datetimepicker({\n    minDate: '0',\n    minTime: '0',\n    dateFormat: 'yyyy-mm-dd',\n    timeFormat: 'HH:mm:ss',\n    format: 'Y-m-d H:i',\n    step: 1,\n    onSelectDate: function (dp, $input) {\n      if (dp.getDate() == new Date().getDate()) {\n        this.setOptions({\n          minTime: '0'\n        });\n      } else {\n        this.setOptions({\n          minTime: false\n        });\n      }\n    }\n  }).attr('readonly', 'readonly');\n});\n\nloadTemplates();\n\nfunction loadTemplates() {\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  var templateList;\n\n  var templateSelect = document.getElementById(\"templateOption\");\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"viewTemplate\"), \"POST\", data).done(data => {\n    const gpList = data.data.templateList;\n    templateList = gpList;\n    window.templateList = gpList;\n    $.each(gpList, function (key, value) {\n      templateSelect.options[templateSelect.options.length] = new Option(value.templateTitle, value.templateTitle);\n    });\n    $(\"#msgText\").val(templateList[0].templateText);\n  });\n\n  $('#templateOption').on('change', function () {\n    var tt = this.value;\n    templateList.forEach(function (entry) {\n      if (entry.templateTitle == tt) {\n        $(\"#msgText\").val(entry.templateText);\n      }\n    });\n  });\n}\n\n$(\"#fupload\").click(function (e) {\n  e.preventDefault();\n  const selectFile = $(\"#selectFile\").get(0).files[0];\n  var selectedFileName = $(\"#selectFile\").get(0).files[0].name;\n  _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n  if (!selectFile) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].info(\"Please select a file.\");\n    return;\n  }\n\n  var ar = /^(\\d|\\w|-)+$/;\n  if (ar.test(selectedFileName.split(\".\")[0]) == false) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"File Name should not contain space\", {\n      clearTime: 10 * 1000\n    });\n    return;\n  }\n\n  const formData1 = new FormData();\n  formData1.append(\"userName\", _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName());\n  formData1.append(\"fileType\", \"xls\");\n  formData1.append(\"file\", selectFile);\n\n  const data2 = {};\n\n  $(\"#template-msg-form\").serializeArray().forEach(i => {\n    var key = i.name;\n    if (key == \"campaignName\" || key == \"msgPart\" || key == \"msgType\" || key == \"templateName\") {\n      data2[i.name] = i.value;\n      formData1.append(i.name, i.value);\n    }\n  });\n\n  templateList.forEach(function (entry) {\n    if (entry.templateTitle == $('#templateOption').val()) {\n      formData1.append('templateId', entry.templateId);\n    }\n  });\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"uploadTemplateMsg\"), \"POST\", formData1, {\n    showMainLoader: true,\n    contentType: false,\n    processData: false,\n    data: formData1\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n      uploadedFileName = data.data.fileName;\n      var numberSelect = document.getElementById(\"mobileNumber\");\n      const headerList = data.data.columnHeaderMap;\n      $.each(headerList, function (key, value) {\n        numberSelect.options[numberSelect.options.length] = new Option(key, value);\n      });\n\n      const params = data.data.templateParamList;\n      tparams = params;\n      console.log(params);\n      $.each(params, function (key, value) {\n        var htmlContent = \"<div class='form-group row eachParam'><label class='col-sm-2 col-form-label paramLabel'>\" + value + \"</label>\";\n        htmlContent += \"<div class='col-sm-6'><select type='text' class='form-control templateParam' id='templateParam-\" + key + \"'  name='\" + value + \"'><option selected>-- Select --</option></select></div>\";\n        htmlContent += \"</div>\";\n\n        $(\"#allParams\").append(htmlContent);\n      });\n\n      var i = 0;\n      $(\"#allParams\").find('.templateParam').each(function () {\n        var fielSelect = document.getElementById(\"templateParam-\" + i);\n        $.each(headerList, function (key, value) {\n          fielSelect.options[fielSelect.options.length] = new Option(key, value);\n        });\n        i++;\n      });\n\n      $(\"#selectFile\").attr(\"disabled\", \"true\");\n      $(\"#fupload\").attr(\"disabled\", \"true\");\n\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 60 * 60 * 1000\n      }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(data.message, {\n        clearTime: 60 * 60 * 1000\n      }));\n    }\n  });\n});\n// $(function () {\n\n$(\"#btnPreview\").click(() => {\n  var ar = /^[a-zA-Z0-9!@#\\$%\\^\\&*\\)\\(+=._-]+$/;\n  if ($(\"#campaignName\").val() != campaignName) {\n    if (ar.test($(\"#campaignName\").val()) == false) {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"Campaign Name should not contain space\", {\n        clearTime: 10 * 1000\n      });\n      return;\n    }\n  }\n\n  const data2 = {};\n  $(\"#template-msg-form\").serializeArray().forEach(i => {\n    if (i.value) {\n      data2[i.name] = i.value;\n    }\n  });\n  const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n\n  var CName = $(\"#campaignName\").val();\n  data2[\"campaignName\"] = CName;\n  templateList.forEach(function (entry) {\n    if (entry.templateTitle == $('#templateOption').val()) {\n      data2['templateId'] = entry.templateId;\n    }\n  });\n\n  delete data2[\"templateName\"];\n\n  if (data2['scheduleMessage'] === \"no\") {\n    delete data2[\"scheduleDateTime\"];\n    //  delete data2[\"splitFileTime\"];\n  } else {\n    var dateTime = data2[\"scheduleDateTime\"].split(/\\s+/);\n    data2[\"scheduleDate\"] = dateTime[0];\n    var splitTime = dateTime[1].split(\":\");\n    data2[\"scheduleHour\"] = splitTime[0];\n    data2[\"scheduleMinute\"] = splitTime[1];\n    delete data2[\"scheduleDateTime\"];\n  }\n\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n\n  var paramFieldMapping = {};\n  var plist = 0;\n  $.each(tparams, function (key, value) {\n    paramFieldMapping[value] = data2[value];\n    delete data2[value];\n    //paramFieldMapping.push(value,\"templateParam-\"+plist);\n  });\n\n  data2['paramFieldMapping'] = paramFieldMapping;\n  data2['fileName'] = uploadedFileName;\n  var serviceType = $(\"input[name=serviceType]:checked\").val();\n  if (serviceType == \"trans\" || serviceType == \"promo\") {\n    delete data2['serviceSubType'];\n  }\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getTemplatePreview\"), \"POST\", $.extend({}, data2, additionalData), { showMainLoader: true }).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(resData)) {\n      console.log(resData);\n      var tData = resData.previewDataMap;\n      $(\"#totalCount\").html(resData.totalCount);\n      $(\"#count\").html(resData.plainCount);\n      $(\"#credit\").html(resData.plainCredit);\n      $(\"#uniCode\").html(resData.unicodeCount);\n      $(\"#uniCodeCr\").html(resData.unicodeCredit);\n      $(\"#smsCr\").html(resData.plainCredit);\n      if (resData.unicodeCredit != 0) {\n        $(\"#smsCr\").html(resData.unicodeCredit);\n      }\n      var html = \"\";\n      Object.keys(tData).forEach(function (key) {\n        console.log(key + ': ' + tData[key]);\n        html = html + \"<tr><td>\" + key + \"</td><td>\" + tData[key] + \"</td></tr>\";\n        console.log(html);\n      });\n      $(\"#tBody\").html(html);\n      $('#messageModal').modal('show');\n    }\n  });\n});\n\n$(\"#sendNow\").click(function () {\n  $(\"#btnPreview\").attr(\"disabled\", true);\n  $(\"#sendNow\").addClass(\"d-none\");\n  const data2 = {};\n\n  $(\"#template-msg-form\").serializeArray().forEach(i => {\n    if (i.value) {\n      data2[i.name] = i.value;\n    }\n  });\n\n  templateList.forEach(function (entry) {\n    if (entry.templateTitle == $('#templateOption').val()) {\n      data2['templateId'] = entry.templateId;\n    }\n  });\n\n  delete data2[\"templateName\"];\n  console.log(data2);\n  console.log(data2['scheduleMessage']);\n  if (data2['scheduleMessage'] == \"no\") {\n    delete data2[\"scheduleDateTime\"];\n  } else {\n    var dateTime = data2[\"scheduleDateTime\"].split(/\\s+/);\n    data2[\"scheduleDate\"] = dateTime[0];\n    var splitTime = dateTime[1].split(\":\");\n    data2[\"scheduleHour\"] = splitTime[0];\n    data2[\"scheduleMinute\"] = splitTime[1];\n    delete data2[\"scheduleDateTime\"];\n  }\n\n  var paramFieldMapping = {};\n  $.each(tparams, function (key, value) {\n    paramFieldMapping[value] = data2[value];\n    delete data2[value];\n  });\n  data2['paramFieldMapping'] = paramFieldMapping;\n  data2['fileName'] = uploadedFileName;\n  const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n  var CName = $(\"#campaignName\").val();\n  data2[\"campaignName\"] = CName;\n\n  var selValue = $(\"input[name='serviceType']:checked\").val();\n  if (selValue == \"trans\" || selValue == \"promo\") {\n    delete data2['serviceSubType'];\n  }\n\n  data2['perMsgCredit'] = $('#smsCr').text();\n\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"sendTemplateSMS\"), \"POST\", $.extend({}, data2, additionalData), { showMainLoader: true }).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(resData)) {\n      console.log(resData.message);\n      $(\"#template-msg-form\")[0].reset();\n      $(\"#campaignName\").val(genCampaignName());\n      $('#messageModal').modal('hide');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n      resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(resData.message));\n    }\n  });\n});\n\n$('#messageModal').on('hidden.bs.modal', function () {\n  // do something…\n  $(\"#btnPreview\").removeAttr(\"disabled\");\n});\n\n$(\"#template-msg-form\").on('reset', function (event) {\n  $(\"#selectFile\").removeAttr(\"disabled\");\n  $(\"#fupload\").removeAttr(\"disabled\");\n  $(\"#btnPreview\").removeAttr(\"disabled\");\n  $(\"#tBody\").html(\"\");\n  $(\"#allParams\").html('');\n  $(\".custom-file-label\").html('Choose File');\n  $(\".scheduleDateGroup\").addClass('d-none');\n  $(\"#sendNow\").removeClass(\"d-none\");\n  var select = document.getElementById(\"mobileNumber\");\n  select.options.length = 0;\n  var template = document.getElementById(\"templateOption\");\n  template.options.length = 1;\n  var senderId = document.getElementById(\"senderId\");\n  senderId.options.length = 1;\n  uploadedFileName = null;\n  loadTemplates();\n});\n\n$(document).ready(function () {\n  const datalist = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    messageType: \"other\",\n    messageSubType: \"\"\n  };\n  var senderIdList = document.getElementById(\"senderIdSelect\");\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"senderIdListByMessageType\"), \"POST\", datalist).done(data => {\n    console.log(data);\n    const tempList = data.data.senderIdList;\n    console.log(tempList);\n    $.each(tempList, function (key, value) {\n      senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);\n    });\n  });\n  $(\".messagetype\").click(function () {\n    var selValue = $(this).val();\n    if (selValue == \"trans\" || selValue == \"promo\") {\n      $(\".service_type\").addClass(\"d-none\");\n    } else {\n      $(\".service_type\").removeClass(\"d-none\");\n    }\n  });\n});\n\n$(\".messagetype\").click(function () {\n  var selValue = $(this).val();\n  if (selValue == \"trans\" || selValue == \"service\") {\n    $('#senderIdSelect').empty().append('<option disabled selected >-- Select --</option>');\n    $('#templatename').empty().append('<option selected value=\"\">-- Select --</option>');\n    const datalist = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      messageType: \"other\",\n      messageSubType: \"\"\n    };\n    var senderIdList = document.getElementById(\"senderIdSelect\");\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"senderIdListByMessageType\"), \"POST\", datalist).done(data => {\n      console.log(data);\n      const tempList = data.data.senderIdList;\n      console.log(tempList);\n      $.each(tempList, function (key, value) {\n        senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);\n      });\n    });\n  } else {\n    $('#senderIdSelect').empty().append('<option disabled selected >-- Select --</option>');\n    $('#templatename').empty().append('<option selected value=\"\">-- Select --</option>');\n    const datalist = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      messageType: selValue,\n      messageSubType: \"\"\n    };\n    var senderIdList = document.getElementById(\"senderIdSelect\");\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"senderIdListByMessageType\"), \"POST\", datalist).done(data => {\n      console.log(data);\n      const tempList = data.data.senderIdList;\n      console.log(tempList);\n      $.each(tempList, function (key, value) {\n        senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);\n      });\n    });\n  }\n});\n\nvar selectTemplateName;\n\n$(\"#senderIdSelectDiv .senderIdSelect\").change(function () {\n  $('#templatename').empty().append('<option selected value=\"\">-- Select --</option>');\n  var senderid = $(this).children(\"option:selected\").val();\n  var serviceType = $(\"input[name=serviceType]:checked\").val();\n  if (serviceType == \"service\") {\n    var service = $(\"input[name=serviceSubType]:checked\").val();\n  } else {\n    var service = \"\";\n  }\n  $(\"input[name=serviceType]:checked\").val();\n  const datalist = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    messageType: serviceType,\n    messageSubType: service,\n    senderId: senderid\n  };\n  var templateTitleSelect = document.getElementById(\"templatename\");\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"viewAllContentTemplateListByMessageType\"), \"POST\", datalist).done(data => {\n    const tempList = data.data.contentTemplateList;\n    selectTemplateName = tempList;\n    $.each(tempList, function (key, value) {\n      templateTitleSelect.options[templateTitleSelect.options.length] = new Option(value.templateTitle, value.templateId);\n    });\n  });\n});\n\n$(\"#templatename\").change(function () {\n  var contentTemplateId = $(this).children(\"option:selected\").val();\n  var txt = selectTemplateName.find(x => x.templateId == contentTemplateId);\n  if (txt) {\n    $(\"#displayTemplateText\").html(txt.templateText);\n    $(\".displayTemplateTextSpan\").removeClass(\"d-none\");\n    $(\"#entityId\").val(txt.entityId);\n    $(\"#operatorTemplateId\").val(txt.operatorTemplateId);\n    $(\"#entityId\").prop(\"readonly\", true);\n    $(\"#operatorTemplateId\").prop(\"readonly\", true);\n  } else {\n    $(\"#displayTemplateText\").html(\"\");\n    $(\".displayTemplateTextSpan\").addClass(\"d-none\");\n    $(\"#entityId\").val('');\n    $(\"#operatorTemplateId\").val('');\n    $(\"#entityId\").removeAttr(\"readonly\");\n    $(\"#operatorTemplateId\").removeAttr(\"readonly\");\n  }\n});\n\n//# sourceURL=webpack:///./src/layouts/template-message/index.js?");

/***/ }),

/***/ "./src/layouts/template-message/styles.css":
/*!*************************************************!*\
  !*** ./src/layouts/template-message/styles.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/template-message/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/template-message/styles.css?");

/***/ })

/******/ });