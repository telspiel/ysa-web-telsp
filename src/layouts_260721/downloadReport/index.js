import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";
import Cookie from "./../../scripts/cookie";
const table = require("./../../partials/table.hbs");

console.log("Welcome to detailed mis!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

$("#fromDate,#toDate").datetimepicker({
  timepicker: false,
  maxDate: '0',
   value: '12.03.2013',
   dateFormat: 'dd-mm-yyyy',
  //value: '12.03.2013',
  format: 'd-m-Y',
  closeOnDateSelect: true
}).attr('readonly', 'readonly');

const renderDetailedMis = (data) => {
  if (!Endpoints.validateResponse(data)) {
    return false;
  }
  const grid = (data.data || {}).grid || [];
  // grid.reverse();
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  const headerRow = grid[0];
  let tableHeader = ["id"];
  let formattedTableHeader = [];
  for (let key in headerRow) {
    if (headerRow.hasOwnProperty(key)) {
      tableHeader.push(key);
      formattedTableHeader.push(getHeading(key));
    }
  }
  for (let g in grid) {
    let a = grid[g];
    a['id'] = g;
  }

  // console.log(grid);
  const tableData = grid.map(row => {
    var rowData = [];
    tableHeader.forEach((key) => {
      var url = key;
      // if (url.charAt(0) === '"' && url.charAt(url.length - 1) === '"') {
      //   console.log(url.substr(1, url.length - 2));
      // }
      rowData.push(row[url] || "-")
    });
    return rowData;
  });

  //  $("#misTable").html(table({ formattedTableHeader, tableData }));
  // var td = tableData.reverse();
  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }

  $('#misTable').DataTable({
    data: tableData,
    bPaginate: false,
    order: [[0, "desc"]],
    // colReorder: {
        //     order: [ 0,5,6,1,2,3,7,8,9]
        // },
    "columns": [
      { title: "id" },
      { title: "From Date" },
      { title: "To Date" },
      { title: "Status" },
      { title: "Download Report Link" },
      {title:"Campaign Name"},
     
    ],
   
     colReorder: {
      order: [ 0,1,2,5,3,4],
        },
    "columnDefs": [
      {
        "targets": [0],
        "visible": false,
        "searchable": false
      }
    ]
  });

  $('#misTable tbody').on('click', 'a', function (e) {

      e.preventDefault();

      getDownloadableFile(this.getAttribute('href'));

      // console.log(this.getAttribute('href'));
      //   Request(this.getAttribute('href'), "GET").done(resData => {
      //   });
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

  $("#controls-form").submit(function (e) {
  var campid =  $('#campaignNameDiv .campaignName option:selected').val();
  var campName =  $('#campaignNameDiv .campaignName option:selected').text();
if(campName == "ALL"){
  campName ="";
  campid = "0";
}
    e.preventDefault();
    const data = {
      username: User.getName(),
      fromDate: this[0].value,
      toDate: this[1].value,
      // mobileNumber: this[2].value,
      pageNumber: +this[3].value,
      campaignId:campid,
      campaignName:campName
    };
    Request(Endpoints.get("generateReport"), "POST", data, {
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

var campid =  $('#campaignNameDiv .campaignName option:selected').val();
var campName =  $('#campaignNameDiv .campaignName option:selected').text();
const data = {
  username: User.getName(),
  fromDate: now,
  toDate: now,
  // mobileNumber: "",
  pageNumber: 1,
  campaignId:campid,
      campaignName:campName
  
};
Request(Endpoints.get("downloadReport"), "POST", data).done(data => {
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

function getDownloadableFile(url) {
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
        a.download =  User.getName()+"-"+dTime+".zip";
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
      }
    };
    // Post data to URL which handles post request
    xhttp.open("GET", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    xhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    xhttp.setRequestHeader("Authorization", Cookie.get("webtoolJWT"));
    // You should set responseType as blob for binary responses
    xhttp.responseType = 'blob';
    xhttp.send();
    exit();
}

// Get Campaign Name
$("#controls-form .downloadReportDate").blur(function(){
  var camapaignNameSelected = document.querySelector("#campaignNameDiv .campaignName");
var newFromDate = $("#fromDate").val().split("-").reverse().join("-");
 var newToDate = $("#toDate").val().split("-").reverse().join("-");  
const data = {
  loggedInUserName: User.getName(),
  fromDate:newFromDate,
  toDate: newToDate,
  // pageNumber: 50,
};
Request(Endpoints.get("campaignReport"), "POST", data, {
  showMainLoader: true
}).done(data1 => {
 
const aList = data1.data.grid;
console.log(data1.data.grid);
 camapaignNameSelected.options.length = 1;
$.each(aList, function (key, value) {
 camapaignNameSelected.options[camapaignNameSelected.options.length] = new Option(data1.data.grid[key].campaignName, data1.data.grid[key].campaignId);
});
})
});

var camapaignNameSelected = document.querySelector("#campaignNameDiv .campaignName");
var newFromDate = $("#fromDate").val().split("-").reverse().join("-");
 var newToDate = $("#toDate").val().split("-").reverse().join("-");  
const datas = {
  loggedInUserName: User.getName(),
  fromDate:newFromDate,
  toDate: newToDate,
  // pageNumber: 50,
};
Request(Endpoints.get("campaignReport"), "POST", datas, {
  showMainLoader: true
}).done(data1 => {
 
const aList = data1.data.grid;
console.log(data1.data.grid);
 camapaignNameSelected.options.length = 1;
$.each(aList, function (key, value) {
 camapaignNameSelected.options[camapaignNameSelected.options.length] = new Option(data1.data.grid[key].campaignName, data1.data.grid[key].campaignId);
});
})
