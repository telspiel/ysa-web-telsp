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
/******/ 		"detailed-report": 0
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
/******/ 	deferredModules.push(["./src/layouts/detailed-report/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/detailed-report/styles.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/detailed-report/styles.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".controls-form button {\\n  background: var(--primary-color);\\n  border-color: var(--primary-color);\\n  width: 50%;\\n}\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n#pagePrev, #pageNext {\\n  display: none;\\n}\\n\\n#misDetailedReport_length,#misDetailedReport_filter,#misDetailedReport_paginate,#misDetailedReport_info,#misTable_info,#misTable_paginate{\\ndisplay:none;\\n}\\n\\n#misTable_filter,#misTable_length{\\ndisplay:none;\\n}\\n\\n.paginationNav{\\ntext-align:center;\\n}\\n\\n.popover-header{\\nmargin-top:0px;\\nfont-size:1.2em;\\n}\\n\\n.popover.fade.show{\\nopacity:1;\\n}\\n\\n.popover .popover-body{\\nword-wrap: break-word;\\n}\\n#report_donwload{\\n  color:white;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/detailed-report/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/detailed-report/index.js":
/*!**********************************************!*\
  !*** ./src/layouts/detailed-report/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../scripts/app */ \"./src/scripts/app.js\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ \"./src/layouts/detailed-report/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n/* harmony import */ var _scripts_cookie__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../scripts/cookie */ \"./src/scripts/cookie.js\");\n\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\nconsole.log(\"Welcome to detailed mis!\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\n$(\"#fromDate,#toDate\").datetimepicker({\n  timepicker: false,\n  maxDate: '0',\n  dateFormat: 'yyyy-mm-dd',\n  value: '12.03.2013',\n  format: 'Y-m-d',\n  closeOnDateSelect: true\n}).attr('readonly', 'readonly');\n\nconst renderDetailedMis = data => {\n  if (!_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data)) {\n    return false;\n  }\n  const grid = (data.data || {}).grid || [];\n  const getHeading = key => {\n    let result = key.replace(/([A-Z])/g, \" $1\");\n    return result.charAt(0).toUpperCase() + result.slice(1);\n  };\n  console.log(\"grid\", grid);\n  const headerRow = grid[0];\n  let tableHeader = [];\n  let formattedTableHeader = [];\n  for (let key in headerRow) {\n    if (headerRow.hasOwnProperty(key)) {\n      tableHeader.push(key);\n      formattedTableHeader.push(getHeading(key));\n    }\n  }\n  const tableData = grid.map(row => {\n    var rowData = [];\n    tableHeader.forEach(key => {\n      rowData.push(row[key] || \"-\");\n    });\n    return rowData;\n  });\n  //  $(\"#misTable\").html(table({ formattedTableHeader, tableData }));\n\n  if ($.fn.dataTable.isDataTable('#misTable')) {\n    $('#misTable').DataTable().destroy();\n  }\n\n  console.log(\"tableData\", tableData);\n  var tabled = $('#misTable').DataTable({\n    data: tableData,\n    \"columns\": [{ title: \"Receive Date\" }, { title: \"Message Id\" }, { title: \"Mobile Number\" },\n    //  { title: \"Submit Status\" },\n    // { title: \"Submit Error Code\" },\n    // { title: \"Carrier\" },\n    { title: \"Sent Date\" }, { title: \"Sender Id\" }, { title: \"Delivery Status\" }, { title: \"Error Code\" }, { title: \"Delivery Date Time\" }, { title: \"Message Text\" }, { title: \"Message Type\" }, { title: \"Error Description\" }, { title: \"Circle\" }, { title: \"Carrier\" }, { title: \"Template Id\" }],\n    \"order\": [[2, \"desc\"]],\n\n    // 918840184274\n    'columnDefs': [{\n      'targets': 8,\n      \"className\": \"pre-wrap\",\n      'render': function (data, type, full, meta) {\n        return '<span class=\"pre-wrap\">' + data + \"<span>\";\n      }\n    }],\n    \"footerCallback\": function (row, data, start, end, display) {\n      var api = this.api(),\n          data;\n\n      // Remove the formatting to get integer data for summation\n      var intVal = function (i) {\n        return typeof i === 'string' ? i.replace(/[\\$,]/g, '') * 1 : typeof i === 'number' ? i : 0;\n      };\n\n      var columnCount = 9;\n      for (let i = 0; i <= columnCount; i++) {\n\n        // Total over this page\n        var pageTotal = api.column(i, { page: 'current' }).data().reduce(function (a, b) {\n          return intVal(a) + intVal(b);\n        }, 0);\n\n        // Update footer\n        $(api.column(i).footer()).html(pageTotal);\n\n        $('tfoot td').css(\"font-weight\", \"bold\");\n        $('.Total').css(\"text-align\", \"center\");\n        $(\".Total\").text(\"Total\");\n      }\n    },\n    \"fnCreatedRow\": function (nRow, aData, iDataIndex) {\n      $(nRow).children(\"td\").css(\"overflow\", \"hidden\");\n      $(nRow).children(\"td\").css(\"white-space\", \"nowrap\");\n      $(nRow).children(\"td\").css(\"text-overflow\", \"ellipsis\");\n    }\n  });\n\n  tabled.order([0, 'desc']).draw();\n\n  $('body').on('click', function (e) {\n    $('[data-toggle=popover]').each(function () {\n\n      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {\n        $(this).popover('hide');\n      }\n    });\n  });\n\n  $(\"[data-toggle=popover]\").mousedown(function () {\n    //toggle popover when link is clicked\n    $(this).popover('toggle');\n  });\n\n  const totalPageCount = (data.data || {}).totalPageCount || 0;\n  $(\"#totalPages\").val(totalPageCount);\n\n  const pageNumber = +$(\"#pageNumber\").val();\n  if (totalPageCount > pageNumber) {\n    $(\"#pageNext\").show();\n  } else {\n    $(\"#pageNext\").hide();\n  }\n\n  if (pageNumber > 1) {\n    $(\"#pagePrev\").show();\n  } else {\n    $(\"#pagePrev\").hide();\n  }\n};\n\nconst now = moment(new Date()).format(\"YYYY-MM-DD\");\n\n$(() => {\n  const data1 = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"getAllSenderIdList\"), \"POST\", data1).done(data1 => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].validateResponse(data1)) {\n      const source = app.store.senderIdList = data1.data.senderIdList.map(o => ({\n        id: o.id,\n        name: o.senderId\n      }));\n      source.forEach(i => {\n        var o = new Option(i.name, i.name);\n        $(o).html(i.name);\n        $(\"#senderIdSelect\").append(o);\n      });\n    }\n  });\n\n  $(\"#controls-form\").submit(function (e) {\n    e.preventDefault();\n    var mobileNumber = $(\"#mobileNumber\").val();\n    var From_date = new Date($(\"#fromDate\").val());\n    var To_date = new Date($(\"#toDate\").val());\n    var start = new Date(From_date);\n    var end = new Date(To_date);\n    var diff = new Date(end - start);\n    var days = diff / 1000 / 60 / 60 / 24;\n    var DateValidation = Math.round(days);\n    if (DateValidation > 7) {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"You can select max 7 days in date range\", {\n        clearTime: 10 * 1000\n      });\n      return;\n    }\n    // else if(mobileNumber.length == 0){\n    //   Alert.error(\"Please Enter Mobile Number\", {\n    //     clearTime: 10 * 1000\n    //   })\n    //   return;\n    // }\n\n    const data = {\n      loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n      fromDate: this[0].value,\n      toDate: this[1].value,\n      mobileNumber: this[2].value,\n      senderId: this[3].value,\n      messageId: this[4].value,\n      pageNumber: this[5].value\n      // extension:\"csv\",\n    };\n\n    if (data.mobileNumber !== \"\") {\n      data.pageNumber = 1;\n    }\n    Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"detailedReport\"), \"POST\", data, {}).done(data1 => {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n      data1.message && (data1.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data1.message, {\n        clearTime: 10 * 1000\n      }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(data1.message, {\n        clearTime: 10 * 1000\n      }));\n      renderDetailedMis(data1);\n      $(\"#pageNumber\").val(1);\n      var donwloadlink = data1.data.downloadReportLink;\n      if (donwloadlink != null) {\n        $(\"#donwloadFileButton\").html(donwloadlink);\n        getDownloadableFile();\n        $(\"#donwloadFileButton\").removeClass(\"d-none\");\n      } else {\n        $(\"#donwloadFileButton\").addClass(\"d-none\");\n      }\n    });\n  });\n  $(\"#pageNext\").click(() => {\n    const pageNumber = +$(\"#pageNumber\").val();\n    const totalPages = +$(\"#totalPages\").val();\n    if (pageNumber < totalPages) {\n      console.log(pageNumber);\n      console.log(totalPages);\n      $(\"#pageNumber\").val(pageNumber + 1);\n      // $(\"#controls-form\").submit();\n      detailMisReport();\n    }\n  });\n  $(\"#pagePrev\").click(() => {\n    const pageNumber = +$(\"#pageNumber\").val();\n    if (pageNumber > 1) {\n      console.log(pageNumber);\n      console.log(totalPages);\n      $(\"#pageNumber\").val(pageNumber - 1);\n      // $(\"#controls-form\").submit();\n      detailMisReport();\n    }\n  });\n});\n\nconst data = {\n  loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n  fromDate: now,\n  toDate: now,\n  pageNumber: 1\n};\nObject(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"detailedReport\"), \"POST\", data).done(data => {\n  renderDetailedMis(data);\n\n  var donwloadlink = data.data.downloadReportLink;\n  if (donwloadlink != null) {\n    $(\"#donwloadFileButton\").html(donwloadlink);\n    getDownloadableFile();\n    $(\"#donwloadFileButton\").removeClass(\"d-none\");\n  } else {\n    $(\"#donwloadFileButton\").addClass(\"d-none\");\n  }\n});\n\nfunction detailMisReport() {\n  var From_date = new Date($(\"#fromDate\").val());\n  var To_date = new Date($(\"#toDate\").val());\n  var start = new Date(From_date);\n  var end = new Date(To_date);\n  var diff = new Date(end - start);\n  var days = diff / 1000 / 60 / 60 / 24;\n  var DateValidation = Math.round(days);\n  if (DateValidation > 7) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(\"You can select max 7 days in date range\", {\n      clearTime: 10 * 1000\n    });\n    return;\n  }\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName(),\n    fromDate: $(\"#fromDate\").val(),\n    toDate: $(\"#toDate\").val(),\n    mobileNumber: $(\"#mobileNumber\").val(),\n    senderId: $(\"#SenderID\").val(),\n    messageId: $(\"#messageId\").val(),\n    pageNumber: $(\"#pageNumber\").val()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"detailedReport\"), \"POST\", data, {}).done(data1 => {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].clearAll();\n    data1.message && (data1.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].success(data1.message, {\n      clearTime: 10 * 1000\n    }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_5__[\"default\"].error(data1.message, {\n      clearTime: 10 * 1000\n    }));\n    renderDetailedMis(data1);\n    var donwloadlink = data1.data.downloadReportLink;\n    if (donwloadlink != null) {\n      $(\"#donwloadFileButton\").html(donwloadlink);\n      getDownloadableFile();\n      $(\"#donwloadFileButton\").removeClass(\"d-none\");\n    } else {\n      $(\"#donwloadFileButton\").addClass(\"d-none\");\n    }\n  });\n}\nfunction getDownloadableFile() {\n  $('#donwloadFileButton').on('click', 'a', function (e) {\n    e.preventDefault();\n    let allUrlParams = getUrlVars(this.getAttribute('href'));\n\n    // Use XMLHttpRequest instead of Jquery $ajax\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function () {\n      var a;\n      if (xhttp.readyState === 4 && xhttp.status === 200) {\n        // Trick for making downloadable link\n        a = document.createElement('a');\n        a.href = window.URL.createObjectURL(xhttp.response);\n        // Give filename you wish to download\n        const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n        a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getName() + \"-\" + dTime + \"-detailReport.csv\";\n        a.style.display = 'none';\n        document.body.appendChild(a);\n        a.click();\n      }\n    };\n    // Post data to URL which handles post request\n    xhttp.open(\"GET\", this.getAttribute('href'));\n    xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n    xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_6__[\"default\"].get(\"webtoolJWT\"));\n    // You should set responseType as blob for binary responses\n    xhttp.responseType = 'blob';\n    xhttp.send();\n    exit();\n  });\n}\n\n// Read a page's GET URL variables and return them as an associative array.\nfunction getUrlVars(url) {\n  var vars = [],\n      hash;\n  var hashes = url.slice(url.indexOf('?') + 1).split('&');\n  for (var i = 0; i < hashes.length; i++) {\n    hash = hashes[i].split('=');\n    vars.push(hash[0]);\n    vars[hash[0]] = hash[1];\n  }\n  return vars;\n}\n\n//# sourceURL=webpack:///./src/layouts/detailed-report/index.js?");

/***/ }),

/***/ "./src/layouts/detailed-report/styles.css":
/*!************************************************!*\
  !*** ./src/layouts/detailed-report/styles.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/detailed-report/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/detailed-report/styles.css?");

/***/ })

/******/ });