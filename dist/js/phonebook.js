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
/******/ 		"phonebook": 0
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
/******/ 	deferredModules.push(["./src/layouts/phonebook/index.js","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./src/layouts/phonebook/styles.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader!./src/layouts/phonebook/styles.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".controls-form button {\\n  background: var(--primary-color);\\n  border-color: var(--primary-color);\\n  width: 50%;\\n}\\n\\n.table-pagination li a {\\n  color: var(--primary-color);\\n}\\n\\n/* #pagePrev, #pageNext {\\n  display: none;\\n} */\\n#misTable_filter,#misTable_info{\\ndisplay:none;\\n}\\n#searchTable_filter.dataTables_filter{\\n  display: block;\\n}\\n\\n.dt-button.btn.btn-danger:hover{\\n  color: #fff !important;\\n  background-color: #ff2d50 !important;\\n  border-color: #ff2046 !important;\\n}\\n.dt-button.btn.btn-danger{\\n  color: #fff !important;\\n  background-color: #FF5370 !important;\\n  border-color: #FF5370 !important;\\n  background: #FF5370 !important;\\n}\\n\\n.dt-button.btn.btn-info{\\n  color: #fff !important;\\n  background-color: #00bcd4 !important;\\n  border-color: #00bcd4 !important;\\n  background: #00bcd4 !important;\\n}\\n.dt-button.btn {\\n\\n  display: inline-block;\\n    font-weight: 400;\\n    color: #222;\\n    text-align: center;\\n    vertical-align: middle;\\n    -webkit-user-select: none;\\n    -moz-user-select: none;\\n    -ms-user-select: none;\\n    user-select: none;\\n    background-color: transparent;\\n    border: 1px solid transparent;\\n    padding: 0.375rem 0.95rem;\\n    font-size: 0.875rem;\\n    line-height: 1.5;\\n    border-radius: 2px;\\n    -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\\n    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\\n}\\ntable.dataTable.table-sm>thead>tr>th{\\n  padding-right: 29px !important;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/layouts/phonebook/styles.css?./node_modules/css-loader");

/***/ }),

