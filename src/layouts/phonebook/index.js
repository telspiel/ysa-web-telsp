// import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";
import Cookie from "./../../scripts/cookie";
const table = require("./../../partials/table.hbs");

console.log("Welcome to Phonebook!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

var select = document.getElementById("groupList");
var select1 = document.getElementById("groupList1");
var select2 = document.getElementById("uploadGroupList");

loadGroupDropdown();



function loadGroupDropdown() {
  const data = {
    loggedInUserName: User.getName()
  };
  Request(Endpoints.get("allGroupList"), "POST", data).done(data => {
    //var select = document.getElementById("groupList");
    const gpList = data.data.groupList;
    console.log(select1.options.length);
    // select1.options[select1.options.length] = new Option("all", "all");
    // select1.options[2] = new Option("all", "all");

    select.options.length = 0;
    select1.options.length = 0;
    select2.options.length = 0;

    $.each(gpList, function (key, value) {
      var drpcont = key + 1;
      select.options[select.options.length] = new Option(value.groupName, value.groupName);
      select1.options[select1.options.length] = new Option(value.groupName+" ("+value.numbersInGroupCount+")", value.groupName);
      select2.options[select2.options.length] = new Option(value.groupName, value.groupName);
      $("#groupList1 option:nth-child(" + (drpcont + 1) + ")").attr("id", value.groupId);
      $("#uploadGroupList option:nth-child(" + drpcont + ")").attr("id", value.groupId);

    });
    // select1.options[select1.options.length] = new Option("all", "all");
    // $("#groupList1 option:nth-child(2)").attr("id", "all");
         exportfile();
  });

}
$("#add-contact-tab").click(function (e) {
  loadGroupDropdown();
});

$("#upload-contacts-tab").click(function (e) {
  loadGroupDropdown();
});

$("#add-contact-form").submit(function (e) {
  e.preventDefault();

  const formData = {};

  $(this)
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });

  const additionalData = {
    loggedInUsername: User.getName(),
    operation: "addContactNumber"
  };

  formData['contactNumber'] = "91" + formData['contactNumber'];
  Request(
    Endpoints.get("addNumber"),
    "POST",
    $.extend({}, formData, additionalData)
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
      console.log(data);
      Alert.clearAll();
      $("#add-contact-form")[0].reset();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message),{
              clearTime: 50 * 1000

          });
$('#searchTable').html("");
          setTimeout(function(){
             loadGroupDropdown();
      }, 2000);

    }

  });

});

$("#searchContact").submit(function (e) {
  e.preventDefault();
  const formData = {};
      console.log( this[3].value);
  $(this)
    .serializeArray()
    .forEach(i => {
      formData[i.name] = i.value;
    });
    var contactNumber=$('#contactNumb').val();

  if (contactNumber.length==0) {
formData['contactNumber'] = formData['contactNumber'];
  }else{
  formData['contactNumber'] = "91" + formData['contactNumber'];
}
  const additionalData = {
    loggedInUsername: User.getName(),
pageNumber: $("#pageNumber").val(),
operation: ""
  };

  var param = $.extend({}, formData, additionalData);
  var api = "searchNumber";

  buildDataTable(api, param);

});
$("#pageNext").click(() => {
  const pageNumber = +($("#pageNumber").val());
  const totalPages = +($("#pageNumber").val());
  console.log(pageNumber+"  "+totalPages);
  if (pageNumber == totalPages) {
    $("#pageNumber").val(pageNumber + 1);
    $("#searchContact").submit();
  }
});
$("#pagePrev").click(() => {

  const pageNumber = ($("#pageNumber").val());
  const totalPages = ($("#pageNumber").val());
  console.log(pageNumber+"  "+totalPages);
  if (pageNumber > 1) {
    $("#pageNumber").val(pageNumber - 1);
    $("#searchContact").submit();
  }
});
$("#upload-contacts").submit(function (e) {
  e.preventDefault();
  const selectFile = $("#selectFile").get(0).files[0];
  var selectedFileName = $("#selectFile").get(0).files[0].name;

  if (!selectFile) {
    Alert.info("Please select a file.");
    return;
  }
  console.log(selectFile);

  var ar = /^(\d|\w|-)+$/;
  if (ar.test(selectedFileName.split(".")[0]) == false) {
    Alert.clearAll();
    Alert.error("File Name should not contain space", {
      clearTime: 10 * 1000
    });
    return;
  }

  console.log(selectFile.type);
  if (["text", "text/plain", "application/vnd.ms-excel","text/csv"].indexOf(selectFile.type) == -1) {
    Alert.error("Only .txt / .csv files are allowed.");
    return;
  }

  var e = document.getElementById("uploadGroupList");
  var groupId = e.options[e.selectedIndex].id;

  const formData = new FormData();
  formData.append("userName", User.getName());
  formData.append("fileType", selectFile.type);
  formData.append("file", selectFile);
  formData.append("groupId", groupId);
  formData.append("fileName", selectFile.name);


  console.log(formData);
  Request(Endpoints.get("uploadContacts"), "POST", formData, {
    showMainLoader: true,
    contentType: false,
    processData: false,
    data: formData
  }).done(data => {
    if (Endpoints.validateResponse(data)) {
      $("#upload-contacts")[0].reset();
      $(".custom-file-label").html('Choose File');
      Alert.clearAll();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message, {
            clearTime: 10 * 1000
          })
          : Alert.error(data.message, {
            clearTime: 10 * 1000
          }));
    }
  });
});

