import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

console.log("Welcome to Domain Management!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

$("#add-host").submit(function (e) {

  e.preventDefault();

  const data = {
    loggedInUserName: User.getName(),
    title: $("#title").val(),
    domainName: $("#domainName").val()
  };
  Request(Endpoints.get("addHost"), "POST", data).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      console.log(resData.message);
      $("#add-host")[0].reset();
        Alert.clearAll();
      resData.message &&
        (resData.result === "Success"
          ? Alert.success(resData.message)
          : Alert.error(resData.message));
    }
  });
});

$("#list").click(() => {
  // console.log("viewew");
  const data = {
    loggedInUserName: User.getName()
  };
  Request(Endpoints.get("listDomains"), "POST", data).done(data => {

    const grid = (data.data || {}).hostNameList || [];
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

    if ($.fn.dataTable.isDataTable('#domainListTable')) {
      $('#domainListTable').DataTable().destroy();
    }

    const fHeader = JSON.stringify(formattedTableHeader);

    var dtable = $('#domainListTable').DataTable({
      "paging": false,
      data: tableData,
      "columns": [
        { title: "S.No." },
        { title: "Title " },
        { title: "Domain " },
        { title: "Is Active " },
        { title: "Created Date " },
        { title: "Is Approved  " },
        { title: "Action  " },
      ],
      "order": [[0, "desc"]],
      "columnDefs": [{
        "targets": -1,
        "data": null,
        "defaultContent": "<button class='btn btn-danger'>Delete</button>"
      }]
    });
    dtable.column(3).visible(false);
    dtable.on('order.dt search.dt', function () {
      dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        cell.innerHTML = i + 1;
      });
    }).draw();

    $('#domainListTable tbody').on('click', 'button', function () {
var dtable = $('#domainListTable').DataTable();
      var data = dtable.row($(this).parents('tr')).data();
      //alert( data[0] +"'s is: "+ data[1] );
      //        dtable.row($(this).parents('tr')).remove().draw();

      const formData = {
        loggedInUserName: User.getName(),
        id: data[0],
        domainName: data[2],
        operation: "removeHostNameFromList"
      };
      Request(Endpoints.get("deleteDomain"), "POST", formData).done(resData => {
        if (Endpoints.validateResponse(resData)) {
          console.log(resData.message);
          //        $("#add-gpmgmt")[0].reset();
          dtable.row($(this).parents('tr')).remove().draw();
            Alert.clearAll();
          resData.message &&
            (resData.result === "Success"
              ? Alert.success(resData.message)
              : Alert.error(resData.message));
        }
      });
    });

  });
});