/***/ "./src/layouts/phonebook/index.js":
/*!****************************************!*\
  !*** ./src/layouts/phonebook/index.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles */ \"./src/layouts/phonebook/styles.css\");\n/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _scripts_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../scripts/request */ \"./src/scripts/request.js\");\n/* harmony import */ var _scripts_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../scripts/user */ \"./src/scripts/user.js\");\n/* harmony import */ var _config_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../config/endpoints */ \"./config/endpoints.js\");\n/* harmony import */ var _scripts_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../scripts/alert */ \"./src/scripts/alert.js\");\n/* harmony import */ var _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../scripts/cookie */ \"./src/scripts/cookie.js\");\n// import \"./../../scripts/app\";\n\n\n\n\n\n\n\nconst table = __webpack_require__(/*! ./../../partials/table.hbs */ \"./src/partials/table.hbs\");\n\nconsole.log(\"Welcome to Phonebook!\");\n\nif (!_scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].isLoggedIn()) {\n  window.location.href = \"/login\";\n}\n\nvar select = document.getElementById(\"groupList\");\nvar select1 = document.getElementById(\"groupList1\");\nvar select2 = document.getElementById(\"uploadGroupList\");\n\nloadGroupDropdown();\n\nfunction loadGroupDropdown() {\n  const data = {\n    loggedInUserName: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName()\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"allGroupList\"), \"POST\", data).done(data => {\n    //var select = document.getElementById(\"groupList\");\n    const gpList = data.data.groupList;\n    console.log(select1.options.length);\n    // select1.options[select1.options.length] = new Option(\"all\", \"all\");\n    // select1.options[2] = new Option(\"all\", \"all\");\n\n    select.options.length = 0;\n    select1.options.length = 0;\n    select2.options.length = 0;\n\n    $.each(gpList, function (key, value) {\n      var drpcont = key + 1;\n      select.options[select.options.length] = new Option(value.groupName, value.groupName);\n      select1.options[select1.options.length] = new Option(value.groupName + \" (\" + value.numbersInGroupCount + \")\", value.groupName);\n      select2.options[select2.options.length] = new Option(value.groupName, value.groupName);\n      $(\"#groupList1 option:nth-child(\" + (drpcont + 1) + \")\").attr(\"id\", value.groupId);\n      $(\"#uploadGroupList option:nth-child(\" + drpcont + \")\").attr(\"id\", value.groupId);\n    });\n    // select1.options[select1.options.length] = new Option(\"all\", \"all\");\n    // $(\"#groupList1 option:nth-child(2)\").attr(\"id\", \"all\");\n    exportfile();\n  });\n}\n$(\"#add-contact-tab\").click(function (e) {\n  loadGroupDropdown();\n});\n\n$(\"#upload-contacts-tab\").click(function (e) {\n  loadGroupDropdown();\n});\n\n$(\"#add-contact-form\").submit(function (e) {\n  e.preventDefault();\n\n  const formData = {};\n\n  $(this).serializeArray().forEach(i => {\n    formData[i.name] = i.value;\n  });\n\n  const additionalData = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"addContactNumber\"\n  };\n\n  formData['contactNumber'] = \"91\" + formData['contactNumber'];\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"addNumber\"), \"POST\", $.extend({}, formData, additionalData)).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data)) {\n      console.log(data);\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      $(\"#add-contact-form\")[0].reset();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(data.message), {\n        clearTime: 50 * 1000\n\n      });\n      $('#searchTable').html(\"\");\n      setTimeout(function () {\n        loadGroupDropdown();\n      }, 2000);\n    }\n  });\n});\n\n$(\"#searchContact\").submit(function (e) {\n  e.preventDefault();\n  const formData = {};\n  console.log(this[3].value);\n  $(this).serializeArray().forEach(i => {\n    formData[i.name] = i.value;\n  });\n  var contactNumber = $('#contactNumb').val();\n\n  if (contactNumber.length == 0) {\n    formData['contactNumber'] = formData['contactNumber'];\n  } else {\n    formData['contactNumber'] = \"91\" + formData['contactNumber'];\n  }\n  const additionalData = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    pageNumber: $(\"#pageNumber\").val(),\n    operation: \"\"\n  };\n\n  var param = $.extend({}, formData, additionalData);\n  var api = \"searchNumber\";\n\n  buildDataTable(api, param);\n});\n$(\"#pageNext\").click(() => {\n  const pageNumber = +$(\"#pageNumber\").val();\n  const totalPages = +$(\"#pageNumber\").val();\n  console.log(pageNumber + \"  \" + totalPages);\n  if (pageNumber == totalPages) {\n    $(\"#pageNumber\").val(pageNumber + 1);\n    $(\"#searchContact\").submit();\n  }\n});\n$(\"#pagePrev\").click(() => {\n\n  const pageNumber = $(\"#pageNumber\").val();\n  const totalPages = $(\"#pageNumber\").val();\n  console.log(pageNumber + \"  \" + totalPages);\n  if (pageNumber > 1) {\n    $(\"#pageNumber\").val(pageNumber - 1);\n    $(\"#searchContact\").submit();\n  }\n});\n$(\"#upload-contacts\").submit(function (e) {\n  e.preventDefault();\n  const selectFile = $(\"#selectFile\").get(0).files[0];\n  var selectedFileName = $(\"#selectFile\").get(0).files[0].name;\n\n  if (!selectFile) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].info(\"Please select a file.\");\n    return;\n  }\n  console.log(selectFile);\n\n  var ar = /^(\\d|\\w|-)+$/;\n  if (ar.test(selectedFileName.split(\".\")[0]) == false) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"File Name should not contain space\", {\n      clearTime: 10 * 1000\n    });\n    return;\n  }\n\n  console.log(selectFile.type);\n  if ([\"text\", \"text/plain\", \"application/vnd.ms-excel\", \"text/csv\"].indexOf(selectFile.type) == -1) {\n    _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(\"Only .txt / .csv files are allowed.\");\n    return;\n  }\n\n  var e = document.getElementById(\"uploadGroupList\");\n  var groupId = e.options[e.selectedIndex].id;\n\n  const formData = new FormData();\n  formData.append(\"userName\", _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName());\n  formData.append(\"fileType\", selectFile.type);\n  formData.append(\"file\", selectFile);\n  formData.append(\"groupId\", groupId);\n  formData.append(\"fileName\", selectFile.name);\n\n  console.log(formData);\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"uploadContacts\"), \"POST\", formData, {\n    showMainLoader: true,\n    contentType: false,\n    processData: false,\n    data: formData\n  }).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data)) {\n      $(\"#upload-contacts\")[0].reset();\n      $(\".custom-file-label\").html('Choose File');\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(data.message, {\n        clearTime: 10 * 1000\n      }) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(data.message, {\n        clearTime: 10 * 1000\n      }));\n    }\n  });\n});\n\n// Get ALL numbers\n$(\"#AllContact\").click(function (e) {\n  searchAllByGroup();\n});\n\nfunction searchAllByGroup() {\n  var e = document.getElementById(\"groupList1\");\n  var userid = e.options[e.selectedIndex].id;\n  const data = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"getAllNumbersInTheGroup\",\n    groupId: userid\n  };\n\n  var api = \"getAllNumbers\";\n  buildDataTable(api, data);\n}\nfunction buildDataTable(api, data1) {\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(api), \"POST\", data1).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data)) {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(data.message), {\n        clearTime: 10 * 1000\n      });\n      $('#contactNumb').val('');\n      if (data.data != null) {\n        $(\"#dwnloadBtn #report_donwload\").removeClass(\"d-none\");\n        $(\".deletebutton\").removeClass(\"d-none\");\n        $(\"#dwnloadBtn\").html(data.data.downloadReportLink);\n        getDownloadableFile();\n        $(\"#dwnloadBtn #report_donwload\").addClass(\"btn btn-primary\");\n      } else {\n        console.log(\"check\");\n        $('#searchTable').html(\"\");\n        $(\"#dwnloadBtn #report_donwload\").addClass(\"d-none\");\n        $(\".deletebutton\").addClass(\"d-none\");\n      }\n\n      const grid = (data.data || {}).phonebookList || [];\n      const getHeading = key => {\n        let result = key.replace(/([A-Z])/g, \" $1\");\n        return result.charAt(0).toUpperCase() + result.slice(1);\n      };\n      const headerRow = grid[0];\n      let tableHeader = [];\n      let formattedTableHeader = [];\n      for (let key in headerRow) {\n        if (headerRow.hasOwnProperty(key)) {\n          tableHeader.push(key);\n          formattedTableHeader.push({ title: getHeading(key) });\n        }\n      }\n      const tableData = grid.map(row => {\n        var rowData = [];\n        tableHeader.forEach(key => {\n          rowData.push(row[key] || \"-\");\n        });\n        return rowData;\n      });\n\n      if ($.fn.dataTable.isDataTable('#searchTable')) {\n        $('#searchTable').DataTable().destroy();\n      }\n\n      const fHeader = JSON.stringify(formattedTableHeader);\n\n      var dtable = $('#searchTable').DataTable({\n        \"paging\": false,\n        \"aoColumns\": [{ \"sTitle\": \"<input type='checkbox' id='selectAll'></input>\" }],\n        data: tableData,\n        \"columns\": [{ title: \"id\" }, { title: \"groupId\" }, { title: \"groupName\" }, { title: \"contactNumber\" }, { title: \"contactName\" }],\n        buttons: [{\n          text: 'Delete Selected',\n          className: 'btn btn-danger deletebutton',\n          action: function () {\n            // dtable.rows().select();\n            deleteSelected(dtable);\n          }\n        }],\n        dom: 'Bfrtip',\n        //   \"order\": [[0, \"desc\"]],\n        'columnDefs': [{\n          'targets': 0,\n          'checkboxes': {\n            'selectRow': true\n          }\n        }, {\n          'targets': 1,\n          'visible': false,\n          'searchable': false\n        }],\n        'select': {\n          'style': 'multi'\n        }\n      });\n\n      const totalPageCount = (data.data || {}).totalPageCount || 0;\n      // $(\"#totalPages\").val(totalPageCount);\n      // $(\"#pageNumber\").val(totalPageCount);\n      if (data.data.phonebookList.length < 10) {\n        $(\"#pageNext\").hide();\n      } else {\n        $(\"#pageNext\").show();\n      }\n      if (data.data.totalPageCount == \"2\") {\n        $(\"#pagePrev\").hide();\n      } else {\n        $(\"#pagePrev\").show();\n      }\n      // console.log(totalPageCount);\n      //       const pageNumber = +($(\"#pageNumber\").val());\n      //       console.log(pageNumber);\n      //       if (totalPageCount == pageNumber) {\n      //         $(\"#pageNext\").show();\n      //       } else {\n      //         $(\"#pageNext\").hide();\n      //       }\n      //\n      //       if (pageNumber > 1) {\n      //         $(\"#pagePrev\").show();\n      //       } else {\n      //         $(\"#pagePrev\").hide();\n      //       }\n    }\n  });\n}\n// export file\nfunction exportfile() {\n  var userName = $(\"#groupList1\").val();\n  const data1 = {\n    pageNumber: 1,\n    contactNumber: \"\",\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"exportFile\",\n    groupName: userName\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"searchNumber\"), \"POST\", data1).done(data => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(data)) {\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      data.message && (data.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(data.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(data.message), {\n        clearTime: 10 * 1000\n      });\n      // $(\"#donwloadFileButton\").removeClass(\"d-none\");\n      $(\"#donwloadFileButton\").html(data.data.downloadReportLink);\n      getDownloadableFile();\n      $(\"#donwloadFileButton #report_donwload\").css(\"color\", \"white\");\n    }\n  });\n}\n\n$(\"#groupList1\").change(function () {\n  $(\"#pageNumber\").val(\"1\");\n  $('#searchTable').html(\"\");\n  $(\"#dwnloadBtn #report_donwload\").addClass(\"d-none\");\n  exportfile();\n});\n\nfunction deleteSelected(dtable) {\n\n  var rows_selected = dtable.column(0).checkboxes.selected();\n\n  // Iterate over all selected checkboxes\n  let rowIdMap = [];\n  $.each(rows_selected, function (index, rowId) {\n    // Create a hidden element\n    rowIdMap.push(rowId);\n  });\n  console.log(rowIdMap);\n\n  const formData = {\n    loggedInUsername: _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName(),\n    operation: \"removeContactNumber\",\n    contactIdsToRemove: rowIdMap\n  };\n  Object(_scripts_request__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].get(\"deleteNumber\"), \"POST\", formData).done(resData => {\n    if (_config_endpoints__WEBPACK_IMPORTED_MODULE_3__[\"default\"].validateResponse(resData)) {\n      // $(\"#searchContact\")[0].reset();\n      // searchAllByGroup();\n      $('#searchTable').html(\"\");\n      setTimeout(function () {\n        loadGroupDropdown();\n        exportfile();;\n      }, 2000);\n      $(\"#dwnloadBtn #report_donwload\").addClass(\"d-none\");\n      _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].clearAll();\n      resData.message && (resData.result === \"Success\" ? _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].success(resData.message) : _scripts_alert__WEBPACK_IMPORTED_MODULE_4__[\"default\"].error(resData.message));\n    }\n  });\n}\nfunction getDownloadableFile() {\n  $('#donwloadFileButton').on('click', 'a', function (e) {\n    e.preventDefault();\n    console.log(this.getAttribute('href'));\n    // Use XMLHttpRequest instead of Jquery $ajax\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function () {\n      var a;\n      if (xhttp.readyState === 4 && xhttp.status === 200) {\n        // Trick for making downloadable link\n        a = document.createElement('a');\n        a.href = window.URL.createObjectURL(xhttp.response);\n        // Give filename you wish to download\n        const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n        a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName() + \"-\" + dTime + \"-phonebookList.csv\";\n        a.style.display = 'none';\n        document.body.appendChild(a);\n        a.click();\n      }\n    };\n    // Post data to URL which handles post request\n    xhttp.open(\"GET\", this.getAttribute('href'));\n    xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n    xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"webtoolJWT\"));\n    // You should set responseType as blob for binary responses\n    xhttp.responseType = 'blob';\n    xhttp.send();\n    exit();\n  });\n  $('#dwnloadBtn').on('click', 'a', function (e) {\n    e.preventDefault();\n    console.log(this.getAttribute('href'));\n    // Use XMLHttpRequest instead of Jquery $ajax\n    var xhttp = new XMLHttpRequest();\n    xhttp.onreadystatechange = function () {\n      var a;\n      if (xhttp.readyState === 4 && xhttp.status === 200) {\n        // Trick for making downloadable link\n        a = document.createElement('a');\n        a.href = window.URL.createObjectURL(xhttp.response);\n        // Give filename you wish to download\n        const dTime = moment(new Date()).format(\"DDMMYYYY-HHmm\");\n        a.download = _scripts_user__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getName() + \"-\" + dTime + \"-phonebookList.csv\";\n        a.style.display = 'none';\n        document.body.appendChild(a);\n        a.click();\n      }\n    };\n    // Post data to URL which handles post request\n    xhttp.open(\"GET\", this.getAttribute('href'));\n    xhttp.setRequestHeader(\"Content-Type\", \"application/json\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Origin\", \"*\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Methods\", \"GET, POST, PATCH, PUT, DELETE, OPTIONS\");\n    xhttp.setRequestHeader(\"Access-Control-Allow-Headers\", \"Origin, Content-Type, X-Auth-Token\");\n    xhttp.setRequestHeader(\"Authorization\", _scripts_cookie__WEBPACK_IMPORTED_MODULE_5__[\"default\"].get(\"webtoolJWT\"));\n    // You should set responseType as blob for binary responses\n    xhttp.responseType = 'blob';\n    xhttp.send();\n    exit();\n  });\n}\n\n//# sourceURL=webpack:///./src/layouts/phonebook/index.js?");

/***/ }),

/***/ "./src/layouts/phonebook/styles.css":
/*!******************************************!*\
  !*** ./src/layouts/phonebook/styles.css ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../../../node_modules/css-loader!./styles.css */ \"./node_modules/css-loader/index.js!./src/layouts/phonebook/styles.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/layouts/phonebook/styles.css?");

/***/ })

/******/ });