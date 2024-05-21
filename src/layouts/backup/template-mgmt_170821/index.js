// import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const data = {
  loggedInUserName: User.getName()
};

$(document).ready(function () {

  $("#insertVar").click(function (e) {
    $("#templateText").val($("#templateText").val() + "{#var#}");
  });

});

$("#template-msg-form").submit(function (e) {
  e.preventDefault();

  let isPlain = checkTextType($("#templateText").val());
  var mapType = $("input[name=templateType]:checked").val();
  var isValid = true;
  Alert.clearAll();
  if (mapType == "UC" && isPlain) {
    Alert.error("Plain Text only found in Message Text. Please change the Type");
    isValid = false;
  } else if (mapType == "PM" && !isPlain) {
    Alert.error("Unicode Text found in Message Text. Please change the Type");
    isValid = false;
  }
  if (!isValid) {
    return;
  }
  $('#messageModal').modal('show');

});
$("#templateTitle").blur(function(){
  const data = {
    loggedInUserName: User.getName(),
    operation: "addContentTemplate",
    templateTitle: $('#templateTitle').val()
  };
Request(Endpoints.get("saveTemplate"), "POST", data).done(data1 => {
    if (Endpoints.validateResponse(data1)) {
      Alert.clearAll();
      if(data1.result === "Failure"){
      Alert.error(data1.message, {
        clearTime: 10 * 1000
      });
    }
    else {
      Alert.error("Content Template Name is valid", {
        clearTime: 10 * 1000
      });
    }
          $('#messageModal').modal('hide');
      // console.log(resData);
      $("#template-msg-form")[0].reset();
    }
  });
});

$("#sendNow").click(function () {
  const data = {
    loggedInUserName: User.getName(),
    operation: "addContentTemplate",
    userId: User.getUserId(),
    variableCount: variableCount()
  };
  const data2 = {};

  $("#template-msg-form")
    .serializeArray()
    .forEach(i => {
      data2[i.name] = i.value;
    });

  var selValue = $("input[name='contentTemplateType']:checked").val();
  // console.log(selValue);
  if ((selValue == "trans") || (selValue == "promo")) {
    delete data2['contentTemplateSubType'];
  }

  Request(Endpoints.get("saveTemplate"), "POST", $.extend({}, data, data2),
    { showMainLoader: true }
  ).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      Alert.clearAll();
      resData.message &&
        (resData.result === "Success"
          ? Alert.success(resData.message)
          : Alert.error(resData.message));
      $('#messageModal').modal('hide');
      // console.log(resData);
      $("#template-msg-form")[0].reset();
    }
  });

});

$('#messageModal').on('shown.bs.modal', function (e) {
  $("#templateTitleTxt").html($("#templateTitle").val());
  $("#templateTypeTxt").html($("input[name='templateType']").val());
   $("#templateTextTxt").html($("#templateText").val());
  $("#senderIdTxt").html($("#senderId").val());
  $("#statusTxt").html($("#status").val());
  $("#operatorTemplateIdTxt").html($("#operatorTemplateId").val());

  var tempType = $("input[name='contentTemplateType']:checked").parent().find('label').text();
  if (tempType == 'Service') {
    $(".serviceTypeModal").removeClass('d-none');
    $("#serviceType").html($("input[name='contentTemplateSubType']:checked").parent().find('label').text());
  } else {
      $(".serviceTypeModal").addClass('d-none');
    $("#serviceType").html("-");
  }
  $("#templateType").html(tempType);

  $("#variableCount").html(variableCount());
});

