// import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";
import Cookie from "./../../scripts/cookie";
console.log("Welcome to Global Blacklist");

//  new Form(Schema).render("#add-credits-form");

$("#cancelForm").click(() => {
  $("#add-gblacklist")[0].reset();
});

$("#pagePrev").hide();
$("#pageNext").hide();

$("#listAll").click(() => {
  $("#search-blacklist-form")[0].reset();
  loadAddBlacklistNumbersTable();
});

$("#submitSearch").click(() => {

  const data = {
    loggedInUserName: User.getName(),
    mobileNumber: "91" + $("#searchMobileNumber").val(),
    operation: "searchUserBlackListNumber"
  };
  Request(Endpoints.get("searchBlacklist"), "POST", data).done(data1 => {
    if (data1.data) {
      $("#dwnloadBtn").html(data1.data.downloadReportLink);
        getDownloadableFile();
      $("#dwnloadBtn #report_donwload").addClass("btn btn-primary");
      if (!Endpoints.validateResponse(data1)) {
        return false;
      }
      const grid = (data1.data || {}).userBlackListNumberList || [];
      renderDetailedMis(grid);
    } else {
      const grid = [];
      renderDetailedMis(grid);
    }
  });
});

$("#add-gblacklist").submit(function (e) {
  e.preventDefault();

  const formData = {};

  $(this)
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });

  const additionalData = {
    loggedInUserName: User.getName(),
    operation: "addUserBlacklistNumber"
  };

  // show alert that request is under process
  Alert.success("We are processing your request. Kindly check in sometime.");

  console.log(formData);
  Request(
    Endpoints.get("addBlackList"),
    "POST",
    $.extend({}, formData, additionalData)
  ).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      console.log(resData.message);
      $("#add-gblacklist")[0].reset();
        Alert.clearAll();
      resData.message &&
        (resData.result === "Success"
          ? Alert.success(resData.message)
          : Alert.error(resData.message));
    }
  });
});


$("#remove-gblacklist").submit(function (e) {
  e.preventDefault();

  const formData = {};

  $(this)
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });

  const additionalData = {
    loggedInUserName: User.getName(),
    operation: "removeUserBlacklistNumber"
  };

  Request(
    Endpoints.get("removeBlackList"),
    "POST",
    $.extend({}, formData, additionalData)
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
      console.log(data);
        Alert.clearAll();
      $("#remove-gblacklist")[0].reset();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message));
    }
  });
});
/*
$("#upload-gblacklist").on('reset', function (event) {
  $("#selectFile").removeAttr("disabled");
  $(".custom-file-label").html('Choose File');
});
*/

function loadAddBlacklistNumbersTable() {
  const data = {
    loggedInUserName: User.getName(),
    operation: "getAllBlackListNumbersForUser"
  };
  Request(Endpoints.get("getAllBlacklist"), "POST", data).done(data1 => {
    $("#dwnloadBtn").html(data1.data.downloadReportLink);
      getDownloadableFile();
    $("#dwnloadBtn #report_donwload").addClass("btn btn-primary");
    if (!Endpoints.validateResponse(data1)) {
      return false;
    }
    const grid = (data1.data || {}).userBlackListNumberList || [];
    renderDetailedMis(grid);
  });
}
const renderDetailedMis = (data) => {

  const grid = data;
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  const headerRow = grid[0];
  let tableHeader = [];
  let formattedTableHeader = [];
  for (let key in headerRow) {
    if (headerRow.hasOwnProperty(key)) {
      tableHeader.push(key);
      formattedTableHeader.push(getHeading(key));
    }
  }
  const tableData = grid.map(row => {
    var rowData = [];
    tableHeader.forEach((key) => {
      rowData.push(row[key] || "-")
    });
    return rowData;
  });

  if ($.fn.dataTable.isDataTable('#allBlacklistNumber')) {
    $('#allBlacklistNumber').DataTable().destroy();
  }

  var dtable = $('#allBlacklistNumber').DataTable({
    "aoColumns": [{ "sTitle": "<input type='checkbox' id='selectAll'></input>" }],
    data: tableData,
    "columns": [
      { title: "id" },
      { title: "user Id" },
      { title: "user BlackList Number" }

    ],
    dom: 'Bfrtip',
    'columnDefs': [
      {
        'targets': 0,
        'checkboxes': {
          'selectRow': true
        }
      },
      {
        'targets': 1,
        visible: false
      }
    ],
    'select': {
      'style': 'multi'
    },
    "order": [[0, "asc"]],
    buttons: [
      {
        text: 'Delete Selected',
        className: 'btn btn-danger',
        action: function () {
          // dtable.rows().select();
          deleteSelected(dtable);
        }
      }
    ]
  });

  $('body').on('click', function (e) {
    $('[data-toggle=popover]').each(function () {
      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
        $(this).popover('hide');
      }
    });
  });

  $("[data-toggle=popover]").mousedown(function () {
    //toggle popover when link is clicked
    $(this).popover('toggle');
  });

  function strtrunc(str, max, add) {
    add = add || '...';
    return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
  };


  const totalPageCount = (data.data || {}).totalPageCount || 0;
  $("#totalPages").val(totalPageCount);

  const pageNumber = +($("#pageNumber").val());
  if (totalPageCount > pageNumber) {
    $("#pageNext").show();
  } else {
    $("#pageNext").hide();
  }

  if (pageNumber > 1) {
    $("#pagePrev").show();
  } else {
    $("#pagePrev").hide();
  }
}

