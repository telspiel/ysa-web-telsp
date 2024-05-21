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
/******/ 		"short-url": 0
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
/******/ 	deferredModules.push(["./src/layouts/short-url/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/short-url/styles.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/short-url/styles.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".controls-form button {\\n  background: var(--primary-color);\\n  border-color: var(--primary-color);\\n  width: 50%;\\n}\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n#misTable_filter,#misTable_info{\\ndisplay:none;\\n}\\n.custom-control.custom-radio{\\n  display: inline;\\n}\\n\\n#templatesTable_filter{\\ndisplay:none;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/short-url/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/short-url/index.js":
/*!****************************************!*\
  !*** ./src/layouts/short-url/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/short-url/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\nconsole.log(\"Welcome to Short URL\");\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\nconst data = {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n};\n\nvar domainSelect = document.getElementById(\"domain\");\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getApprovedDomainList\"), \"POST\", data).done(data => {\n  const gpList = data.data.hostNameList;\n  console.log(gpList);\n  $.each(gpList, function (key, value) {\n    domainSelect.options[domainSelect.options.length] = new Option(value.domainName, value.domainName);\n  });\n});\n\n$(\"#addShortUrl\").submit(function (e) {\n  e.preventDefault();\n  const formData = {};\n  $(this).serializeArray().forEach(i => {\n    formData[i.name] = i.value;\n  });\n  formData[\"longUrl\"] = $(\"#domainUrl\").val() + \"\" + formData[\"longUrl\"];\n  if (formData[\"callbackUrl\"]) {\n    formData[\"callbackUrl\"] = $(\"#callBackDomainUrl\").val() + \"\" + formData[\"callbackUrl\"];\n  }\n\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"addShortUrl\"), \"POST\", $.extend({}, formData, additionalData)).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(resData)) {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n      if (resData.code === 11001) {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(resData.message);\n        $(\"#shortUrlCode\").val(resData.data.data.shortCode);\n        $(\"#saveBtn\").prop('disabled', true);\n      } else {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(resData.message);\n        $(\"#addShortUrl\")[0].reset();\n      }\n    }\n  });\n});\n\n$('#addShortUrl').on('reset', function (e) {\n  $(\"#saveBtn\").prop('disabled', false);\n});\n\n$('#view').click(function () {\n  fetchViewData();\n});\n\n$(\"#updateSpielyLink\").click(function () {\n\n  $(\"#editAddModal\").modal('hide');\n  const formData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    shortUrlId: $(\"#editAddModal .urlId\").text(),\n    operation: \"editshorturl\",\n    callbackUrl: $(\"#editCallBackDomainUrl\").val() + \"\" + $(\"#editCallbackUrl\").val(),\n    name: $(\"#editAddModal .urlName\").text()\n  };\n\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"editShortUrl\"), \"POST\", formData).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(resData)) {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n      if (resData.result === \"Success\") {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(resData.message);\n        fetchViewData();\n      } else {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(resData.message);\n      }\n    }\n  });\n});\n\nfunction fetchViewData() {\n\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"listShortUrl\"), \"POST\", additionalData).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(resData)) {\n      // console.log(resData);\n      const grid = (resData.data || {}).shortUrlList || [];\n      buildViewTable(grid);\n    }\n  });\n}\nfunction buildViewTable(grid) {\n\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n  const headerRow = grid[0];\n  let tableHeader = [];\n  let formattedTableHeader = [];\n  for (let key in headerRow) {\n    if (headerRow.hasOwnProperty(key)) {\n      tableHeader.push(key);\n      formattedTableHeader.push({ title: getHeading(key) });\n    }\n  }\n  const tableData = grid.map(row => {\n    var rowData = [];\n    tableHeader.forEach(key => {\n      rowData.push(row[key] || \"-\");\n    });\n    return rowData;\n  });\n\n  if ($.fn.dataTable.isDataTable('#listShortUrl')) {\n    // $('#listShortUrl').DataTable().destroy();\n    var table = $('#listShortUrl').DataTable();\n    table.clear().destroy();\n  }\n\n  const fHeader = JSON.stringify(formattedTableHeader);\n\n  var dtable = $('#listShortUrl').DataTable({\n    \"paging\": false,\n    data: tableData,\n    \"columns\": [{ title: \"User name\" }, { title: \"S.No\" }, { title: \"Name\" }, { title: \"long Url\" }, { title: \"shortCode\" }, { title: \"callback Url\", className: \"text-wrap\" }, { title: \"is Active\" }, { title: \"is Dynamic\" }, { title: \"created Date\" }, { title: \"Action\" }],\n    \"order\": [[0, \"desc\"]],\n    \"columnDefs\": [{\n      \"targets\": -1,\n      \"data\": null,\n      \"defaultContent\": \"<button class='btn edit'>Edit</button>&nbsp;&nbsp;<button class='btn btn-danger detele'>Delete</button>\"\n    }],\n    \"rowCallback\": function (row, data, index) {\n      if (data[5] != \"-\") {\n        let btn = $(\"td:eq(9)\", row).find('button.edit');\n        btn.text(\"Edit Callback Url\");\n        btn.addClass(\"btn-info\");\n      } else {\n        let btn = $(\"td:eq(9)\", row).find('button.edit');\n        btn.text(\"Add Callback Url\");\n        btn.addClass(\"btn-primary\");\n      }\n    }\n  });\n  dtable.column(0).visible(false);\n  dtable.column(3).visible(false);\n  dtable.column(8).visible(false);\n  dtable.on('order.dt search.dt', function () {\n    dtable.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {\n      cell.innerHTML = i + 1;\n    });\n  }).draw();\n\n  $('#listShortUrl tbody').on('click', 'button.detele', function (e) {\n    e.preventDefault();\n    var dtable = $('#listShortUrl').DataTable();\n    // var data = dtable.row($(this).parents('tr')).data();\n\n    let self = $(this).parents('tr');\n    var data = dtable.row($(this).parents('tr')).data();\n    if (!data) {\n      self = this;\n      data = dtable.row(this).data();\n    }\n\n    const formData = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      shortUrlId: data[1],\n      operation: \"removeShortUrlFromList\"\n    };\n\n    // if (confirm('Are You Sure you want to delete ?')) {\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"deleteShortUrl\"), \"POST\", formData).done(resData => {\n      if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(resData)) {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        dtable.row($(this).parents('tr')).remove().draw();\n        resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(resData.message));\n      }\n    });\n    // }\n  });\n\n  $('#listShortUrl tbody').on('click', 'button.edit', function () {\n    var dtable = $('#listShortUrl').DataTable();\n    // var data = dtable.row($(this).parents('tr')).data();\n\n    let self = $(this).parents('tr');\n    var data = dtable.row($(this).parents('tr')).data();\n    if (!data) {\n      self = this;\n      data = dtable.row(this).data();\n    }\n    $(\"#editCallbackUrl\").val(\"\");\n    $(\"#editAddModal .urlName\").text(data[2]);\n    $(\"#editAddModal .urlId\").text(data[1]);\n    $(\"#editAddModal\").modal('show');\n  });\n}\n\n//# sourceURL=webpack:///./src/layouts/short-url/index.js?");

/***/ }),

/***/ "./src/layouts/short-url/styles.css":
/*!******************************************!*\
  !*** ./src/layouts/short-url/styles.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/short-url/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/short-url/styles.css?");

/***/ })

/******/ });