function variableCount() {
  var msg = $("#templateText").val();
  var count = (msg.match(/{#var#}/g) || []).length;
  return count;
}

const defaultData = {
  loggedInUserName: User.getName()
};

$("#view-campaign-tab").click(function (e) {
  renderTable("tavleViewTemplate", defaultData);
});

// $("#edit-campaign-tab").click(function (e) {
//   renderEditTable("tableEditTemplate", defaultData);
// });


// $("#update").click(function (e) {

//   const data = {
//     loggedInUserName: User.getName(),
//     operation: "editContentTemplate",
//     userId: User.getUserId(),
//     operatorTemplateId: $("#editModal #templateId").html(),
//     status: $("#editModal #isActive").val(),
//     senderId: $("#editModal #senderIdModal").val(),
//     "templateTitle": $("#editModal #templateTitle").val(),
//     "templateDescription": $("#editModal #templateDescription").val(),
//     "templateText": $("#editModal #templateText").val(),
//     "contentTemplateType": $("input[name='contentTemplateTypeModal']:checked").val(),
//     "contentTemplateSubType": $("input[name='contentTemplateSubTypeModal']:checked").val(),
//     "entityId": $("#editModal #entityIdModal").val(),
//   };

//   var selValue = $("input[name='contentTemplateTypeModal']:checked").val();
//   if ((selValue == "trans") || (selValue == "promo")) {
//     delete data['contentTemplateSubType'];
//   }
//   // console.log(data);
//   Request(Endpoints.get("saveTemplate"), "POST", data,
//     { showMainLoader: true }
//   ).done(resData => {
//     if (Endpoints.validateResponse(resData)) {
//       $('#editModal').modal('hide');
//       let table = $("#tableEditTemplate").DataTable();
// Alert.clearAll();
//       resData.message &&
//         (resData.result === "Success"
//           ? Alert.success(resData.message)
//           : Alert.error(resData.message));

//       const data = {
//         loggedInUserName: User.getName()
//       };
//       renderEditTable("tableEditTemplate", data);
//     }
//   });

// });

function renderTable(id, reqData) {

  Request(Endpoints.get("viewAllTemplates"), "POST", reqData).done(data => {

    const grid = (data.data || {}).contentTemplateList || [];
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
  $('#' + id).html("");
    if ($.fn.dataTable.isDataTable('#' + id)) {
      $('#' + id).DataTable().destroy();
    }

    const fHeader = JSON.stringify(formattedTableHeader);

    var dtable = $('#' + id).DataTable({
      "paging": false,
      colReorder: {
        order: [1, 5, 6, 2, 4, 0, 7, 8, 9, 10, 11]
      },
      data: tableData,
      "columns": [
        { title: "operator TemplateId" },
        { title: "template Id" },
        { title: "sender Id" },
        { title: "createdDate" },
        { title: "status" },
        { title: "template Title" },
        { title: "template Description" },
        { title: "template Text" },
        { title: "content Template Type" },
        { title: "content Template SubType" },
        { title: "entityId" },
        { title: "action" }
      ],
      // "order": [[0, "desc"]],
      "columnDefs": [
        { responsivePriority: 10001, targets: 8 },
        { responsivePriority: 10002, targets: 9 },
        { responsivePriority: 10003, targets: 10 },
        {
          "targets": -1,
          "data": null,
          "defaultContent": "<button class='btn btn-danger'>Delete</button>"
        },
        {
          "targets": [3, 0, 1],
          "visible": false,
          "searchable": false
        }
      ]
    });

    const totalPageCount = (data.data || {}).totalPageCount || 0;
    $("#totalPages").val(totalPageCount);
    const pageNumber = +($("#pageNumber").val());
    if (totalPageCount > pageNumber) {
      $("#pageNext").show();
    } else {
      $("#pageNext").hide();
    }
    if (pageNumber >= 1) {
      $("#pagePrev").show();
    } else {
      $("#pagePrev").hide();
    }

    $('#' + id + ' tbody').on('click', 'button', function () {
      var otable = $('#' + id).DataTable();
      var data = otable.row($(this).parents('tr')).data();
      if (!data) {
        data = otable.row(this).data();
      }
      // console.log(data);
      const formData = {
        loggedInUserName: User.getName(),
        operatorTemplateId: data[5],
        templateName:data[1],
        operation: "removeTemplateFromList"
      };
      Request(Endpoints.get("deleteContentTemplate"), "POST", formData).done(resData => {
        if (Endpoints.validateResponse(resData)) {
          // console.log(resData.message);
          otable.row($(this).parents('tr')).remove().draw();
          renderTable("tavleViewTemplate", defaultData);
          Alert.clearAll();
          resData.message &&
            (resData.result === "Success"
              ? Alert.success(resData.message)
              : Alert.error(resData.message));
        }
      });
    });
  });

}

// function renderEditTable(id, reqData) {

//   Request(Endpoints.get("viewAllTemplates"), "POST", reqData).done(data => {
//     const grid = (data.data || {}).contentTemplateList || [];
//     const getHeading = (key) => {
//       let result = key.replace(/([A-Z])/g, " $1");
//       return result.charAt(0).toUpperCase() + result.slice(1);
//     }
//     const headerRow = grid[0];
//     let tableHeader = [];
//     let formattedTableHeader = [];
//     for (let key in headerRow) {
//       if (headerRow.hasOwnProperty(key)) {
//         tableHeader.push(key);
//         formattedTableHeader.push({ title: getHeading(key) });
//       }
//     }
//     const tableData = grid.map(row => {
//       var rowData = [];
//       tableHeader.forEach((key) => {
//         rowData.push(row[key] || "-")
//       });
//       return rowData;
//     });

//     // var table;
//     // if ($.fn.dataTable.isDataTable('#example')) {
//     //   table = $('#'+id).DataTable();
//     //   console.log(id,"destory");
//     // }
//     // else {
//     //   console.log(id,"paging");
//     //   table = $('#'+id).DataTable({
//     //     paging: false
//     //   });
//     // }
//     var tables = $.fn.dataTable.fnTables(true);

//     $(tables).each(function () {
//       $(this).dataTable().fnClearTable();
//       $(this).dataTable().fnDestroy();
//     });
//     // if ($.fn.dataTable.isDataTable('#' + id)) {
//     //   console.log(id,"destory");
//     //   $('#' + id).DataTable().destroy();
//     // }
//     // console.log(id, "running");
//     const fHeader = JSON.stringify(formattedTableHeader);

//     var dtable = $('#' + id).DataTable({
//       "paging": false,
//       // "bDestroy": true,
//       colReorder: {
//         order: [1, 5, 6, 2, 4, 0, 7, 8, 9, 10, 11]
//       },
//       data: tableData,
//       "columns": [
//         { title: "operator TemplateId" },
//         { title: "template Id" },
//         { title: "sender Id" },
//         { title: "createdDate" },
//         { title: "status" },
//         { title: "template Title" },
//         { title: "template Description" },
//         { title: "template Text" },
//         { title: "content Template Type" },
//         { title: "content Template SubType" },
//         { title: "entityId" },
//         { title: "action" }
//       ],
//       // "order": [[0, "desc"]],
//       "columnDefs": [
//         { responsivePriority: 10001, targets: 8 },
//         { responsivePriority: 10002, targets: 9 },
//         { responsivePriority: 10003, targets: 10 },
//         {
//           "targets": -1,
//           "data": null,
//           "defaultContent": "<button class='btn btn-primary'>Edit</button>"
//         },
//         {
//           "targets": [3, 0, 1],
//           "visible": false,
//           "searchable": false
//         }
//       ]
//     });

//     const totalPageCount = (data.data || {}).totalPageCount || 0;
//     $("#totalPages").val(totalPageCount);
//     const pageNumber = +($("#pageNumber").val());
//     if (totalPageCount > pageNumber) {
//       $("#pageNext").show();
//     } else {
//       $("#pageNext").hide();
//     }
//     if (pageNumber >= 1) {
//       $("#pagePrev").show();
//     } else {
//       $("#pagePrev").hide();
//     }

//     $('#' + id + ' tbody').on('click', 'button', function () {
//       $("#editModal").modal("show");
//       var otable = $('#' + id).DataTable();
//       var data = otable.row($(this).parents('tr')).data();
//       if (!data) {
//         data = otable.row(this).data();
//       }
//       const formData = {
//         loggedInUserName: User.getName(),
//         templateTitle: data[1]
//       };
//       Request(Endpoints.get("searchTemplate"), "POST", formData).done(resData => {
//         if (Endpoints.validateResponse(resData)) {
//           // console.log(resData);
//           var senderIDSelect = document.getElementById("senderIdModal");
//           $.each(listSenderID, function (key, value) {
//             if (value.senderId == resData.data.contentTemplate['senderId']) {
//               senderIDSelect.options[senderIDSelect.options.length] = new Option(value.senderId, value.senderId, true, true)
//             } else {
//               senderIDSelect.options[senderIDSelect.options.length] = new Option(value.senderId, value.senderId);
//             }
//           });

//           // $(".modalRadio [type=radio]").click(function () {
//           //   var selValue = $("input[name='contentTemplateTypeModal']:checked").val();
//           //   if ((selValue == "trans") || (selValue == "promo")) {
//           //     $(".service_type_modal").addClass("d-none");
//           //   } else {
//           //     $(".service_type_modal").removeClass("d-none");
//           //   }
//           // });

//           $("#" + data[7]).prop("checked", true);
//           // if (data[8] !== "-") {
//           //   $(".service_type_modal").removeClass("d-none");
//           // }
//           $("#" + data[8]).prop("checked", true);

//           // $("#editModal #templateTitle").html(resData.data.contentTemplate['templateTitle']);
//           $("#editModal #templateId").html(resData.data.contentTemplate['dltTemplateId']);
//           $("#editModal #isActive").val(resData.data.contentTemplate['status'].toLowerCase());
//           $("#editModal #templateTitle").val(data[1]);
//           $("#editModal #templateDescription").val(data[2]);
//           $("#editModal #templateText").val(data[6]);
//           if (data[9] == "-") {
//             $("#editModal #entityIdModal").val('');
//           }else {
//               $("#editModal #entityIdModal").val(data[9]);
//           }

//         }
//       });
//     });
//   });

// }

function checkTextType(data) {
  var plain = new RegExp("^[A-Za-z0-9_~\\-!:\\/.@\\|\\,#\\$%\\^&\\*\\(\\)\n\s +=\\\\{}\\[\\];'\"<>?₹]*$");
  if (plain.test(data.trim())) {
    return true;
  } else {
    return false;
  }
}

$(document).ready(function () {
  $("#template-msg-form [type=radio]").click(function () {
    var selValue = $("input[name='contentTemplateType']:checked").val();
    if ((selValue == "trans") || (selValue == "promo")) {
      $(".service_type").addClass("d-none");
    }
    else {
      $(".service_type").removeClass("d-none");
    }

    if (selValue !== "promo") {
      data['messageType'] = "others";
    } else {
      data['messageType'] = selValue;
    }
    if (selValue == "service") {
      data['messageSubType'] = $("input[name='contentTemplateSubType']:checked").val();
    } else {
      // data['messageSubType'] = "";
      delete data['messageSubType'];
    }
    loadSenderId(data);
  });
  var selValue = $("input[name='contentTemplateType']:checked").val();
  if (selValue !== "promo") {
    data['messageType'] = "others";
  } else {
    data['messageType'] = selValue;
  }
  if (selValue == "service") {
    data['messageSubType'] = $("input[name='contentTemplateSubType']:checked").val();
  } else {
    // data['messageSubType'] = "";
    delete data['messageSubType'];
  }
  loadSenderId(data);
});

var listSenderID;
function loadSenderId(userInput) {
  var senderIDSelect = document.getElementById("senderId");
  Request(Endpoints.get("viewSenderIdListByMessageType"), "POST", userInput, {
    showMainLoader: true
  }).done(data => {
    const gpList = data.data.senderIdList;
    listSenderID = gpList;
    senderIDSelect.options.length = 0;
    $.each(gpList, function (key, value) {
      senderIDSelect.options[senderIDSelect.options.length] = new Option(value.senderId, value.senderId);
    });
  });
}

$("#upload-content-template-form").submit(function (e) {
  e.preventDefault();
  const selectFile = $("#selectFile").get(0).files[0];
  var selectedFileName = $("#selectFile").get(0).files[0].name;
Alert.clearAll();
  if (!selectFile) {
    Alert.info("Please select a file.");
    return;
  }

  var ar = /^(\d|\w|-)+$/;
  if (ar.test(selectedFileName.split(".")[0]) == false) {
    Alert.error("File Name should not contain space", {
      clearTime: 10 * 1000
    });
    return;
  }
  var fileTypeExtension= $("input[name='fileTypes']:checked").val();
  var extension = selectedFileName.substr( (selectedFileName.lastIndexOf('.') +1) );

  if (extension != fileTypeExtension) {
    Alert.error("File Type Mismatch");
    return;
  }
    if ((["csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"].indexOf(selectFile.type) == -1)) {
    Alert.error("Only  csv,xlsx,xls files are allowed.");
      return;
    }
  

  const formData = new FormData();
  formData.append("userName", User.getName());
  formData.append("fileType", $("input[name='fileType']:checked").val());
  formData.append("file", selectFile);
  formData.append("entityId", $("#entityIdUploadPage").val());
  formData.append("operatorId", $("#operatorId").val());


  // console.log(formData);
  Request(Endpoints.get("dltDataFile"), "POST", formData, {
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

$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
if (fileName.length >= 30) {
      fileName = fileName.slice(0, 30) + "....";
  }
  if (!fileName) {
      fileName = "Choose file";
  }

  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
$("#upload-content-template-form").on('reset', function (event) {
  $(".custom-file-label").html("Choose file");
});
$("#upload-gblacklist .fileType").click(function () {
  var type = $(this).val();
  if (type == "HEADER_FILE") {
    $("#upload-gblacklist .tmpfile").addClass("d-none");
  $('#upload-gblacklist #fileTypes-0')[0].checked = true;
  }else{
      $("#upload-gblacklist .tmpfile").removeClass("d-none");
  }
  });
  var contentTempType = $("input[name='fileType']:checked").val();
  if (contentTempType == "HEADER_FILE") {
    $("#upload-gblacklist .tmpfile").addClass("d-none");
  $('#upload-gblacklist #fileTypes-0')[0].checked = true;
  }else{
      $("#upload-gblacklist .tmpfile").removeClass("d-none");
  }
  