import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Cookie from "./../../scripts/cookie";
const table = require("./../../partials/table.hbs");

console.log("Welcome to detailed Analysis!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const renderDetailedMis = (data) => {

  const grid = (data.data || {}).consolidateCampaignList || [];
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


  if ($.fn.DataTable.isDataTable('#tableScheduledCampaign')) {

    var table = $('#tableScheduledCampaign').DataTable();

    table.clear().destroy();


    console.log("true")
  } else {
    console.log("false")
  }

  const fHeader = JSON.stringify(formattedTableHeader);

  var dtable = $('#tableScheduledCampaign').DataTable({
    destroy: true,
    retrieve: false,
    "paging": false,
    data: tableData,
    "columns": [
      { title: "Campaign Type" },
      { title: "Campaign Name", className: "text-wrap" },
      { title: "Created Date" },
      { title: "Schdeuled Date" },
      { title: "Scheduled Time" },
      { title: "Campaign Id" },
      { title: "Sender Id" },
      { title: "Message Text", className: "text-wrap" },
      { title: "Message Count" },
      { title: "Action" }
    ],
    "order": [[0, "desc"]],
    "columnDefs": [
      {
        "targets": -1,
        "data": null,
        render: function (data, type, full, meta) {
          if (data[9] == "Y") {
            return "<button class='btn btn-danger' disabled>Delete</button>";
          } else {
            return "<button class='btn btn-danger'>Delete</button>";
          }
        }
      }, {
        "targets": [2, 5],
        "visible": false,
        "searchable": false
      }],
    "initComplete": function (settings, json) {
      $('#tableScheduledCampaign tbody').on('click', 'button', function () {
        let self = $(this).parents('tr');
        var data = dtable.row($(this).parents('tr')).data();
        if (!data) {
          self = this;
          data = dtable.row(this).data();
        }
        const formData = {
          loggedInUserName: User.getName(),
          campaignId: data[5],
          operation: data[0].split(" ")[0]
        };

        // dtable.row(self).remove().draw();
        // let tData = $(this).parents('tr');
        if (confirm('Are You Sure you want to delete ?')) {
          Request(Endpoints.get("deleteScheduledCampaign"), "POST", formData).done(resData => {
            if (Endpoints.validateResponse(resData)) {
              // console.log(resData.message);
              dtable.row(self).remove().draw();
              Alert.clearAll();
              resData.message &&
                (resData.result === "Success"
                  ? Alert.success(resData.message)
                  : Alert.error(resData.message));
            }
          });
        }
      });
    }
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

const now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

$(() => {

  $("#fromDate,#toDate").datetimepicker({
    timepicker: false,
    // maxDate: '0',
    dateFormat: 'yyyy-mm-dd',
    value: '12.03.2013',
    format: 'Y-m-d',
    closeOnDateSelect: true
  }).attr('readonly', 'readonly');


  const data = {
    loggedInUserName: User.getName(),
    fromDate: $("#fromDate").val(),
    toDate: $("#toDate").val(),
    campaignType: "All"
  };

  Request(Endpoints.get("scheduledCampaign"), "POST", data, {
    showMainLoader: true
  }).done(data1 => {
    $("#tableScheduledCampaign").html('');
    renderDetailedMis(data1);
  });

  $("#controls-form").submit(function (e) {
    e.preventDefault();

    const data = {
      loggedInUserName: User.getName(),
      fromDate: this[0].value,
      toDate: this[1].value,
      campaignType: this[2].value
    };

    Request(Endpoints.get("scheduledCampaign"), "POST", data, {
      showMainLoader: true
    }).done(data1 => {
      $("#tableScheduledCampaign").html('');
      renderDetailedMis(data1);
    });
  });

  $("#pageNext").click(() => {
    const pageNumber = +($("#pageNumber").val());
    const totalPages = +($("#totalPages").val());
    if (pageNumber < totalPages) {
      $("#pageNumber").val(pageNumber + 1);
      $("#controls-form").submit();
    }
  });

  $("#pagePrev").click(() => {
    const pageNumber = +($("#pageNumber").val());
    if (pageNumber > 1) {
      $("#pageNumber").val(pageNumber - 1);
      $("#controls-form").submit();
    }
  });
});