function deleteSelected(dtable) {

  var rows_selected = dtable.column(0).checkboxes.selected();

  // Iterate over all selected checkboxes
  let rowIdMap = [];
  $.each(rows_selected, function (index, rowId) {
    // Create a hidden element
    rowIdMap.push(rowId);
  });
  console.log(rowIdMap);

  const formData = {
    loggedInUserName: User.getName(),
    operation: "removeUserBlackListNumber",
    numberToBeRemoved: rowIdMap
  };

  Alert.success("We are processing your request. Kindly check in sometime.");
  Request(Endpoints.get("removeBlackList"), "POST", formData).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      console.log(resData.message);
      $("#search-blacklist-form")[0].reset();
      // $.each(rows_selected, function (index, rowId) {
      //   dtable.rows(rowId).remove().draw();
      // });
        Alert.clearAll();
      loadAddBlacklistNumbersTable();
      resData.message &&
        (resData.result === "Success" ?
          Alert.success(resData.message) :
          Alert.error(resData.message));
    }
  });
}

$("#upload-gblacklist").submit(function (e) {
  e.preventDefault();
  const selectFile = $("#selectFile").get(0).files[0];
  var selectedFileName = $("#selectFile").get(0).files[0].name;

  if (!selectFile) {
      Alert.clearAll();
    Alert.info("Please select a file.");
    return;
  }

  var ar = /^(\d|\w|-)+$/;
  if (ar.test(selectedFileName.split(".")[0]) == false) {
      Alert.clearAll();
    Alert.error("File Name should not contain space", {
      clearTime: 10 * 1000
    });
    return;
  }

  if (["text", "text/plain"].indexOf(selectFile.type) == -1) {
      Alert.clearAll();
    Alert.error("Only .txt files are allowed.");
    return;
  }

  const formData = new FormData();
  formData.append("userName", User.getName());
  formData.append("fileType", "txt");
  formData.append("file", selectFile);
  formData.append("description", $("#desc").val());

  Alert.clearAll();
  Alert.success("File Upload in Progress. . . Please wait for confirmation message",{clearTime: 60 * 60 * 1000});
  console.log(formData);
  Request(Endpoints.get("uploadBlacklist"), "POST", formData, {
    showMainLoader: true,
    contentType: false,
    processData: false,
    data: formData
  }).done(data => {
    if (Endpoints.validateResponse(data)) {
      $("#upload-gblacklist")[0].reset();
      $(".custom-file-label").html('Choose File');
        Alert.clearAll();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message, {
            clearTime: 60 * 60 * 1000
          })
          : Alert.error(data.message, {
            clearTime: 60 * 60 * 1000
          }));
    }
  });
});
function getDownloadableFile() {
  $('#dwnloadBtn').on('click', 'a', function (e) {
    e.preventDefault();
    console.log(this.getAttribute('href'));
    // Use XMLHttpRequest instead of Jquery $ajax
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      var a;
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        // Trick for making downloadable link
        a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhttp.response);
        // Give filename you wish to download
        const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
        a.download =  User.getName()+"-"+dTime+"-blacklist.csv";
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
      }
    };
    // Post data to URL which handles post request
    xhttp.open("GET", this.getAttribute('href'));
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    xhttp.setRequestHeader("Authorization", Cookie.get("webtoolJWT"));
    // You should set responseType as blob for binary responses
    xhttp.responseType = 'blob';
    xhttp.send();
    exit();
  });
}
