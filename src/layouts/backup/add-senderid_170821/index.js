import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

const table = require("./../../partials/table.hbs");

console.log("Add Sender ID!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const renderDetailedMis = (data) => {
  console.log(data);
  if (!Endpoints.validateResponse(data)) {
    console.log("isFalse");
    return false;
  }
  const grid = (data.data || {}).senderIdList || [];
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0) + result.slice(1);
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
  //  $("#misTable").html(table({ formattedTableHeader, tableData }));
  //
$('#misTable').html("");
  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }
var dtable =  $('#misTable').DataTable({
    data: tableData,
    paging: false,
    "columns": [
    { title: "SR no" },
     // { title: "Id" },
     { title: "SenderId" },
     { title: "Active" },
     { title: "Default" },
     { title: "Entity Id" },
     { title: "Header Id" },
     { title: "Sender ID type" },
     // { title: "SenderId Sub Type" },
     { title: "Action" }
    ],
    "columnDefs": [
      {
        "targets": [1],
        "visible": false,
        "searchable": false
      }],
    "columnDefs": [{
      "targets": -1,
      "data": null,
      "defaultContent": "<button class='btn btn-danger'>Delete</button>"
    }]
  });
  dtable.on( 'order.dt search.dt', function () {
        dtable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

  $('#misTable tbody').on('click', 'button', function () {
if (confirm('All the associated data will be deleted and can not be recovered again. Are you sure do you want to delete ?')) {
    var dtable = $('#misTable').DataTable();
    var data = dtable.row($(this).parents('tr')).data();
    const formData = {
      loggedInUserName: User.getName(),
      idOfSenderId: data[0],
      operation: "removeSenderIdFromList",
      senderId:data[1]
    };

    Request(Endpoints.get("deleteSenderId"), "POST", formData).done(resData => {
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
        return;
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

const now = moment(new Date()).format("DD-MM-YYYY");

$(() => {

  updateTable();

  $("#controls-form").submit(function (e) {
    e.preventDefault();
    var senderId=$("#addSenderID").val();
Alert.clearAll();
    //var rege = /^[0-9a-zA-Z]{6,6}$/;
      var  senderIdType=  $("input[name=msgType]:checked").val();
    var rege = /^(?=.*[a-zA-Z0-9])(?!^\d+$)[a-ziA-Z0-9]{6,6}$/;
    var numRegx = /^[0-9]{6,6}$/;
    if (senderIdType=="others") {
  if ((rege.test(senderId)) || numRegx.test(this[0].value)) {
  } else {
      Alert.error("Sender ID must contain 6 alpha numeric characters, special characters are not allowed", {
        clearTime: 10 * 10 * 1000
          })
    return;
  }
}
else {
if(($.isNumeric(senderId))){
}
else {
Alert.error("Sender ID must contain 6  numeric characters, special characters are not allowed", {
  clearTime: 10 * 10 * 1000
    })
return;
}
}
var userid =User.getUserId();
console.log($("input[name=msgType]:checked").val());
    const data = {
      loggedInUserName: User.getName(),
      operation: "addSenderId",
      //orgId:"1",
      //deptId:"1",
      userId: userid,
      senderId: $("#addSenderID").val(),
      entityId: $("#addentityid").val(),
      headerId: $("#headerid").val(),
      senderIdType: $("input[name=msgType]:checked").val(),
   // senderIdSubType:senderIdSubType,
      //status:"active",
      //default:"Y"
    };
    Request(Endpoints.get("addSenderId"), "POST", data, {
      showMainLoader: true
    }).done(data => {
      $("#addSenderID").val("");
      $("#headerid").val("");
      $("#addentityid").val("");
      Alert.clearAll();
      if(data.code==10001){
      Alert.success("Sender ID Add successfully done", {
        clearTime: 10 * 10 * 1000
          })
        }
      if (data.code == 11002) {
             Alert.error(data.message);
      } else {
        console.log(data);
        renderDetailedMis(data);
      }
    });
  });
  $("#pageNext").click(() => {
    const pageNumber = +($("#pageNumber").val());
    const totalPages = +($("#totalPages").val());
    if (pageNumber < totalPages) {
      $("#pageNumber").val(pageNumber + 1);
      //      $("#controls-form").submit();
      updateTable();
    }
  });
  $("#pagePrev").click(() => {
    const pageNumber = +($("#pageNumber").val());
    if (pageNumber > 1) {
      $("#pageNumber").val(pageNumber - 1);
      //      $("#controls-form").submit();
      updateTable();
    }
  });
});

//updateTable();

function updateTable() {

  const data = {
    loggedInUserName: User.getName(),
    pageNumber: $("#pageNumber").val()
  };
  Request(Endpoints.get("getAllSenderIdList"), "POST", data, {
    showMainLoader: true
  }).done(data => {
    //  console.log(data);
    renderDetailedMis(data);
  });
}
// radio button
// $(document).ready(function(){
// $("[type=radio]").click(function(){
//  var selValue = $("input[type='radio']:checked").val();
// if ((selValue=="trans")|| (selValue=="promo")) {
// $(".service_type").addClass("d-none");
// }
// else {
//   $(".service_type").removeClass("d-none");
// }
// });
// });
