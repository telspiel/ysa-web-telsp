import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

console.log("Welcome to Credit Management!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

$("#fromDate,#toDate").datetimepicker({
  timepicker: false,
  maxDate: '0',
  dateFormat: 'yyyy-mm-dd',
  value: '12.03.2013',
  format: 'Y-m-d',
  closeOnDateSelect: true
}).attr('readonly', 'readonly');

const renderDetailedMis = (data) => {
  if (!Endpoints.validateResponse(data)) {
    return false;
  }
  const grid = (data.data || {}).grid || [];
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

  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }
  $('#misTable').DataTable({
    data: tableData,
    "columns": [
      { title: "Created Date" },
      { title: "Credit" },
      { title: "Status" },
      { title: "Updated Credit" },
      { title: "Updated By" },
      { title: "Comment" }
    ],
    "order": [[0, "desc"]],
  });

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

const now = moment(new Date()).format("YYYY-MM-DD");
$('.datepicker').val(now);

$("#controls-form").submit(function (e) {
  e.preventDefault();
  const data = {
    loggedInUserName: User.getName(),
    fromDate: $("#fromDate").val(),
    toDate: $("#toDate").val()
  };
  Request(Endpoints.get("creditHistory"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    renderDetailedMis(data);
  Alert.clearAll();
    data.message &&
    (data.result === "Success"
      ? Alert.success(data.message, {
        clearTime: 10 * 1000
      })
      : Alert.error(data.message, {
        clearTime: 10 * 1000
      }));

  });
});
//
const data = {
  loggedInUserName: User.getName(),
  fromDate: $("#fromDate").val(),
    toDate: $("#toDate").val()
};
Request(Endpoints.get("creditHistory"), "POST", data, {
  showMainLoader: true
}).done(data => {
  renderDetailedMis(data);
});
