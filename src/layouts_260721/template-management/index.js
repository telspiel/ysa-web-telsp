import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";


const table = require("./../../partials/table.hbs");

console.log("Welcome to Tempalte Management");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}



$("#addParams").click(function () {

  var msg = $("#templateText").val();
  var totalLengthallowed = $("#variableCount").val();

  var count = (msg.match(/#P[0-9]#/g) || []).length;
  console.log(count);
  if (count < totalLengthallowed) {
    $("#templateText").val(msg + ' #P' + (count + 1) + '# ');
  }
});

$("#addTemplate").submit(function (e) {
  e.preventDefault();

  const formData = {};

  $(this)
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });

  const additionalData = {
    loggedInUserName: User.getName()
  };

  var isPlain = true;
  var plain = new RegExp("^[A-Za-z0-9_~\\-!:\\/.@\\|\\,#\\$%\\^&\\*\\(\\)\n\s +=\\\\{}\\[\\];'\"<>?₹]*$");
  var msgTxt = $("#templateText").val();
  //console.log(msgTxt);
  //console.log(plain);
  if (plain.test(msgTxt.trim())) {
    isPlain = true;
  } else {
    isPlain = false;
  }
  console.log(isPlain);
  var validForm = true;
  //  var type = $("input[name=msgType]:checked").val();
  var type = $("input[name=templateType]:checked").val();
  //console.log(type);
  Alert.clearAll();
  if (isPlain && type == "PM") {
    validForm = true;
  } else if (!isPlain && type == "UM") {
    validForm = true;
  } else {
    validForm = false;
    if (isPlain && type == "UM") {
      Alert.error("Message Type Mismatch, Please select Message Type Plain to send SMS.", {
        clearTime: 10 * 1000
      });
    } else {
      Alert.error("Message Type Mismatch, Please select Message Type Unicode to send SMS.", {
        clearTime: 10 * 1000
      });
    }
  }

  //console.log( validForm +"&&"+ isPlain  );

  //    console.log(formData);
  if (validForm) {
    Request(
      Endpoints.get("addTemplate"),
      "POST",
      $.extend({}, formData, additionalData)
    ).done(resData => {
      if (Endpoints.validateResponse(resData)) {
        Alert.clearAll();
        //        console.log(resData.message);
        $("#addTemplate")[0].reset();
        resData.message &&
          (resData.code === 6001
            ? Alert.success(resData.message)
            : Alert.error(resData.message));
      }
    });
  } else {
    console.log("achacho");
  }
});

$("#view-template-tab").click(() => {
  console.log("test");
  const data = {
    loggedInUserName: User.getName()
  };
  Request(Endpoints.get("viewTemplate"), "POST", data).done(data => {

    console.log(data);


    const grid = (data.data || {}).templateList || [];
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

    if ($.fn.dataTable.isDataTable('#templatesTable')) {
      $('#templatesTable').DataTable().destroy();
    }

    const fHeader = JSON.stringify(formattedTableHeader);

    var dtable = $('#templatesTable').DataTable({
      "paging": false,
      data: tableData,
      "columns": [
        { title: "S.No." },
        { title: "Template Title" },
        { title: "Template Text" },
        { title: "Action" },
      ],
      "order": [[0, "desc"]],
      "columnDefs": [{
        "targets": -1,
        "data": null,
        "defaultContent": "<button class='btn btn-danger'>Delete</button>"
      }]
    });

    dtable.on('order.dt search.dt', function () {
      dtable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
        cell.innerHTML = i + 1;
      });
    }).draw();

    $('#templatesTable tbody').on('click', 'button', function () {
      var dtable = $('#templatesTable').DataTable();
      let self = $(this).parents('tr');
      var data = dtable.row($(this).parents('tr')).data();
      if(!data){
        self = this;
        data = dtable.row(this).data();
      }
      const formData = {
        loggedInUserName: User.getName(),
        templateTitle: data[1],
        operation: "removeTemplateFromList"
      };
      Request(Endpoints.get("deleteTemplate"), "POST", formData).done(resData => {
        if (Endpoints.validateResponse(resData)) {
          Alert.clearAll();
          console.log(resData.message);
          dtable.row(self).remove().draw();
          resData.message &&
            (resData.result === "Success"
              ? Alert.success(resData.message)
              : Alert.error(resData.message));
        }
      });
    });

  });
});
