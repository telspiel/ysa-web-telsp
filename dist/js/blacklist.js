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
/******/ 		"blacklist": 0
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
/******/ 	deferredModules.push(["./src/layouts/blacklist/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/blacklist/styles.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/blacklist/styles.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"\\r\\n.dt-button.btn.btn-danger:hover{\\r\\n    color: #fff !important;\\r\\n    background-color: #ff2d50 !important;\\r\\n    border-color: #ff2046 !important;\\r\\n  }\\r\\n  .dt-button.btn.btn-danger{\\r\\n    color: #fff !important;\\r\\n    background-color: #FF5370 !important;\\r\\n    border-color: #FF5370 !important;\\r\\n    background: #FF5370 !important;\\r\\n  }\\r\\n  \\r\\n  label small{\\r\\n    color: #4099ff;\\r\\n  }\\r\\n\\r\\n  .dt-button.btn.btn-info{\\r\\n    color: #fff !important;\\r\\n    background-color: #00bcd4 !important;\\r\\n    border-color: #00bcd4 !important;\\r\\n    background: #00bcd4 !important;\\r\\n  }\\r\\n  .dt-button.btn {\\r\\n  \\r\\n    display: inline-block;\\r\\n      font-weight: 400;\\r\\n      color: #222;\\r\\n      text-align: center;\\r\\n      vertical-align: middle;\\r\\n      -webkit-user-select: none;\\r\\n      -moz-user-select: none;\\r\\n      -ms-user-select: none;\\r\\n      user-select: none;\\r\\n      background-color: transparent;\\r\\n      border: 1px solid transparent;\\r\\n      padding: 0.375rem 0.95rem;\\r\\n      font-size: 0.875rem;\\r\\n      line-height: 1.5;\\r\\n      border-radius: 2px;\\r\\n      -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\\r\\n      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\\r\\n  }\\r\\n  table.dataTable.table-sm>thead>tr>th{\\r\\n    padding-right: 29px !important;\\r\\n  }\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/blacklist/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/blacklist/index.js":
/*!****************************************!*\
  !*** ./src/layouts/blacklist/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles */ \"./src/layouts/blacklist/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n/* harmony import */ var _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/cookie */ \"./src/scripts/cookie.js\");\n// import \"./../../scripts/app\";\n\n\n\n\n\n\n\nconsole.log(\"Welcome to Global Blacklist\");\n\n//  new Form(Schema).render(\"#add-credits-form\");\n\n$(\"#cancelForm\").click(() => {\n  $(\"#add-gblacklist\")[0].reset();\n});\n\n$(\"#pagePrev\").hide();\n$(\"#pageNext\").hide();\n\n$(\"#listAll\").click(() => {\n  $(\"#search-blacklist-form\")[0].reset();\n  loadAddBlacklistNumbersTable();\n});\n\n$(\"#submitSearch\").click(() => {\n\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    mobileNumber: \"91\" + $(\"#searchMobileNumber\").val(),\n    operation: \"searchUserBlackListNumber\"\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"searchBlacklist\"), \"POST\", data).done(data1 => {\n    if (data1.data) {\n      $(\"#dwnloadBtn\").html(data1.data.downloadReportLink);\n      getDownloadableFile();\n      $(\"#dwnloadBtn #report_donwload\").addClass(\"btn btn-primary\");\n      if (!_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data1)) {\n        return false;\n      }\n      const grid = (data1.data || {}).userBlackListNumberList || [];\n      renderDetailedMis(grid);\n    } else {\n      const grid = [];\n      renderDetailedMis(grid);\n    }\n  });\n});\n\n$(\"#add-gblacklist\").submit(function (e) {\n  e.preventDefault();\n\n  const formData = {};\n\n  $(this).serializeArray().forEach(i => {\n    formData[i.name] = i.value;\n  });\n\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"addUserBlacklistNumber\"\n  };\n\n  // show alert that request is under process\n  _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(\"We are processing your request. Kindly check in sometime.\");\n\n  console.log(formData);\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"addBlackList\"), \"POST\", $.extend({}, formData, additionalData)).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(resData)) {\n      console.log(resData.message);\n      $(\"#add-gblacklist\")[0].reset();\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(resData.message));\n    }\n  });\n});\n\n$(\"#remove-gblacklist\").submit(function (e) {\n  e.preventDefault();\n\n  const formData = {};\n\n  $(this).serializeArray().forEach(i => {\n    formData[i.name] = i.value;\n  });\n\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"removeUserBlacklistNumber\"\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"removeBlackList\"), \"POST\", $.extend({}, formData, additionalData)).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data)) {\n      console.log(data);\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      $(\"#remove-gblacklist\")[0].reset();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(data.message));\n    }\n  });\n});\n/*\n$(\"#upload-gblacklist\").on('reset', function (event) {\n  $(\"#selectFile\").removeAttr(\"disabled\");\n  $(\".custom-file-label\").html('Choose File');\n});\n*/\n\nfunction loadAddBlacklistNumbersTable() {\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"getAllBlackListNumbersForUser\"\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"getAllBlacklist\"), \"POST\", data).done(data1 => {\n    $(\"#dwnloadBtn\").html(data1.data.downloadReportLink);\n    getDownloadableFile();\n    $(\"#dwnloadBtn #report_donwload\").addClass(\"btn btn-primary\");\n    if (!_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data1)) {\n      return false;\n    }\n    const grid = (data1.data || {}).userBlackListNumberList || [];\n    renderDetailedMis(grid);\n  });\n}\nconst renderDetailedMis = data => {\n\n  const grid = data;\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n  const headerRow = grid[0];\n  let tableHeader = [];\n  let formattedTableHeader = [];\n  for (let key in headerRow) {\n    if (headerRow.hasOwnProperty(key)) {\n      tableHeader.push(key);\n      formattedTableHeader.push(getHeading(key));\n    }\n  }\n  const tableData = grid.map(row => {\n    var rowData = [];\n    tableHeader.forEach(key => {\n      rowData.push(row[key] || \"-\");\n    });\n    return rowData;\n  });\n\n  if ($.fn.dataTable.isDataTable('#allBlacklistNumber')) {\n    $('#allBlacklistNumber').DataTable().destroy();\n  }\n\n  var dtable = $('#allBlacklistNumber').DataTable({\n    \"aoColumns\": [{ \"sTitle\": \"<input type='checkbox' id='selectAll'></input>\" }],\n    data: tableData,\n    \"columns\": [{ title: \"id\" }, { title: \"user Id\" }, { title: \"user BlackList Number\" }],\n    dom: 'Bfrtip',\n    'columnDefs': [{\n      'targets': 0,\n      'checkboxes': {\n        'selectRow': true\n      }\n    }, {\n      'targets': 1,\n      visible: false\n    }],\n    'select': {\n      'style': 'multi'\n    },\n    \"order\": [[0, \"asc\"]],\n    buttons: [{\n      text: 'Delete Selected',\n      className: 'btn btn-danger',\n      action: function () {\n        // dtable.rows().select();\n        deleteSelected(dtable);\n      }\n    }]\n  });\n\n  $('body').on('click', function (e) {\n    $('[data-toggle=popover]').each(function () {\n      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {\n        $(this).popover('hide');\n      }\n    });\n  });\n\n  $(\"[data-toggle=popover]\").mousedown(function () {\n    //toggle popover when link is clicked\n    $(this).popover('toggle');\n  });\n\n  function strtrunc(str, max, add) {\n    add = add || '...';\n    return typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str;\n  };\n\n  const totalPageCount = (data.data || {}).totalPageCount || 0;\n  $(\"#totalPages\").val(totalPageCount);\n\n  const pageNumber = +$(\"#pageNumber\").val();\n  if (totalPageCount > pageNumber) {\n    $(\"#pageNext\").show();\n  } else {\n    $(\"#pageNext\").hide();\n  }\n\n  if (pageNumber > 1) {\n    $(\"#pagePrev\").show();\n  } else {\n    $(\"#pagePrev\").hide();\n  }\n};\n\nfunction deleteSelected(dtable) {\n\n  var rows_selected = dtable.column(0).checkboxes.selected();\n\n  // Iterate over all selected checkboxes\n  let rowIdMap = [];\n  $.each(rows_selected, function (index, rowId) {\n    // Create a hidden element\n    rowIdMap.push(rowId);\n  });\n  console.log(rowIdMap);\n\n  const formData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"removeUserBlackListNumber\",\n    numberToBeRemoved: rowIdMap\n  };\n\n  _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(\"We are processing your request. Kindly check in sometime.\");\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"removeBlackList\"), \"POST\", formData).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(resData)) {\n      console.log(resData.message);\n      $(\"#search-blacklist-form\")[0].reset();\n      // $.each(rows_selected, function (index, rowId) {\n      //   dtable.rows(rowId).remove().draw();\n      // });\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      loadAddBlacklistNumbersTable();\n      resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(resData.message));\n    }\n  });\n}\n\n$(\"#upload-gblacklist\").submit(function (e) {\n  e.preventDefault();\n  const selectFile = $(\"#selectFile\").get(0).files[0];\n  var selectedFileName = $(\"#selectFile\").get(0).files[0].name;\n\n  if (!selectFile) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].info(\"Please select a file.\");\n    return;\n  }\n\n  var ar = /^(\\d|\\w|-)+$/;\n  if (ar.test(selectedFileName.split(\".\")[0]) == false) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"File Name should not contain space\", {\n      clearTime: 10 * 1000\n    });\n    return;\n  }\n\n  if ([\"text\", \"text/plain\"].indexOf(selectFile.type) == -1) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"Only .txt files are allowed.\");\n    return;\n  }\n\n  const formData = new FormData();\n  formData.append(\"userName\", _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName());\n  formData.append(\"fileType\", \"txt\");\n  formData.append(\"file\", selectFile);\n  formData.append(\"description\", $(\"#desc\").val());\n\n  _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n  _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(\"File Upload in Progress. . . Please wait for confirmation message\", { clearTime: 60 * 60 * 1000 });\n  console.log(formData);\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"uploadBlacklist\"), \"POST\", formData, {\n    showMainLoader: true,\n    contentType: false,\n    processData: false,\n    data: formData\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data)) {\n      $(\"#upload-gblacklist\")[0].reset();\n      $(\".custom-file-label\").html('Choose File');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(data.message, {\n        clearTime: 60 * 60 * 1000\n      }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(data.message, {\n        clearTime: 60 * 60 * 1000\n      }));\n    }\n  });\n});\nfunction getDownloadableFile() {\n  $('#dwnloadBtn').on('click', 'a', function (e) {\n    e.preventDefault();\n    console.log(this.getAttribute('href'));\n    // Use XMLHttpRequest instead of Jquery $ajax\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function () {\n      var a;\n      if (xhttp.readyState === 4 && xhttp.status === 200) {\n        // Trick for making downloadable link\n        a = document.createElement('a');\n        a.href = window.URL.createObjectURL(xhttp.response);\n        // Give filename you wish to download\n        const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n        a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName() + \"-\" + dTime + \"-blacklist.csv\";\n        a.style.display = 'none';\n        document.body.appendChild(a);\n        a.click();\n      }\n    };\n    // Post data to URL which handles post request\n    xhttp.open(\"GET\", this.getAttribute('href'));\n    xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n    xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"webtoolJWT\"));\n    // You should set responseType as blob for binary responses\n    xhttp.responseType = 'blob';\n    xhttp.send();\n    exit();\n  });\n}\n\n//# sourceURL=webpack:///./src/layouts/blacklist/index.js?");

/***/ }),

/***/ "./src/layouts/blacklist/styles.css":
/*!******************************************!*\
  !*** ./src/layouts/blacklist/styles.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/blacklist/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/blacklist/styles.css?");

/***/ })

/******/ });