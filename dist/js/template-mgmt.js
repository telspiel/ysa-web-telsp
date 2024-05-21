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
/******/ 		"template-mgmt": 0
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
/******/ 	deferredModules.push(["./src/layouts/template-mgmt/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/template-mgmt/styles.css":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/template-mgmt/styles.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".controls-form button {\\n  background: var(--primary-color);\\n  border-color: var(--primary-color);\\n  width: 50%;\\n}\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n#misTable_filter,#misTable_info{\\ndisplay:none;\\n}\\n\\n.deleteRow{\\n  padding: 10px;\\n    cursor: pointer;\\n}\\n#templatesTable_filter{\\ndisplay:none;\\n}\\n\\nbutton.btn-small{\\n  font-size: 14px;\\n  padding: 10px 20px;\\n}\\nbutton#insertVar{\\nmargin-left: 0\\n}\\n\\ninput::-webkit-outer-spin-button,\\ninput::-webkit-inner-spin-button {\\n  -webkit-appearance: none;\\n  margin: 0;\\n}\\nspan.dtr-data{\\n  white-space: pre-wrap;\\n}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/template-mgmt/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/template-mgmt/index.js":
/*!********************************************!*\
  !*** ./src/layouts/template-mgmt/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles */ \"./src/layouts/template-mgmt/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n// import \"./../../scripts/app\";\n\n\n\n\n\n\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\nconst data = {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName()\n};\n\n$(document).ready(function () {\n\n  // var parentElement = $(\"select.form-control\")\n\n  // $('#senderId').select2({\n  //   placeholder: \"Select Sender ID\",\n  //   allowClear: true,\n  //   dropdownParent: parentElement\n  // });\n\n  // initalize select2\n\n  // $('.select2').select2();\n\n  $(\"#view-campaign-tab\").click(function (e) {\n    $('.pcoded-content').css('zoom', '0.9');\n  });\n\n  $(\"#upload-campaign-tab\").click(function (e) {\n    $('.pcoded-content').css('zoom', '0.9');\n  });\n\n  $(\"#insertVar\").click(function (e) {\n    $(\"#templateText\").val($(\"#templateText\").val() + \"{#var#}\");\n  });\n\n  $('#operatorId').on('change', function () {\n    var selectedOperator = $(this).val();\n\n    // Map operator values to corresponding file URLs\n    var fileMap = {\n      'VIL': 'voda_format_new.csv',\n      'JIO': 'JIO_new_format.xlsx',\n      'AIRTEL': 'airtel_file.csv',\n      'VIDEOCON': 'Videcon_new_format.xlsx',\n      'ALL': 'Videcon_new_format.xlsx'\n    };\n\n    if (selectedOperator in fileMap) {\n      var fileUrl = fileMap[selectedOperator];\n      $('#sampleFileLink').attr('href', fileUrl).show();\n    } else {\n      $('#sampleFileLink').hide();\n      // Handle if no file is available for the selected operator\n      alert(\"No reference file available for the selected operator.\");\n    }\n  });\n});\n\n$(\"#add\").click(function (e) {\n  $('.pcoded-content').css('zoom', '1');\n});\n\n$(\"#senderId\").change(function () {\n  var selValue = $(this).val();\n  let found = listSenderID.filter(function (senderID) {\n    return senderID.senderId === selValue;\n  })[0].entityId;\n  $(\"#entityId\").val(found);\n});\n\n$(\"#template-msg-form\").submit(function (e) {\n  e.preventDefault();\n\n  let isPlain = checkTextType($(\"#templateText\").val());\n  var mapType = $(\"input[name=templateType]:checked\").val();\n  var isValid = true;\n  _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n  if (mapType == \"UC\" && isPlain) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"Plain Text only found in Message Text. Please change the Type\");\n    isValid = false;\n  } else if (mapType == \"PM\" && !isPlain) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"Unicode Text found in Message Text. Please change the Type\");\n    isValid = false;\n  }\n  if (!isValid) {\n    return;\n  }\n  $('#messageModal').modal('show');\n});\n$(\"#templateTitle\").blur(function () {\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"addContentTemplate\",\n    templateTitle: $('#templateTitle').val()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"saveTemplate\"), \"POST\", data).done(data1 => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data1)) {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      if (data1.result === \"Failure\") {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(data1.message, {\n          clearTime: 10 * 1000\n        });\n      } else {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"Content Template Name is valid\", {\n          clearTime: 10 * 1000\n        });\n      }\n      $('#messageModal').modal('hide');\n      // console.log(resData);\n      $(\"#template-msg-form\")[0].reset();\n    }\n  });\n});\n\n$(\"#sendNow\").click(function () {\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"addContentTemplate\",\n    userId: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getUserId(),\n    variableCount: variableCount()\n  };\n  const data2 = {};\n\n  $(\"#template-msg-form\").serializeArray().forEach(i => {\n    data2[i.name] = i.value;\n  });\n\n  var selValue = $(\"input[name='contentTemplateType']:checked\").val();\n  // console.log(selValue);\n  if (selValue == \"trans\" || selValue == \"promo\") {\n    delete data2['contentTemplateSubType'];\n  }\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"saveTemplate\"), \"POST\", $.extend({}, data, data2), { showMainLoader: true }).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(resData)) {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(resData.message));\n      $('#messageModal').modal('hide');\n      // console.log(resData);\n      $(\"#template-msg-form\")[0].reset();\n    }\n  });\n});\n\n$('#messageModal').on('shown.bs.modal', function (e) {\n  $(\"#templateTitleTxt\").html($(\"#templateTitle\").val());\n  $(\"#templateTypeTxt\").html($(\"input[name='templateType']\").val());\n  $(\"#templateTextTxt\").html($(\"#templateText\").val());\n  $(\"#senderIdTxt\").html($(\"#senderId\").val());\n  $(\"#statusTxt\").html($(\"#status\").val());\n  $(\"#operatorTemplateIdTxt\").html($(\"#operatorTemplateId\").val());\n\n  var tempType = $(\"input[name='contentTemplateType']:checked\").parent().find('label').text();\n  if (tempType == 'Service') {\n    $(\".serviceTypeModal\").removeClass('d-none');\n    $(\"#serviceType\").html($(\"input[name='contentTemplateSubType']:checked\").parent().find('label').text());\n  } else {\n    $(\".serviceTypeModal\").addClass('d-none');\n    $(\"#serviceType\").html(\"-\");\n  }\n  $(\"#templateType\").html(tempType);\n\n  $(\"#variableCount\").html(variableCount());\n});\n\nfunction variableCount() {\n  var msg = $(\"#templateText\").val();\n  var count = (msg.match(/{#var#}/g) || []).length;\n  return count;\n}\n\nconst defaultData = {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName()\n};\n\n$(\"#view-campaign-tab\").click(function (e) {\n  renderTable(\"tavleViewTemplate\", defaultData);\n});\n\nfunction renderTable(id, reqData) {\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"viewAllTemplates\"), \"POST\", reqData).done(data => {\n\n    const grid = (data.data || {}).contentTemplateList || [];\n    const getHeading = key => {\n      let result = key.replace(/([A-Z])/g, \" $1\");\n      return result.charAt(0).toUpperCase() + result.slice(1);\n    };\n    const headerRow = grid[0];\n    let tableHeader = [];\n    let formattedTableHeader = [];\n    for (let key in headerRow) {\n      if (headerRow.hasOwnProperty(key)) {\n        tableHeader.push(key);\n        formattedTableHeader.push({ title: getHeading(key) });\n      }\n    }\n    const tableData = grid.map(row => {\n      var rowData = [];\n      tableHeader.forEach(key => {\n        rowData.push(row[key] || \"-\");\n      });\n      return rowData;\n    });\n    $('#' + id).html(\"\");\n    if ($.fn.dataTable.isDataTable('#' + id)) {\n      $('#' + id).DataTable().destroy();\n    }\n\n    const fHeader = JSON.stringify(formattedTableHeader);\n\n    var dtable = $('#' + id).DataTable({\n      \"paging\": false,\n      colReorder: {\n        order: [1, 5, 6, 2, 4, 0, 7, 8, 9, 10, 11]\n      },\n      data: tableData,\n      \"columns\": [{ title: \"Template ID\" }, { title: \"template Id\" }, { title: \"sender Id\" }, { title: \"createdDate\" }, { title: \"status\" }, { title: \"template Title\" }, { title: \"template Description\", className: \"text-wrap\" }, { title: \"template Text\", className: \"text-wrap\" }, { title: \"content Template Type\" }, { title: \"content Template SubType\" }, { title: \"entity Id\" }, { title: \"action\" }],\n      // \"order\": [[0, \"desc\"]],\n      \"columnDefs\": [{ responsivePriority: 10001, targets: 7, className: \"text-wrap\" }, { responsivePriority: 10002, targets: 9 }, { responsivePriority: 10003, targets: 10 }, {\n        \"targets\": -1,\n        \"data\": null,\n        \"defaultContent\": \"<button class='btn btn-danger'>Delete</button>\"\n      }, {\n        \"targets\": [3, 1],\n        \"visible\": false,\n        \"searchable\": false\n      }]\n    });\n\n    const totalPageCount = (data.data || {}).totalPageCount || 0;\n    $(\"#totalPages\").val(totalPageCount);\n    const pageNumber = +$(\"#pageNumber\").val();\n    if (totalPageCount > pageNumber) {\n      $(\"#pageNext\").show();\n    } else {\n      $(\"#pageNext\").hide();\n    }\n    if (pageNumber >= 1) {\n      $(\"#pagePrev\").show();\n    } else {\n      $(\"#pagePrev\").hide();\n    }\n\n    $('#' + id + ' tbody').on('click', 'button', function () {\n      var otable = $('#' + id).DataTable();\n      var data = otable.row($(this).parents('tr')).data();\n      if (!data) {\n        data = otable.row(this).data();\n      }\n      // console.log(data);\n      const formData = {\n        loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n        operatorTemplateId: data[5],\n        templateName: data[1],\n        operation: \"removeTemplateFromList\"\n      };\n      Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"deleteContentTemplate\"), \"POST\", formData).done(resData => {\n        if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(resData)) {\n          // console.log(resData.message);\n          otable.row($(this).parents('tr')).remove().draw();\n          renderTable(\"tavleViewTemplate\", defaultData);\n          _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n          resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(resData.message));\n        }\n      });\n    });\n  });\n}\n\nfunction checkTextType(data) {\n  // dollar in plain text\n  var plain = new RegExp(\"^[A-Za-z0-9_~\\\\-!:\\\\/.@\\\\|\\\\,#\\\\$%\\\\^&\\\\*\\\\(\\\\)\\n\\s +=\\\\\\\\{}\\\\[\\\\];'\\\"<>?]*$\");\n  if (plain.test(data.trim())) {\n    return true;\n  } else {\n    return false;\n  }\n}\n\n$(document).ready(function () {\n  $(\"#template-msg-form [type=radio]\").click(function () {\n    var selValue = $(\"input[name='contentTemplateType']:checked\").val();\n    if (selValue == \"trans\" || selValue == \"promo\") {\n      $(\".service_type\").addClass(\"d-none\");\n    } else {\n      $(\".service_type\").removeClass(\"d-none\");\n    }\n\n    if (selValue !== \"promo\") {\n      data['messageType'] = \"others\";\n    } else {\n      data['messageType'] = selValue;\n    }\n    if (selValue == \"service\") {\n      data['messageSubType'] = $(\"input[name='contentTemplateSubType']:checked\").val();\n    } else {\n      // data['messageSubType'] = \"\";\n      delete data['messageSubType'];\n    }\n    loadSenderId(data);\n  });\n  var selValue = $(\"input[name='contentTemplateType']:checked\").val();\n  if (selValue !== \"promo\") {\n    data['messageType'] = \"others\";\n  } else {\n    data['messageType'] = selValue;\n  }\n  if (selValue == \"service\") {\n    data['messageSubType'] = $(\"input[name='contentTemplateSubType']:checked\").val();\n  } else {\n    // data['messageSubType'] = \"\";\n    delete data['messageSubType'];\n  }\n  loadSenderId(data);\n});\n\nvar listSenderID;\nfunction loadSenderId(userInput) {\n  var senderIDSelect = document.getElementById(\"senderId\");\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"viewSenderIdListByMessageType\"), \"POST\", userInput, {\n    showMainLoader: true\n  }).done(data => {\n    const gpList = data.data.senderIdList;\n    listSenderID = gpList;\n    senderIDSelect.options.length = 1;\n    $.each(gpList, function (key, value) {\n      senderIDSelect.options[senderIDSelect.options.length] = new Option(value.senderId, value.senderId);\n    });\n    $(\"#senderId\").select2();\n  });\n}\n\n$(\"#upload-content-template-form\").submit(function (e) {\n  e.preventDefault();\n  const selectFile = $(\"#selectFile\").get(0).files[0];\n  var selectedFileName = $(\"#selectFile\").get(0).files[0].name;\n  console.log(selectFile.type);\n  _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n  if (!selectFile) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].info(\"Please select a file.\");\n    return;\n  }\n\n  var ar = /^(\\d|\\w|-)+$/;\n  if (ar.test(selectedFileName.split(\".\")[0]) == false) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"File Name should not contain space\", {\n      clearTime: 10 * 1000\n    });\n    return;\n  }\n  var fileTypeExtension = $(\"input[name='fileTypes']:checked\").val();\n  var extension = selectedFileName.substr(selectedFileName.lastIndexOf('.') + 1);\n\n  if (extension != fileTypeExtension) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"File Type Mismatch\");\n    return;\n  }\n  if ([\"csv\", \"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\", \"application/vnd.ms-excel\", \"text/csv\"].indexOf(selectFile.type) == -1) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"Only  csv,xlsx,xls files are allowed.\");\n    return;\n  }\n\n  const formData = new FormData();\n  formData.append(\"userName\", _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName());\n  formData.append(\"fileType\", $(\"input[name='fileType']:checked\").val());\n  formData.append(\"file\", selectFile);\n  formData.append(\"entityId\", $(\"#entityIdUploadPage\").val());\n  formData.append(\"operatorId\", $(\"#operatorId\").val());\n\n  // console.log(formData);\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"dltDataFile\"), \"POST\", formData, {\n    showMainLoader: true,\n    contentType: false,\n    processData: false,\n    data: formData\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data)) {\n      $(\"#upload-gblacklist\")[0].reset();\n      $(\".custom-file-label\").html('Choose File');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(data.message, {\n        clearTime: 60 * 60 * 1000\n      }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(data.message, {\n        clearTime: 60 * 60 * 1000\n      }));\n    }\n  });\n});\n\n$(\".custom-file-input\").on(\"change\", function () {\n  var fileName = $(this).val().split(\"\\\\\").pop();\n  if (fileName.length >= 30) {\n    fileName = fileName.slice(0, 30) + \"....\";\n  }\n  if (!fileName) {\n    fileName = \"Choose file\";\n  }\n\n  $(this).siblings(\".custom-file-label\").addClass(\"selected\").html(fileName);\n});\n$(\"#upload-content-template-form\").on('reset', function (event) {\n  $(\".custom-file-label\").html(\"Choose file\");\n});\n$(\"#upload-gblacklist .fileType\").click(function () {\n  var type = $(this).val();\n  if (type == \"HEADER_FILE\") {\n    $(\"#upload-gblacklist .tmpfile\").addClass(\"d-none\");\n    $('#upload-gblacklist #fileTypes-0')[0].checked = true;\n  } else {\n    $(\"#upload-gblacklist .tmpfile\").removeClass(\"d-none\");\n  }\n});\nvar contentTempType = $(\"input[name='fileType']:checked\").val();\nif (contentTempType == \"HEADER_FILE\") {\n  $(\"#upload-gblacklist .tmpfile\").addClass(\"d-none\");\n  $('#upload-gblacklist #fileTypes-0')[0].checked = true;\n} else {\n  $(\"#upload-gblacklist .tmpfile\").removeClass(\"d-none\");\n}\n\n//# sourceURL=webpack:///./src/layouts/template-mgmt/index.js?");

/***/ }),

/***/ "./src/layouts/template-mgmt/styles.css":
/*!**********************************************!*\
  !*** ./src/layouts/template-mgmt/styles.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/template-mgmt/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/template-mgmt/styles.css?");

/***/ })

/******/ });