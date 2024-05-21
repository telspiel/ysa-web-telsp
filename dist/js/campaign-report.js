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
/******/ 		"campaign-report": 0
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
/******/ 	deferredModules.push(["./src/layouts/campaign-report/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/campaign-report/styles.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/campaign-report/styles.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"/* #controls-form {\\n  width: 100%;\\n  padding: 20px 0 0 50px;\\n}\\n\\n.controls-form button {\\n  background: var(--primary-color);\\n  border-color: var(--primary-color);\\n  width: 50%;\\n} */\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n#misTable_length,#misTable_filter,#misTable_info,#misTable_paginate{\\ndisplay:none;\\n}\\n#CampaignReportdonwload{\\n  color:white;\\n}\\nth, td { white-space: nowrap; }\\ndiv.dataTables_wrapper {\\n    margin: 0 auto;\\n}\\n\\ndiv.container {\\n    width: 80%;\\n}\\n.text-wrap{\\n  white-space: pre-wrap;\\n}\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/campaign-report/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/campaign-report/index.js":
/*!**********************************************!*\
  !*** ./src/layouts/campaign-report/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/campaign-report/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n/* harmony import */ var _scripts_cookie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../scripts/cookie */ \"./src/scripts/cookie.js\");\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\nconsole.log(\"Welcome to detailed mis!\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\n$(\"#fromDate,#toDate\").datetimepicker({\n  timepicker: false,\n  maxDate: '0',\n  dateFormat: 'yyyy-mm-dd',\n  value: '12.03.2013',\n  format: 'Y-m-d',\n  closeOnDateSelect: true\n}).attr('readonly', 'readonly');\n\n// Render Table\nconst renderDetailedMis = data => {\n  if (!_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    return false;\n  }\n  const grid = (data.data || {}).grid || [];\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n  const headerRow = grid[0];\n  let tableHeader = [];\n  let formattedTableHeader = [];\n  for (let key in headerRow) {\n    if (headerRow.hasOwnProperty(key)) {\n      tableHeader.push(key);\n      formattedTableHeader.push(getHeading(key));\n    }\n  }\n  const tableData = grid.map(row => {\n    var rowData = [];\n    tableHeader.forEach(key => {\n      rowData.push(row[key] || \"-\");\n    });\n    return rowData;\n  });\n\n  if ($.fn.dataTable.isDataTable('#misTable')) {\n    $('#misTable').DataTable().destroy();\n  }\n\n  console.log(tableData);\n  var dtable = $('#misTable').DataTable({\n    data: tableData,\n    \"order\": [[0, \"desc\"]],\n    paging: false,\n    \"columnDefs\": [{ className: \"text-wrap\", \"targets\": [1] }, {\n      \"targets\": [2],\n      \"visible\": false,\n      \"searchable\": false\n    }, {\n      \"targets\": -1,\n      \"data\": null,\n      \"defaultContent\": \"<button class='btn btn-info' id='clicker'>Analytics Report</button> &nbsp; <button class='btn btn-success' id='detail'>Clicker Details</button>\"\n    }, {\n      'targets': 13,\n      \"className\": \"pre-wrap\",\n      'render': function (data, type, full, meta) {\n        return '<span class=\"pre-wrap\">' + data + \"<span>\";\n      }\n    }]\n  });\n\n  $('#misTable tbody').on('click', 'button#clicker', function () {\n    var data = dtable.row($(this).parents('tr')).data();\n    if (data) {\n      let id = 0;\n      if (data[2] == \"-\") {\n        // localStorage.setItem(\"campaignId\", 0);\n      } else {\n        id = data[2];\n        // localStorage.setItem(\"campaignId\", data[2]);\n      }\n      // localStorage.setItem(\"campaignName\", data[1]);\n\n      // window.open(\n      //   \"/clicker-analysis\",\n      //   '_blank' // <- This is what makes it open in a new window.\n      // );\n\n      $(\".campaign-div\").addClass(\"d-none\");\n      $(\"#clicker-div\").removeClass(\"d-none\");\n      generateClickerAnalysisPage(id, data[1]);\n    }\n  });\n\n  $('#misTable tbody').on('click', 'button#detail', function () {\n    var data = dtable.row($(this).parents('tr')).data();\n    if (data) {\n      let id = 0;\n      if (data[2] == \"-\") {\n        // localStorage.setItem(\"campaignId\", 0);\n      } else {\n        id = data[2];\n        // localStorage.setItem(\"campaignId\", data[2]);\n      }\n      // localStorage.setItem(\"campaignId\", data[2]);\n      // localStorage.setItem(\"campaignName\", data[1]);\n      // // location.href = \"/detailed-analysis\";\n      // window.open(\n      //   \"/detailed-analysis\",\n      //   '_blank' // <- This is what makes it open in a new window.\n      // );\n\n      $(\".campaign-div\").addClass(\"d-none\");\n      $(\"#detailed-div\").removeClass(\"d-none\");\n      generateDetailedAnalysisPage(id, data[1]);\n    }\n  });\n\n  const totalPageCount = (data.data || {}).totalPageCount || 0;\n  $(\"#totalPages\").val(totalPageCount);\n\n  const pageNumber = +$(\"#pageNumber\").val();\n  if (totalPageCount > pageNumber) {\n    $(\"#pageNext\").show();\n  } else {\n    $(\"#pageNext\").hide();\n  }\n\n  if (pageNumber > 1) {\n    $(\"#pagePrev\").show();\n  } else {\n    $(\"#pagePrev\").hide();\n  }\n};\n\n// Form submit with from and to date\nconst now = moment(new Date()).format(\"YYYY-MM-DD\");\n$(() => {\n  $(\"#controls-form\").submit(function (e) {\n\n    $(\".campaign-div\").removeClass(\"d-none\");\n    $(\"#clicker-div\").addClass(\"d-none\");\n\n    e.preventDefault();\n    const data = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      fromDate: this[0].value,\n      toDate: this[1].value,\n      pageNumber: +this[2].value\n    };\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"campaignReport\"), \"POST\", data, {\n      showMainLoader: true\n    }).done(data1 => {\n      renderDetailedMis(data1);\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n      data1.message && (data1.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data1.message, {\n        clearTime: 10 * 1000\n      }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(data1.message, {\n        clearTime: 10 * 1000\n      }));\n\n      var donwloadlink = data1.data.downloadReportLink;\n      if (donwloadlink != null) {\n        $(\"#donwloadCampaignReport\").html(donwloadlink);\n        getDownloadableFile();\n        $(\"#donwloadCampaignReport\").removeClass(\"d-none\");\n      } else {\n        $(\"#donwloadCampaignReport\").addClass(\"d-none\");\n      }\n    });\n  });\n  $(\"#pageNext\").click(() => {\n    const pageNumber = +$(\"#pageNumber\").val();\n    const totalPages = +$(\"#totalPages\").val();\n    if (pageNumber < totalPages) {\n      $(\"#pageNumber\").val(pageNumber + 1);\n      $(\"#controls-form\").submit();\n    }\n  });\n  $(\"#pagePrev\").click(() => {\n    const pageNumber = +$(\"#pageNumber\").val();\n    if (pageNumber > 1) {\n      $(\"#pageNumber\").val(pageNumber - 1);\n      $(\"#controls-form\").submit();\n    }\n  });\n});\n\n/////////////////////////////////////////////////////////////////////// Clicker Analaysis /////////////////////////////////////////////////////\n\n$(\".backToHome\").click(() => {\n  $(\".campaign-div\").removeClass(\"d-none\");\n  $(\"#clicker-div\").addClass(\"d-none\");\n  $(\"#detailed-div\").addClass(\"d-none\");\n});\n\nfunction generateClickerAnalysisPage(id, name) {\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"clickerAnalysis\"), \"POST\", {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    campaignId: id,\n    campaignName: name\n  }).done(data1 => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data1)) {\n      var donwloadlink = data1.data.downloadReportLink;\n      if (donwloadlink != null) {\n        $(\"#donwloadFileButton\").html(donwloadlink);\n        getClickerDownloadableFile();\n        $(\"#donwloadFileButton\").removeClass(\"d-none\");\n      } else {\n        $(\"#donwloadFileButton\").addClass(\"d-none\");\n      }\n      const dashboardData = data1.data || {};\n      const grid = dashboardData.grid[0];\n\n      $(\"#deliveryStatus\").html();\n      $(\"#clickerStatus\").html();\n      renderStats(grid);\n      clickerStatus(grid);\n      deliveryStatus(grid);\n    }\n  });\n}\n\nconst renderStats = data => {\n  console.log(data);\n  for (let key in data) {\n    $(\"#\" + key).html(data[key]);\n  }\n};\n\nconst deliveryStatus = data => {\n\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n\n  let headingData = ['totalDelivered', 'totalFailed', 'totalAwaited'];\n  let head = [];\n  let graphData = [];\n  for (let key in headingData) {\n    head.push(getHeading(headingData[key]));\n    graphData.push(parseInt(data[headingData[key]]));\n  }\n  var colors1 = ['#3e3181', '#e951a5', '#6c757d'];\n  var options = {\n    series: graphData,\n    chart: {\n      width: 380,\n      type: 'pie'\n    },\n    colors: colors1,\n    labels: head,\n    responsive: [{\n      breakpoint: 480,\n      options: {\n        chart: {\n          width: 200\n        },\n        legend: {\n          position: 'bottom'\n        }\n      }\n    }]\n  };\n\n  var chart = new ApexCharts(document.querySelector(\"#deliveryStatus\"), options);\n  chart.render();\n};\n\nconst clickerStatus = data => {\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n\n  console.log(data);\n  let headingData = ['totalDelivered', 'totalClicks'];\n  let head = [];\n  let graphData = [];\n  for (let key in headingData) {\n    head.push(getHeading(headingData[key]));\n    graphData.push(parseInt(data[headingData[key]]));\n  }\n\n  console.log(graphData);\n  console.log(head);\n  var colors = ['#3e3181', '#e951a5'];\n  var options = {\n    series: graphData,\n    labels: head,\n    chart: {\n      width: 380,\n      type: 'pie'\n    },\n    colors: colors,\n    dataLabels: {\n      enabled: true\n    },\n    responsive: [{\n      breakpoint: 480,\n      options: {\n        chart: {\n          width: 200\n        },\n        legend: {\n          position: 'bottom'\n        }\n      }\n    }]\n  };\n\n  var chart = new ApexCharts(document.querySelector(\"#clickerStatus\"), options);\n  chart.render();\n};\n\n/////////////////////////////////////////////////////////////////////// End Clicker Analaysis /////////////////////////////////////////////////////\n\n\n/////////////////////////////////////////////////////////////////////// Detailed Analaysis /////////////////////////////////////////////////////\n\nfunction generateDetailedAnalysisPage(id, name) {\n\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    campaignId: id,\n    campaignName: name,\n    pageNumber: $(\"#detailed-pageNumber\").val()\n  };\n\n  getAPICall(data);\n\n  $(\"#detailed-controls-form\").submit(function (e) {\n    e.preventDefault();\n\n    const data = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      mobileNumber: \"91\" + this[0].value,\n      campaignId: id,\n      campaignName: name,\n      pageNumber: $(\"#detailed-pageNumber\").val()\n    };\n\n    // if (data.mobileNumber !== \"\") {\n    //   data.pageNumber = 1;\n    // }\n\n    getAPICall(data);\n    // Request(Endpoints.get(\"detailedAnalysis\"), \"POST\", data, {showMainLoader: true}).done(data1 => {\n    //   renderDetailedAnalysis(data1);\n    //   var donwloadlink = data1.data.downloadReportLink;\n    //   if (donwloadlink != null) {\n    //     $(\"#detailed-donwloadFileButton\").html(donwloadlink);\n    //     getDetailedDownloadableFile();\n    //     $(\"#detailed-donwloadFileButton\").removeClass(\"d-none\");\n    //   } else {\n    //     $(\"#detailed-donwloadFileButton\").addClass(\"d-none\");\n    //   }\n    // });\n  });\n\n  $(\"#detailed-pageNext\").click(() => {\n    const pageNumber = +$(\"#detailed-pageNumber\").val();\n    const totalPages = +$(\"#detailed-totalPages\").val();\n    if (pageNumber < totalPages) {\n      $(\"#detailed-pageNumber\").val(pageNumber + 1);\n      $(\"#detailed-controls-form\").submit();\n    }\n  });\n  $(\"#detailed-pagePrev\").click(() => {\n    const pageNumber = +$(\"#detailed-pageNumber\").val();\n    if (pageNumber > 1) {\n      $(\"#detailed-pageNumber\").val(pageNumber - 1);\n      $(\"#detailed-controls-form\").submit();\n    }\n  });\n}\n\nfunction getAPICall(data) {\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"detailedAnalysis\"), \"POST\", data, { showMainLoader: true }).done(data1 => {\n    renderDetailedAnalysis(data1);\n    var donwloadlink = data1.data.downloadReportLink;\n    if (donwloadlink != null) {\n      $(\"#detailed-donwloadFileButton\").html(donwloadlink);\n      getDetailedDownloadableFile();\n      $(\"#detailed-donwloadFileButton\").removeClass(\"d-none\");\n    } else {\n      $(\"#detailed-donwloadFileButton\").addClass(\"d-none\");\n    }\n  });\n}\n\nconst renderDetailedAnalysis = data => {\n\n  if (!_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    return false;\n  }\n  const grid = (data.data || {}).grid || [];\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n  const headerRow = grid[0];\n  let tableHeader = [];\n  let formattedTableHeader = [];\n  for (let key in headerRow) {\n    if (headerRow.hasOwnProperty(key)) {\n      tableHeader.push(key);\n      formattedTableHeader.push(getHeading(key));\n    }\n  }\n  const tableData = grid.map(row => {\n    var rowData = [];\n    tableHeader.forEach(key => {\n      rowData.push(row[key] || \"-\");\n    });\n    return rowData;\n  });\n  //  $(\"#misTable\").html(table({ formattedTableHeader, tableData }));\n\n  if ($.fn.dataTable.isDataTable('#detailed-misTable')) {\n    $('#detailed-misTable').DataTable().destroy();\n  }\n\n  var tabled = $('#detailed-misTable').DataTable({\n    data: tableData,\n    \"columns\": [{ title: \"campaign Name\" }, { title: \"child ShortUrl\" }, { title: \"Mobile Number\" }, { title: \"created Date\" }, { title: \"user IpAddress\" }, { title: \"browser Details\" }, { title: \"operating System\" }, { title: \"device Details\" }, { title: \"country\" }, { title: \"region\" }, { title: \"city\" }, { title: \"zip\" }, { title: \"longUrl\" }]\n  });\n\n  const totalPageCount = (data.data || {}).totalPageCount || 0;\n  $(\"#detailed-totalPages\").val(totalPageCount);\n\n  const pageNumber = +$(\"#detailed-pageNumber\").val();\n  if (totalPageCount > pageNumber) {\n    $(\"#detailed-pageNext\").show();\n  } else {\n    $(\"#detailed-pageNext\").hide();\n  }\n\n  if (pageNumber > 1) {\n    $(\"#detailed-pagePrev\").show();\n  } else {\n    $(\"#detailed-pagePrev\").hide();\n  }\n};\n\n/////////////////////////////////////////////////////////////////////// End Detailed Analaysis /////////////////////////////////////////////////////\n\n// Download Report Block\nconst data = {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n  fromDate: now,\n  toDate: now,\n  pageNumber: 1\n};\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"campaignReport\"), \"POST\", data).done(data => {\n  renderDetailedMis(data);\n  var donwloadlink = data.data.downloadReportLink;\n  if (donwloadlink != null) {\n    $(\"#donwloadCampaignReport\").html(donwloadlink);\n    getDownloadableFile();\n    $(\"#donwloadCampaignReport\").removeClass(\"d-none\");\n  } else {\n    $(\"#donwloadCampaignReport\").addClass(\"d-none\");\n  }\n});\n\nfunction getDownloadableFile() {\n  $('#donwloadCampaignReport').on('click', 'a', function (e) {\n    e.preventDefault();\n    console.log(this.getAttribute('href'));\n    // Use XMLHttpRequest instead of Jquery $ajax\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function () {\n      var a;\n      if (xhttp.readyState === 4 && xhttp.status === 200) {\n        // Trick for making downloadable link\n        a = document.createElement('a');\n        a.href = window.URL.createObjectURL(xhttp.response);\n        // Give filename you wish to download\n        const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n        a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName() + \"-\" + dTime + \"-campaignReport.csv\";\n        a.style.display = 'none';\n        document.body.appendChild(a);\n        a.click();\n      }\n    };\n    // Post data to URL which handles post request\n    xhttp.open(\"GET\", this.getAttribute('href'));\n    xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n    xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"webtoolJWT\"));\n    // You should set responseType as blob for binary responses\n    xhttp.responseType = 'blob';\n    xhttp.send();\n    // exit();\n    return false;\n  });\n}\n\n// Clicker Download file\nfunction getClickerDownloadableFile() {\n  $('#donwloadFileButton').on('click', 'a', function (e) {\n    e.preventDefault();\n    console.log(this.getAttribute('href'));\n    // Use XMLHttpRequest instead of Jquery $ajax\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function () {\n      var a;\n      if (xhttp.readyState === 4 && xhttp.status === 200) {\n        // Trick for making downloadable link\n        a = document.createElement('a');\n        a.href = window.URL.createObjectURL(xhttp.response);\n        // Give filename you wish to download\n        const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n        a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName() + \"-\" + dTime + \"-clickerAnalysis.csv\";\n        a.style.display = 'none';\n        document.body.appendChild(a);\n        a.click();\n      }\n    };\n    // Post data to URL which handles post request\n    xhttp.open(\"GET\", this.getAttribute('href'));\n    xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n    xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"webtoolJWT\"));\n    // You should set responseType as blob for binary responses\n    xhttp.responseType = 'blob';\n    xhttp.send();\n    // exit();\n    return false;\n  });\n}\n\n//// Detailedd Download File\nfunction getDetailedDownloadableFile() {\n  $('#detailed-donwloadFileButton').on('click', 'a', function (e) {\n    e.preventDefault();\n    console.log(this.getAttribute('href'));\n    // Use XMLHttpRequest instead of Jquery $ajax\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function () {\n      var a;\n      if (xhttp.readyState === 4 && xhttp.status === 200) {\n        // Trick for making downloadable link\n        a = document.createElement('a');\n        a.href = window.URL.createObjectURL(xhttp.response);\n        // Give filename you wish to download\n        const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n        a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName() + \"-\" + dTime + \"-detailReport.csv\";\n        a.style.display = 'none';\n        document.body.appendChild(a);\n        a.click();\n      }\n    };\n    // Post data to URL which handles post request\n    xhttp.open(\"GET\", this.getAttribute('href'));\n    xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n    xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"webtoolJWT\"));\n    // You should set responseType as blob for binary responses\n    xhttp.responseType = 'blob';\n    xhttp.send();\n    return false;\n  });\n}\n\n//# sourceURL=webpack:///./src/layouts/campaign-report/index.js?");

/***/ }),

/***/ "./src/layouts/campaign-report/styles.css":
/*!************************************************!*\
  !*** ./src/layouts/campaign-report/styles.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/campaign-report/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/campaign-report/styles.css?");

/***/ })

/******/ });