// Get ALL numbers
$("#AllContact").click(function (e) {
  searchAllByGroup();

});

function searchAllByGroup() {
  var e = document.getElementById("groupList1");
  var userid = e.options[e.selectedIndex].id;
  const data = {
    loggedInUsername: User.getName(),
    operation: "getAllNumbersInTheGroup",
    groupId: userid,
  };

  var api = "getAllNumbers";
  buildDataTable(api, data);
}
function buildDataTable(api, data1) {
  Request(
    Endpoints.get(api),
    "POST", data1
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
Alert.clearAll();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message),{
              clearTime: 10 * 1000
          });
          $('#contactNumb').val('');
if(data.data !=null){
      $("#dwnloadBtn #report_donwload").removeClass("d-none");
      $(".deletebutton").removeClass("d-none");
      $("#dwnloadBtn").html(data.data.downloadReportLink);
      getDownloadableFile();
      $("#dwnloadBtn #report_donwload").addClass("btn btn-primary");
    }else{
      console.log("check");
      $('#searchTable').html("");
        $("#dwnloadBtn #report_donwload").addClass("d-none");
        $(".deletebutton").addClass("d-none");
    }

      const grid = (data.data || {}).phonebookList || [];
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

      if ($.fn.dataTable.isDataTable('#searchTable')) {
        $('#searchTable').DataTable().destroy();
      }

      const fHeader = JSON.stringify(formattedTableHeader);

      var dtable = $('#searchTable').DataTable({
        "paging": false,
        "aoColumns": [{ "sTitle": "<input type='checkbox' id='selectAll'></input>" }],
        data: tableData,
        "columns": [
          { title: "id" },
          { title: "groupId" },
          { title: "groupName" },
          { title: "contactNumber" },
          { title: "contactName" }
        ],
        buttons: [
          {
            text: 'Delete Selected',
            className: 'btn btn-danger deletebutton',
            action: function () {
              // dtable.rows().select();
              deleteSelected(dtable);
            }
          }
        ],
        dom: 'Bfrtip',
        //   "order": [[0, "desc"]],
        'columnDefs': [
          {
            'targets': 0,
            'checkboxes': {
              'selectRow': true
            }
          },
          {
            'targets': 1,
            'visible': false,
            'searchable': false
          }
        ],
        'select': {
          'style': 'multi'
        },
      });

      const totalPageCount = (data.data || {}).totalPageCount || 0;
      // $("#totalPages").val(totalPageCount);
      // $("#pageNumber").val(totalPageCount);
      if(data.data.phonebookList.length<10){
         $("#pageNext").hide();
      }
      else {
        $("#pageNext").show();
      }
      if(data.data.totalPageCount=="2"){
             $("#pagePrev").hide();
      }
      else {
        $("#pagePrev").show();
      }
// console.log(totalPageCount);
//       const pageNumber = +($("#pageNumber").val());
//       console.log(pageNumber);
//       if (totalPageCount == pageNumber) {
//         $("#pageNext").show();
//       } else {
//         $("#pageNext").hide();
//       }
//
//       if (pageNumber > 1) {
//         $("#pagePrev").show();
//       } else {
//         $("#pagePrev").hide();
//       }

    }
  });
}
// export file
function exportfile(){
  var userName = $("#groupList1").val();
  const data1 = {
    pageNumber:1,
    contactNumber:"",
    loggedInUsername: User.getName(),
    operation: "exportFile",
    groupName: userName,
  }
  Request(
    Endpoints.get("searchNumber"),
    "POST", data1
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
  Alert.clearAll();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message)
          : Alert.error(data.message),
        {
            clearTime: 10 * 1000
        });
    // $("#donwloadFileButton").removeClass("d-none");
      $("#donwloadFileButton").html(data.data.downloadReportLink);
      getDownloadableFile();
      $("#donwloadFileButton #report_donwload").css("color","white");

    }
  });
}

$("#groupList1").change(function(){
$("#pageNumber").val("1");
  $('#searchTable').html("");
    $("#dwnloadBtn #report_donwload").addClass("d-none");
exportfile();
});

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
    loggedInUsername: User.getName(),
    operation: "removeContactNumber",
    contactIdsToRemove: rowIdMap
  };
  Request(Endpoints.get("deleteNumber"), "POST", formData).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      // $("#searchContact")[0].reset();
      // searchAllByGroup();
        $('#searchTable').html("");
        setTimeout(function(){
loadGroupDropdown();
         exportfile();;
    }, 2000);
      $("#dwnloadBtn #report_donwload").addClass("d-none");
      Alert.clearAll();
      resData.message &&
        (resData.result === "Success" ?
          Alert.success(resData.message) :
          Alert.error(resData.message));
    }
  });
}
function getDownloadableFile() {
  $('#donwloadFileButton').on('click', 'a', function (e) {
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
        a.download =  User.getName()+"-"+dTime+"-phonebookList.csv";
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
        a.download =  User.getName()+"-"+dTime+"-phonebookList.csv";
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
