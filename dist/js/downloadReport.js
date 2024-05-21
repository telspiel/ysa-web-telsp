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
/******/ 		"downloadReport": 0
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
/******/ 	deferredModules.push(["./src/layouts/downloadReport/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/downloadReport/styles.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/downloadReport/styles.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".controls-form button {\\n  background: var(--primary-color);\\n  border-color: var(--primary-color);\\n  width: 50%;\\n}\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n#misTable_filter,#misTable_info{\\ndisplay:none;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/downloadReport/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/downloadReport/index.js":
/*!*********************************************!*\
  !*** ./src/layouts/downloadReport/index.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/downloadReport/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n/* harmony import */ var _scripts_cookie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../scripts/cookie */ \"./src/scripts/cookie.js\");\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\nconsole.log(\"Welcome to detailed mis!\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\n$(\"#fromDate,#toDate\").datetimepicker({\n  timepicker: false,\n  maxDate: '0',\n  value: '12.03.2013',\n  dateFormat: 'dd-mm-yyyy',\n  //value: '12.03.2013',\n  format: 'd-m-Y',\n  closeOnDateSelect: true\n}).attr('readonly', 'readonly');\n\nconst renderDetailedMis = data => {\n  if (!_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    return false;\n  }\n  const grid = (data.data || {}).grid || [];\n  // grid.reverse();\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n  const headerRow = grid[0];\n  let tableHeader = [\"id\"];\n  let formattedTableHeader = [];\n  for (let key in headerRow) {\n    if (headerRow.hasOwnProperty(key)) {\n      tableHeader.push(key);\n      formattedTableHeader.push(getHeading(key));\n    }\n  }\n  for (let g in grid) {\n    let a = grid[g];\n    a['id'] = g;\n  }\n\n  // console.log(grid);\n  const tableData = grid.map(row => {\n    var rowData = [];\n    tableHeader.forEach(key => {\n      var url = key;\n      // if (url.charAt(0) === '\"' && url.charAt(url.length - 1) === '\"') {\n      //   console.log(url.substr(1, url.length - 2));\n      // }\n      rowData.push(row[url] || \"-\");\n    });\n    return rowData;\n  });\n\n  //  $(\"#misTable\").html(table({ formattedTableHeader, tableData }));\n  // var td = tableData.reverse();\n  if ($.fn.dataTable.isDataTable('#misTable')) {\n    $('#misTable').DataTable().destroy();\n  }\n\n  $('#misTable').DataTable({\n    data: tableData,\n    bPaginate: false,\n    order: [[0, \"desc\"]],\n    // colReorder: {\n    //     order: [ 0,5,6,1,2,3,7,8,9]\n    // },\n    \"columns\": [{ title: \"id\" }, { title: \"From Date\" }, { title: \"To Date\" }, { title: \"Status\" }, { title: \"Download Report Link\" }, { title: \"Campaign Name\" }],\n\n    colReorder: {\n      order: [0, 1, 2, 5, 3, 4]\n    },\n    \"columnDefs\": [{\n      \"targets\": [0],\n      \"visible\": false,\n      \"searchable\": false\n    }]\n  });\n\n  $('#misTable tbody').on('click', 'a', function (e) {\n\n    e.preventDefault();\n\n    getDownloadableFile(this.getAttribute('href'));\n\n    // console.log(this.getAttribute('href'));\n    //   Request(this.getAttribute('href'), \"GET\").done(resData => {\n    //   });\n  });\n\n  const totalPageCount = (data.data || {}).totalPageCount || 0;\n  $(\"#totalPages\").val(totalPageCount);\n\n  const pageNumber = +$(\"#pageNumber\").val();\n  if (totalPageCount > pageNumber) {\n    $(\"#pageNext\").show();\n  } else {\n    $(\"#pageNext\").hide();\n  }\n\n  if (pageNumber > 1) {\n    $(\"#pagePrev\").show();\n  } else {\n    $(\"#pagePrev\").hide();\n  }\n};\n\nconst now = moment(new Date()).format(\"DD-MM-YYYY\");\n\n$(() => {\n\n  $(\"#controls-form\").submit(function (e) {\n    var campid = $('#campaignNameDiv .campaignName option:selected').val();\n    var campName = $('#campaignNameDiv .campaignName option:selected').text();\n    if (campName == \"ALL\") {\n      campName = \"\";\n      campid = \"0\";\n    }\n    e.preventDefault();\n    const data = {\n      username: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      fromDate: this[0].value,\n      toDate: this[1].value,\n      // mobileNumber: this[2].value,\n      pageNumber: +this[3].value,\n      campaignId: campid,\n      campaignName: campName,\n      extension: \"csv\"\n    };\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"generateReport\"), \"POST\", data, {\n      showMainLoader: true\n    }).done(data => {\n      renderDetailedMis(data);\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n        clearTime: 10 * 1000\n      }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(data.message, {\n        clearTime: 10 * 1000\n      }));\n    });\n  });\n  $(\"#pageNext\").click(() => {\n    const pageNumber = +$(\"#pageNumber\").val();\n    const totalPages = +$(\"#totalPages\").val();\n    if (pageNumber < totalPages) {\n      $(\"#pageNumber\").val(pageNumber + 1);\n      $(\"#controls-form\").submit();\n    }\n  });\n  $(\"#pagePrev\").click(() => {\n    const pageNumber = +$(\"#pageNumber\").val();\n    if (pageNumber > 1) {\n      $(\"#pageNumber\").val(pageNumber - 1);\n      $(\"#controls-form\").submit();\n    }\n  });\n});\n\nvar campid = $('#campaignNameDiv .campaignName option:selected').val();\nvar campName = $('#campaignNameDiv .campaignName option:selected').text();\nconst data = {\n  username: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n  fromDate: now,\n  toDate: now,\n  // mobileNumber: \"\",\n  pageNumber: 1,\n  campaignId: campid,\n  campaignName: campName\n\n};\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"downloadReport\"), \"POST\", data).done(data => {\n  renderDetailedMis(data);\n  _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n  data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data.message, {\n    clearTime: 10 * 1000\n  }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(data.message, {\n    clearTime: 10 * 1000\n  }));\n});\n\nfunction getDownloadableFile(url) {\n  // Use XMLHttpRequest instead of Jquery $ajax\n  var xhttp = new XMLHttpRequest();\n  xhttp.onreadystatechange = function () {\n    var a;\n    if (xhttp.readyState === 4 && xhttp.status === 200) {\n      // Trick for making downloadable link\n      a = document.createElement('a');\n      a.href = window.URL.createObjectURL(xhttp.response);\n      // Give filename you wish to download\n      const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n      a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName() + \"-\" + dTime + \".zip\";\n      a.style.display = 'none';\n      document.body.appendChild(a);\n      a.click();\n    }\n  };\n  // Post data to URL which handles post request\n  xhttp.open(\"GET\", url);\n  xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n  xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n  xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n  xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n  xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"webtoolJWT\"));\n  // You should set responseType as blob for binary responses\n  xhttp.responseType = 'blob';\n  xhttp.send();\n  exit();\n}\n\n// Get Campaign Name\n$(\"#controls-form .downloadReportDate\").blur(function () {\n  var camapaignNameSelected = document.querySelector(\"#campaignNameDiv .campaignName\");\n  var newFromDate = $(\"#fromDate\").val().split(\"-\").reverse().join(\"-\");\n  var newToDate = $(\"#toDate\").val().split(\"-\").reverse().join(\"-\");\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    fromDate: newFromDate,\n    toDate: newToDate\n    // pageNumber: 50,\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"campaignReport\"), \"POST\", data, {\n    showMainLoader: true\n  }).done(data1 => {\n\n    const aList = data1.data.grid;\n    console.log(data1.data.grid);\n    camapaignNameSelected.options.length = 1;\n    $.each(aList, function (key, value) {\n      camapaignNameSelected.options[camapaignNameSelected.options.length] = new Option(data1.data.grid[key].campaignName, data1.data.grid[key].campaignId);\n    });\n  });\n});\n\nvar camapaignNameSelected = document.querySelector(\"#campaignNameDiv .campaignName\");\nvar newFromDate = $(\"#fromDate\").val().split(\"-\").reverse().join(\"-\");\nvar newToDate = $(\"#toDate\").val().split(\"-\").reverse().join(\"-\");\nconst datas = {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n  fromDate: newFromDate,\n  toDate: newToDate\n  // pageNumber: 50,\n};\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"campaignReport\"), \"POST\", datas, {\n  showMainLoader: true\n}).done(data1 => {\n  const aList = data1.data.grid;\n  console.log(data1.data.grid);\n  camapaignNameSelected.options.length = 1;\n  $.each(aList, function (key, value) {\n    camapaignNameSelected.options[camapaignNameSelected.options.length] = new Option(data1.data.grid[key].campaignName, data1.data.grid[key].campaignId);\n  });\n});\n\n//# sourceURL=webpack:///./src/layouts/downloadReport/index.js?");

/***/ }),

/***/ "./src/layouts/downloadReport/styles.css":
/*!***********************************************!*\
  !*** ./src/layouts/downloadReport/styles.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/downloadReport/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/downloadReport/styles.css?");

/***/ })

/******/ });