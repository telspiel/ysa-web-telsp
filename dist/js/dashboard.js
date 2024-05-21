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
/******/ 		"dashboard": 0
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
/******/ 	deferredModules.push(["./src/layouts/dashboard/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/dashboard/styles.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/dashboard/styles.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".chat-icon{\\r\\n    position: fixed;\\r\\n    right: 30px;\\r\\n    bottom: 30px;\\r\\n    font-size: 60px;\\r\\n    color: #cb17b3;\\r\\n    cursor: pointer;\\r\\n    z-index: 1000;\\r\\n}\\r\\n\\r\\n.chat-box{\\r\\n    position: fixed;\\r\\n    right: 30px;\\r\\n    bottom: 100px;\\r\\n    width: 400px;\\r\\n    height: 78vh;\\r\\n    background: #e6cdf0;\\r\\n    z-index: 1000;\\r\\n    transition: all 0.3s ease-out;\\r\\n    transform: scaleY(0);\\r\\n}\\r\\n\\r\\n.chat-box.active{\\r\\n    transform: scaleY(1);\\r\\n\\r\\n}\\r\\n\\r\\n.hidden{\\r\\n    display: none !important;\\r\\n}\\r\\n\\r\\n.conv-form-wrapper textarea{\\r\\n    height: 20px;\\r\\n    overflow: hidden;\\r\\n    resize: none;\\r\\n}\\r\\n\\r\\n\\r\\n#messages{\\r\\n    padding: 20px;\\r\\n\\r\\n}\\r\\n\\r\\n/* alert-warning in middle of screen &&  */\\r\\n\\r\\n.alert{\\r\\n    position:fixed; \\r\\n    top: 0px; \\r\\n    left: 0px; \\r\\n    width: 100%;\\r\\n    z-index:9999; \\r\\n    border-radius:0px;\\r\\n    background-color: #f8d7da;\\r\\n    color: #721c24;\\r\\n    border: 1px solid #f5c6cb;\\r\\n    padding: 15px;\\r\\n    text-align: center;\\r\\n    font-size: 14px;\\r\\n    margin-bottom: 20px; \\r\\n     \\r\\n}\\r\\n\\r\\n/*blur full screen except alert*/\\r\\n\\r\\n.blur{\\r\\n    position: fixed;\\r\\n    top: 0px;\\r\\n    left: 0px;\\r\\n    width: 100%;\\r\\n    height: 100%;\\r\\n    z-index: -1;\\r\\n    background-color: #000000;\\r\\n    opacity: 0.5;\\r\\n    pointer-events: none;\\r\\n}\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/dashboard/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/dashboard/index.js":
/*!****************************************!*\
  !*** ./src/layouts/dashboard/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/dashboard/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n\n\n\n\n\n\n\nconst stats = __webpack_require__(/*! ./../../partials/dashboard/stats.hbs */ \"./src/partials/dashboard/stats.hbs\");\nconst carousel = __webpack_require__(/*! ./../../partials/carousel.hbs */ \"./src/partials/carousel.hbs\");\n\nconsole.log(\"Welcome to dashboard!\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\nconst renderStats = data => {\n  for (let key in data) {\n    if (data[key] == null) {\n      $(\"#\" + key).html(0);\n    } else {\n      $(\"#\" + key).html(data[key]);\n    }\n  }\n};\n\nconst renderHourlyGraph = data => {\n\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n\n  let statsData = [];\n  let tableData = [];\n  const grid = data.grid[0];\n\n  for (let key in grid) {\n    if (grid.hasOwnProperty(key)) {\n      statsData.push({\n        heading: getHeading(key),\n        value: grid[key]\n      });\n      tableData.push(grid[key]);\n    }\n  }\n\n  const hdata = data.grid;\n  const totalSubmit = [];\n  const totalDelivered = [];\n  const newhoursList = [];\n  for (var i = 0; i < 24; i++) {\n    totalSubmit[i] = 0;\n    totalDelivered[i] = 0;\n\n    newhoursList[i] = year + \"-\" + month + \"-\" + day + \"T\" + i + \":00:00\";\n  }\n  //var totalSubmit = [];\n  for (let row in hdata) {\n    var summaryHour = hdata[row]['summaryHour'];\n    totalSubmit[summaryHour] = hdata[row]['totalSubmit'];\n    totalDelivered[summaryHour] = hdata[row]['totalDelivered'];\n  }\n\n  var colors = ['#3e3181', '#e951a5'];\n  var options = {\n    chart: {\n      height: 350,\n      type: 'area'\n    },\n    colors: colors,\n    dataLabels: {\n      enabled: false\n    },\n    stroke: {\n      curve: 'smooth'\n    },\n    series: [{\n      name: 'Total Delivered',\n      data: totalDelivered\n    }, {\n      name: 'Total Submit',\n      data: totalSubmit\n    }],\n\n    xaxis: {\n      type: 'datetime',\n      categories: newhoursList\n    },\n    tooltip: {\n      x: {\n        format: 'dd/MM/yy HH:mm'\n      }\n    }\n  };\n  console.log(options);\n  var chart = new ApexCharts(document.querySelector(\"#hourlyGraph\"), options);\n\n  chart.render();\n};\n\nconst renderSummaryReportGraph = data => {\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n\n  const grid = data.grid[0];\n\n  let tableHeader = [];\n  let tableData = [];\n  let formattedTableHeader = [];\n  for (let key in grid) {\n    if (key !== \"summaryDate\") {\n      if (grid.hasOwnProperty(key)) {\n        tableHeader.push(key);\n        formattedTableHeader.push(getHeading(key));\n        tableData.push(grid[key]);\n      }\n    }\n  }\n  console.log(grid);\n  console.log(tableData);\n  var colorCodes = ['#3e3181', '#e951a5', '#e951a53d', '#e951a5cf', '#a33091', '#3e3181'];\n  var options = {\n    chart: {\n      height: 350,\n      type: 'bar'\n    },\n    colors: colorCodes,\n    plotOptions: {\n      bar: {\n        columnWidth: '45%',\n        // distributed: true,\n        barHeight: '70%',\n        dataLabels: {\n          position: 'top' // top, center, bottom\n        }\n      }\n    },\n    // fill: {\n    //   colors: colorCodes\n    // },\n    dataLabels: {\n      enabled: true,\n      offsetY: -20,\n      style: {\n        fontSize: '12px',\n        colors: [\"#3e3181\"]\n      }\n    },\n    series: [{\n      data: tableData\n    }],\n    xaxis: {\n      categories: formattedTableHeader,\n      labels: {\n        style: {\n          colors: colorCodes\n        }\n      }\n    }\n  };\n\n  var chart = new ApexCharts(document.querySelector(\"#summaryReport\"), options);\n\n  chart.render();\n};\n\nfunction kFormatter(num) {\n  return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k' : Math.sign(num) * Math.abs(num);\n}\n\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"dashboard\"), \"POST\", {\n  username: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n}).done(data => {\n  if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    const dashboardData = data.data || {};\n    renderStats(dashboardData);\n  }\n});\n\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getHourlyReport\"), \"POST\", {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n}).done(data => {\n  //console.log(data);\n  if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    const dashboardData = data.data || {};\n    renderHourlyGraph(dashboardData);\n  }\n});\n\nvar d = new Date();\nvar day = d.getDate();\nvar month = d.getMonth() + 1;\nvar year = d.getFullYear();\nconsole.log(year + \"-\" + month + \"-\" + day);\n\nvar todayDate = year + \"-\" + month + \"-\" + day;\n// replace this variable in from and to date.. once it is live\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"summaryReport\"), \"POST\", {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n  fromDate: todayDate,\n  toDate: todayDate\n}).done(data => {\n  if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    const dashboardData = data.data || {};\n    renderSummaryReportGraph(dashboardData);\n  }\n});\n\n//# sourceURL=webpack:///./src/layouts/dashboard/index.js?");

/***/ }),

/***/ "./src/layouts/dashboard/styles.css":
/*!******************************************!*\
  !*** ./src/layouts/dashboard/styles.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/dashboard/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/dashboard/styles.css?");

/***/ })

/******/ });