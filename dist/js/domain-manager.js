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
/******/ 		"domain-manager": 0
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
/******/ 	deferredModules.push(["./src/layouts/domain-manager/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/domain-manager/styles.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/domain-manager/styles.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".controls-form button {\\n  background: var(--primary-color);\\n  border-color: var(--primary-color);\\n  width: 50%;\\n}\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n#misTable_filter,#misTable_info{\\ndisplay:none;\\n}\\n\\n#groupmgmtTable_info,#groupmgmtTable_filter{\\ndisplay:none;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/domain-manager/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/domain-manager/index.js":
/*!*********************************************!*\
  !*** ./src/layouts/domain-manager/index.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles */ \"./src/layouts/domain-manager/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n// import \"./../../scripts/app\";\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\nconsole.log(\"Welcome to Domain Management!\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\n$(\"#add-host\").submit(function (e) {\n\n  e.preventDefault();\n\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    title: $(\"#title\").val(),\n    domainName: $(\"#domainName\").val()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"addHost\"), \"POST\", data).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(resData)) {\n      console.log(resData.message);\n      $(\"#add-host\")[0].reset();\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(resData.message));\n    }\n  });\n});\n\n$(\"#list\").click(() => {\n  // console.log(\"viewew\");\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"listDomains\"), \"POST\", data).done(data => {\n\n    const grid = (data.data || {}).hostNameList || [];\n    const getHeading = key => {\n      let result = key.replace(/([A-Z])/g, \" $1\");\n      return result.charAt(0).toUpperCase() + result.slice(1);\n    };\n    const headerRow = grid[0];\n    let tableHeader = [];\n    let formattedTableHeader = [];\n    for (let key in headerRow) {\n      if (headerRow.hasOwnProperty(key)) {\n        tableHeader.push(key);\n        formattedTableHeader.push({ title: getHeading(key) });\n      }\n    }\n    const tableData = grid.map(row => {\n      var rowData = [];\n      tableHeader.forEach(key => {\n        rowData.push(row[key] || \"-\");\n      });\n      return rowData;\n    });\n\n    if ($.fn.dataTable.isDataTable('#domainListTable')) {\n      $('#domainListTable').DataTable().destroy();\n    }\n\n    const fHeader = JSON.stringify(formattedTableHeader);\n\n    var dtable = $('#domainListTable').DataTable({\n      \"paging\": false,\n      data: tableData,\n      \"columns\": [{ title: \"S.No.\" }, { title: \"Title \" }, { title: \"Domain \" }, { title: \"Is Active \" }, { title: \"Created Date \" }, { title: \"Is Approved  \" }, { title: \"Action  \" }],\n      \"order\": [[0, \"desc\"]],\n      \"columnDefs\": [{\n        \"targets\": -1,\n        \"data\": null,\n        \"defaultContent\": \"<button class='btn btn-danger'>Delete</button>\"\n      }]\n    });\n    dtable.column(3).visible(false);\n    dtable.on('order.dt search.dt', function () {\n      dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {\n        cell.innerHTML = i + 1;\n      });\n    }).draw();\n\n    $('#domainListTable tbody').on('click', 'button', function () {\n      var dtable = $('#domainListTable').DataTable();\n      var data = dtable.row($(this).parents('tr')).data();\n      //alert( data[0] +\"'s is: \"+ data[1] );\n      //        dtable.row($(this).parents('tr')).remove().draw();\n\n      const formData = {\n        loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n        id: data[0],\n        domainName: data[2],\n        operation: \"removeHostNameFromList\"\n      };\n      Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"deleteDomain\"), \"POST\", formData).done(resData => {\n        if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(resData)) {\n          console.log(resData.message);\n          //        $(\"#add-gpmgmt\")[0].reset();\n          dtable.row($(this).parents('tr')).remove().draw();\n          _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n          resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(resData.message));\n        }\n      });\n    });\n  });\n});\n\n//# sourceURL=webpack:///./src/layouts/domain-manager/index.js?");

/***/ }),

/***/ "./src/layouts/domain-manager/styles.css":
/*!***********************************************!*\
  !*** ./src/layouts/domain-manager/styles.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/domain-manager/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/domain-manager/styles.css?");

/***/ })

/******/ });