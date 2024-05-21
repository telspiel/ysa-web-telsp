// import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

console.log("Welcome to Group Management!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}
/*
const data = {
  loggedInUserName: User.getName()
};
Request(Endpoints.get("allGroupList"), "POST", data).done(data => {
  console.log(data);
});
*/
$("#add-gpmgmt").submit(function (e) {

  e.preventDefault();

  const data = {
    loggedInUserName: User.getName(),
    groupName: $("#groupName").val(),
    groupDescription: $("#groupDesc").val()
  };
  Request(Endpoints.get("addGroup"), "POST", data).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      console.log(resData.message);
        Alert.clearAll();
      $("#add-gpmgmt")[0].reset();
      resData.message &&
        (resData.result === "Success"
          ? Alert.success(resData.message)
          : Alert.error(resData.message));
    }
  });
});

$("#list").click(() => {
  console.log("viewew");
  const data = {
    loggedInUserName: User.getName()
  };
  Request(Endpoints.get("allGroupList"), "POST", data).done(data => {

    const grid = (data.data || {}).groupList || [];
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

    //console.log(formattedTableHeader);
    //console.log(JSON.stringify(formattedTableHeader));
    //console.log(tableData);
    //console.log(JSON.stringify(tableData));
    // console.log(data);

    if ($.fn.dataTable.isDataTable('#groupmgmtTable')) {
      $('#groupmgmtTable').DataTable().destroy();
    }

    const fHeader = JSON.stringify(formattedTableHeader);

    var dtable = $('#groupmgmtTable').DataTable({
      "paging": false,
      data: tableData,
      "columns": [
        { title: "S.No." },
        { title: "Group Name" },
        { title: "Descripton" },
        { title: "Created Date" },
        { title: "User ID" },
        { title: "Total Numbers In Group"},
        { title: "Action" }
      ],
      "order": [[0, "desc"]],
      "columnDefs": [{
        "targets": -1,
        "data": null,
        "defaultContent": "<button class='btn btn-danger'>Delete</button>"
      }]
    });

    dtable.column(3).visible(false);
    dtable.column(4).visible(false);

    dtable.on('order.dt search.dt', function () {
      dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        cell.innerHTML = i + 1;
      });
    }).draw();

    $('#groupmgmtTable tbody').on('click', 'button', function () {
      var dtable = $("#groupmgmtTable").DataTable();
      var data = dtable.row($(this).parents('tr')).data();
      // alert( data[0] +"'s is: "+ data[1] );
      //        dtable.row($(this).parents('tr')).remove().draw();

      const formData = {
        loggedInUserName: User.getName(),
        groupName: data[1],
        groupDescription: data[2],
        operation: "removeGroupFromList"
      };
      Request(Endpoints.get("deleteGroup"), "POST", formData).done(resData => {
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
