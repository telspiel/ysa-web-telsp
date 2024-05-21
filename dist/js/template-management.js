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
/******/ 		"template-management": 0
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
/******/ 	deferredModules.push(["./src/layouts/template-management/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/template-management/styles.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/template-management/styles.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".controls-form button {\\n  background: var(--primary-color);\\n  border-color: var(--primary-color);\\n  width: 50%;\\n}\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n#misTable_filter,#misTable_info{\\ndisplay:none;\\n}\\n\\n.deleteRow{\\n  padding: 10px;\\n    cursor: pointer;\\n}\\n#templatesTable_filter{\\ndisplay:none;\\n}\\n\\nbutton.btn-small{\\n  font-size: 14px;\\n  padding: 10px 20px;\\n}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/template-management/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/template-management/index.js":
/*!**************************************************!*\
  !*** ./src/layouts/template-management/index.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/template-management/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\nconsole.log(\"Welcome to Tempalte Management\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\n$(\"#addParams\").click(function () {\n\n  var msg = $(\"#templateText\").val();\n  var totalLengthallowed = $(\"#variableCount\").val();\n\n  var count = (msg.match(/#P[0-9]#/g) || []).length;\n  console.log(count);\n  if (count < totalLengthallowed) {\n    $(\"#templateText\").val(msg + ' #P' + (count + 1) + '# ');\n  }\n});\n\n$(\"#addTemplate\").submit(function (e) {\n  e.preventDefault();\n\n  const formData = {};\n\n  $(this).serializeArray().forEach(i => {\n    formData[i.name] = i.value;\n  });\n\n  const additionalData = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n\n  var isPlain = true;\n  var plain = new RegExp(\"^[A-Za-z0-9_~\\\\-!:\\\\/.@\\\\|\\\\,#\\\\$%\\\\^&\\\\*\\\\(\\\\)\\n\\s +=\\\\\\\\{}\\\\[\\\\];'\\\"<>?₹]*$\");\n  var msgTxt = $(\"#templateText\").val();\n  //console.log(msgTxt);\n  //console.log(plain);\n  if (plain.test(msgTxt.trim())) {\n    isPlain = true;\n  } else {\n    isPlain = false;\n  }\n  console.log(isPlain);\n  var validForm = true;\n  //  var type = $(\"input[name=msgType]:checked\").val();\n  var type = $(\"input[name=templateType]:checked\").val();\n  //console.log(type);\n  _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n  if (isPlain && type == \"PM\") {\n    validForm = true;\n  } else if (!isPlain && type == \"UM\") {\n    validForm = true;\n  } else {\n    validForm = false;\n    if (isPlain && type == \"UM\") {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"Message Type Mismatch, Please select Message Type Plain to send SMS.\", {\n        clearTime: 10 * 1000\n      });\n    } else {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"Message Type Mismatch, Please select Message Type Unicode to send SMS.\", {\n        clearTime: 10 * 1000\n      });\n    }\n  }\n\n  //console.log( validForm +\"&&\"+ isPlain  );\n\n  //    console.log(formData);\n  if (validForm) {\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"addTemplate\"), \"POST\", $.extend({}, formData, additionalData)).done(resData => {\n      if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(resData)) {\n        _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n        //        console.log(resData.message);\n        $(\"#addTemplate\")[0].reset();\n        resData.message && (resData.code === 6001 ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(resData.message));\n      }\n    });\n  } else {\n    console.log(\"achacho\");\n  }\n});\n\n$(\"#view-template-tab\").click(() => {\n  console.log(\"test\");\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"viewTemplate\"), \"POST\", data).done(data => {\n\n    console.log(data);\n\n    const grid = (data.data || {}).templateList || [];\n    const getHeading = key => {\n      let result = key.replace(/([A-Z])/g, \" $1\");\n      return result.charAt(0).toUpperCase() + result.slice(1);\n    };\n    const headerRow = grid[0];\n    let tableHeader = [];\n    let formattedTableHeader = [];\n    for (let key in headerRow) {\n      if (headerRow.hasOwnProperty(key)) {\n        tableHeader.push(key);\n        formattedTableHeader.push({ title: getHeading(key) });\n      }\n    }\n    const tableData = grid.map(row => {\n      var rowData = [];\n      tableHeader.forEach(key => {\n        rowData.push(row[key] || \"-\");\n      });\n      return rowData;\n    });\n\n    if ($.fn.dataTable.isDataTable('#templatesTable')) {\n      $('#templatesTable').DataTable().destroy();\n    }\n\n    const fHeader = JSON.stringify(formattedTableHeader);\n\n    var dtable = $('#templatesTable').DataTable({\n      \"paging\": false,\n      data: tableData,\n      \"columns\": [{ title: \"S.No.\" }, { title: \"Template Title\" }, { title: \"Template Text\" }, { title: \"Action\" }],\n      \"order\": [[0, \"desc\"]],\n      \"columnDefs\": [{\n        \"targets\": -1,\n        \"data\": null,\n        \"defaultContent\": \"<button class='btn btn-danger'>Delete</button>\"\n      }]\n    });\n\n    dtable.on('order.dt search.dt', function () {\n      dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {\n        cell.innerHTML = i + 1;\n      });\n    }).draw();\n\n    $('#templatesTable tbody').on('click', 'button', function () {\n      var dtable = $('#templatesTable').DataTable();\n      let self = $(this).parents('tr');\n      var data = dtable.row($(this).parents('tr')).data();\n      if (!data) {\n        self = this;\n        data = dtable.row(this).data();\n      }\n      const formData = {\n        loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n        templateTitle: data[1],\n        operation: \"removeTemplateFromList\"\n      };\n      Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"deleteTemplate\"), \"POST\", formData).done(resData => {\n        if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(resData)) {\n          _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n          console.log(resData.message);\n          dtable.row(self).remove().draw();\n          resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(resData.message));\n        }\n      });\n    });\n  });\n});\n\n//# sourceURL=webpack:///./src/layouts/template-management/index.js?");

/***/ }),

/***/ "./src/layouts/template-management/styles.css":
/*!****************************************************!*\
  !*** ./src/layouts/template-management/styles.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/template-management/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/template-management/styles.css?");

/***/ })

/******/ });