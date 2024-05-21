import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

console.log("Welcome to Short URL");
if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const data = {
  loggedInUserName: User.getName()
};

var domainSelect = document.getElementById("domain");
Request(Endpoints.get("getApprovedDomainList"), "POST", data).done(data => {
  const gpList = data.data.hostNameList;
  console.log(gpList);
  $.each(gpList, function (key, value) {
    domainSelect.options[domainSelect.options.length] = new Option(value.domainName, value.domainName);
  });
});

$("#addShortUrl").submit(function (e) {
  e.preventDefault();
  const formData = {};
  $(this)
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });
  formData["longUrl"] = $("#domainUrl").val() + "" + formData["longUrl"];
  if (formData["callbackUrl"]) {
    formData["callbackUrl"] = $("#callBackDomainUrl").val() + "" + formData["callbackUrl"];
  }

  const additionalData = {
    loggedInUserName: User.getName()
  };
  Request(
    Endpoints.get("addShortUrl"),
    "POST",
    $.extend({}, formData, additionalData)
  ).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      Alert.clearAll();
      if (resData.code === 11001) {
        Alert.success(resData.message);
        $("#shortUrlCode").val(resData.data.data.shortCode);
        $("#saveBtn").prop('disabled', true);
      } else {
        Alert.error(resData.message);
        $("#addShortUrl")[0].reset();
      }
    }
  });
});

$('#addShortUrl').on('reset', function (e) {
  $("#saveBtn").prop('disabled', false);
});

$('#view').click(function () {
  fetchViewData();
});

$("#updateSpielyLink").click(function () {

  $("#editAddModal").modal('hide');
  const formData = {
    loggedInUserName: User.getName(),
    shortUrlId: $("#editAddModal .urlId").text(),
    operation: "editshorturl",
    callbackUrl: $("#editCallBackDomainUrl").val() + "" + $("#editCallbackUrl").val(),
    name: $("#editAddModal .urlName").text(),
  };

  Request(Endpoints.get("editShortUrl"), "POST", formData).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      Alert.clearAll();
      if (resData.result === "Success") {
        Alert.success(resData.message)
        fetchViewData();
      } else {
        Alert.error(resData.message)
      }
    }
  });

})


function fetchViewData() {

  const additionalData = {
    loggedInUserName: User.getName()
  };
  Request(
    Endpoints.get("listShortUrl"),
    "POST", additionalData
  ).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      // console.log(resData);
      const grid = (resData.data || {}).shortUrlList || [];
      buildViewTable(grid);
    }
  });
}
function buildViewTable(grid) {

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
      formattedTableHeader.push({ title: getHeading(key) });
    }
  }
  const tableData = grid.map(row => {
    var rowData = [];
    tableHeader.forEach((key) => {
      rowData.push(row[key] || "-")
    });
    return rowData;
  });

  if ($.fn.dataTable.isDataTable('#listShortUrl')) {
    // $('#listShortUrl').DataTable().destroy();
    var table = $('#listShortUrl').DataTable();
    table.clear().destroy();
  }

  const fHeader = JSON.stringify(formattedTableHeader);

  var dtable = $('#listShortUrl').DataTable({
    "paging": false,
    data: tableData,
    "columns": [
      { title: "User name" },
      { title: "S.No" },
      { title: "Name" },
      { title: "long Url" },
      { title: "shortCode" },
      { title: "callback Url", className: "text-wrap" },
      { title: "is Active" },
      { title: "is Dynamic" },
      { title: "created Date" },
      { title: "Action" },
    ],
    "order": [[0, "desc"]],
    "columnDefs": [{
      "targets": -1,
      "data": null,
      "defaultContent": "<button class='btn edit'>Edit</button>&nbsp;&nbsp;<button class='btn btn-danger detele'>Delete</button>"
    }
    ],
    "rowCallback": function (row, data, index) {
      if (data[5] != "-") {
        let btn = $("td:eq(9)", row).find('button.edit');
        btn.text("Edit Callback Url");
        btn.addClass("btn-info")
      } else {
        let btn = $("td:eq(9)", row).find('button.edit');
        btn.text("Add Callback Url");
        btn.addClass("btn-primary")
      }
    }
  });
  dtable.column(0).visible(false);
  dtable.column(3).visible(false);
  dtable.column(8).visible(false);
  dtable.on('order.dt search.dt', function () {
    dtable.column(1, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
      cell.innerHTML = i + 1;
    });
  }).draw();

  $('#listShortUrl tbody').on('click', 'button.detele', function (e) {
    e.preventDefault();
    var dtable = $('#listShortUrl').DataTable();
    // var data = dtable.row($(this).parents('tr')).data();

    let self = $(this).parents('tr');
    var data = dtable.row($(this).parents('tr')).data();
    if (!data) {
      self = this;
      data = dtable.row(this).data();
    }

    const formData = {
      loggedInUserName: User.getName(),
      shortUrlId: data[1],
      operation: "removeShortUrlFromList"
    };

    // if (confirm('Are You Sure you want to delete ?')) {
      Request(Endpoints.get("deleteShortUrl"), "POST", formData).done(resData => {
        if (Endpoints.validateResponse(resData)) {
          Alert.clearAll();
          dtable.row($(this).parents('tr')).remove().draw();
          resData.message &&
            (resData.result === "Success"
              ? Alert.success(resData.message)
              : Alert.error(resData.message));
        }
      });
    // }
  });

  $('#listShortUrl tbody').on('click', 'button.edit', function () {
    var dtable = $('#listShortUrl').DataTable();
    // var data = dtable.row($(this).parents('tr')).data();

    let self = $(this).parents('tr');
    var data = dtable.row($(this).parents('tr')).data();
    if (!data) {
      self = this;
      data = dtable.row(this).data();
    }
    $("#editCallbackUrl").val("")
    $("#editAddModal .urlName").text(data[2])
    $("#editAddModal .urlId").text(data[1])
    $("#editAddModal").modal('show');

  });
}