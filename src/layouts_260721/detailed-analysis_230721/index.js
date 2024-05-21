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
  //  $("#misTable").html(table({ formattedTableHeader, tableData }));

  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }

  var tabled = $('#misTable').DataTable({
    data: tableData,
    "columns": [
      { title: "campaign Name" },
      { title: "child ShortUrl" },
      { title: "Mobile Number" },
      { title: "created Date" },
      { title: "user IpAddress" },
      { title: "browser Details" },
      { title: "operating System" },
      { title: "device Details" },
      { title: "country" },
      { title: "region" },
      { title: "city" },
      { title: "zip" },
    ]
  });


  // $("[data-toggle=popover]").mousedown(function(){
  //    //toggle popover when link is clicked
  //    $(this).popover('toggle');
  //    });

  //  function strtrunc(str, max, add) {
  //     add = add || '...';
  //     return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
  // };



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
    maxDate: '0',
    dateFormat: 'yyyy-mm-dd',
    value: '12.03.2013',
    format: 'Y-m-d',
    closeOnDateSelect: true
  }).attr('readonly', 'readonly');


  const data = {
    loggedInUserName: User.getName(),
    fromDate: $("#fromDate").val(),
    toDate: $("#toDate").val(),
    pageNumber: $("#pageNumber").val(),
  };

  // if (data.mobileNumber !== "") {
  //   data.pageNumber = 1;
  // }

  Request(Endpoints.get("detailedAnalysisReport"), "POST", data, {
    showMainLoader: true
  }).done(data1 => {
    renderDetailedMis(data1);
    var donwloadlink = data1.data.downloadReportLink;
    if (donwloadlink != null) {
      $("#donwloadFileButton").html(donwloadlink);
      getDownloadableFile();
      $("#donwloadFileButton").removeClass("d-none");
    } else {
      $("#donwloadFileButton").addClass("d-none");
    }
  });

  $("#controls-form").submit(function (e) {
    e.preventDefault();
    var mobilenumber = $('#mobileNumber').val();
    if (mobilenumber.length > 0) {
      var number = "91" + mobilenumber;
    }
    else {
      number = "";
    }
    const data = {
      loggedInUserName: User.getName(),
      fromDate: this[0].value,
      toDate: this[1].value,
      mobileNumber: number,
      pageNumber: $("#pageNumber").val(),
    };

    // if (data.mobileNumber !== "") {
    //   data.pageNumber = 1;
    // }

    Request(Endpoints.get("detailedAnalysisReport"), "POST", data, {
      showMainLoader: true
    }).done(data1 => {
      renderDetailedMis(data1);
      var donwloadlink = data1.data.downloadReportLink;
      if (donwloadlink != null) {
        $("#donwloadFileButton").html(donwloadlink);
        getDownloadableFile();
        $("#donwloadFileButton").removeClass("d-none");
      } else {
        $("#donwloadFileButton").addClass("d-none");
      }
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
        a.download = User.getName() + "-" + dTime + "-detailReport.csv";
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
