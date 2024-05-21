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
  dateFormat: 'yyyy-mm-dd',
  value: '12.03.2013',
  format: 'Y-m-d',
  closeOnDateSelect: true
}).attr('readonly', 'readonly');


// Render Table
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

  console.log(tableData)
  var dtable = $('#misTable').DataTable({
    data: tableData,
    "order": [[0, "desc"]],
    paging: false,
    "columnDefs": [
      { className: "text-wrap", "targets": [1] },
      {
        "targets": [2],
        "visible": false,
        "searchable": false
      }, {
        "targets": -1,
        "data": null,
        "defaultContent": "<button class='btn btn-info' id='clicker'> Clicker Analytics</button> &nbsp; <button class='btn btn-success' id='detail'> Detailed Analytics</button>"
      }]
  });

  $('#misTable tbody').on('click', 'button#clicker', function () {
    var data = dtable.row($(this).parents('tr')).data();
    if (data) {
      let id = 0;
      if (data[2] == "-") {
        // localStorage.setItem("campaignId", 0);
      } else {
        id = data[2];
        // localStorage.setItem("campaignId", data[2]);
      }
      // localStorage.setItem("campaignName", data[1]);

      // window.open(
      //   "/clicker-analysis",
      //   '_blank' // <- This is what makes it open in a new window.
      // );

      $(".campaign-div").addClass("d-none");
      $("#clicker-div").removeClass("d-none");
      generateClickerAnalysisPage(id, data[1]);

    }
  });

  $('#misTable tbody').on('click', 'button#detail', function () {
    var data = dtable.row($(this).parents('tr')).data();
    if (data) {
      let id = 0;
      if (data[2] == "-") {
        // localStorage.setItem("campaignId", 0);
      } else {
        id = data[2];
        // localStorage.setItem("campaignId", data[2]);
      }
      // localStorage.setItem("campaignId", data[2]);
      // localStorage.setItem("campaignName", data[1]);
      // // location.href = "/detailed-analysis";
      // window.open(
      //   "/detailed-analysis",
      //   '_blank' // <- This is what makes it open in a new window.
      // );

      $(".campaign-div").addClass("d-none");
      $("#detailed-div").removeClass("d-none");
      generateDetailedAnalysisPage(id, data[1]);
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


// Form submit with from and to date
const now = moment(new Date()).format("YYYY-MM-DD");
$(() => {
  $("#controls-form").submit(function (e) {

    $(".campaign-div").removeClass("d-none");
    $("#clicker-div").addClass("d-none");

    e.preventDefault();
    const data = {
      loggedInUserName: User.getName(),
      fromDate: this[0].value,
      toDate: this[1].value,
      pageNumber: +this[2].value,
    };
    Request(Endpoints.get("campaignReport"), "POST", data, {
      showMainLoader: true
    }).done(data1 => {
      renderDetailedMis(data1);
      Alert.clearAll();
      data1.message &&
        (data1.result === "Success"
          ? Alert.success(data1.message, {
            clearTime: 10 * 1000
          })
          : Alert.error(data1.message, {
            clearTime: 10 * 1000
          }));

      var donwloadlink = data1.data.downloadReportLink;
      if (donwloadlink != null) {
        $("#donwloadCampaignReport").html(donwloadlink);
        getDownloadableFile();
        $("#donwloadCampaignReport").removeClass("d-none");
      } else {
        $("#donwloadCampaignReport").addClass("d-none");
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


/////////////////////////////////////////////////////////////////////// Clicker Analaysis /////////////////////////////////////////////////////

$(".backToHome").click(() => {
  $(".campaign-div").removeClass("d-none");
  $("#clicker-div").addClass("d-none");
  $("#detailed-div").addClass("d-none");
});

function generateClickerAnalysisPage(id, name) {
  Request(Endpoints.get("clickerAnalysis"), "POST", {
    loggedInUserName: User.getName(),
    campaignId: id,
    campaignName: name
  }).done(data1 => {
    if (Endpoints.validateResponse(data1)) {
      var donwloadlink = data1.data.downloadReportLink;
      if (donwloadlink != null) {
        $("#donwloadFileButton").html(donwloadlink);
        getClickerDownloadableFile();
        $("#donwloadFileButton").removeClass("d-none");
      } else {
        $("#donwloadFileButton").addClass("d-none");
      }
      const dashboardData = data1.data || {};
      const grid = dashboardData.grid[0];

      $("#deliveryStatus").html();
      $("#clickerStatus").html();
      renderStats(grid);
      clickerStatus(grid);
      deliveryStatus(grid);
    }
  });
}

const renderStats = (data) => {
  console.log(data);
  for (let key in data) {
    $("#" + key).html(data[key]);
  }
}

const deliveryStatus = (data) => {

  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  let headingData = ['totalDelivered', 'totalFailed', 'totalAwaited'];
  let head = [];
  let graphData = [];
  for (let key in headingData) {
    head.push(getHeading(headingData[key]));
    graphData.push(parseInt(data[headingData[key]]));
  }
  var colors1 = ['#3e3181', '#e951a5','#6c757d'];
  var options = {
    series: graphData,
    chart: {
      width: 380,
      type: 'pie',
    },
    colors : colors1,
    labels: head,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var chart = new ApexCharts(document.querySelector("#deliveryStatus"), options);
  chart.render();

}

const clickerStatus = (data) => {
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  console.log(data);
  let headingData = ['totalDelivered', 'totalClicks'];
  let head = [];
  let graphData = [];
  for (let key in headingData) {
    head.push(getHeading(headingData[key]));
    graphData.push(parseInt(data[headingData[key]]));
  }

  console.log(graphData);
  console.log(head);
  var colors = ['#3e3181', '#e951a5'];
  var options = {
    series: graphData,
    labels: head,
    chart: {
      width: 380,
      type: 'pie',
    },
    colors : colors,
    dataLabels: {
      enabled: true
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var chart = new ApexCharts(document.querySelector("#clickerStatus"), options);
  chart.render();

}

/////////////////////////////////////////////////////////////////////// End Clicker Analaysis /////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////// Detailed Analaysis /////////////////////////////////////////////////////

function generateDetailedAnalysisPage(id, name) {

  const data = {
    loggedInUserName: User.getName(),
    campaignId: id,
    campaignName: name,
    pageNumber: $("#detailed-pageNumber").val(),
  };

  getAPICall(data);

  $("#detailed-controls-form").submit(function (e) {
    e.preventDefault();

    const data = {
      loggedInUserName: User.getName(),
      mobileNumber: "91"+this[0].value,
      campaignId: id,
      campaignName: name,
      pageNumber: $("#detailed-pageNumber").val(),
    };

    // if (data.mobileNumber !== "") {
    //   data.pageNumber = 1;
    // }

    getAPICall(data);
    // Request(Endpoints.get("detailedAnalysis"), "POST", data, {showMainLoader: true}).done(data1 => {
    //   renderDetailedAnalysis(data1);
    //   var donwloadlink = data1.data.downloadReportLink;
    //   if (donwloadlink != null) {
    //     $("#detailed-donwloadFileButton").html(donwloadlink);
    //     getDetailedDownloadableFile();
    //     $("#detailed-donwloadFileButton").removeClass("d-none");
    //   } else {
    //     $("#detailed-donwloadFileButton").addClass("d-none");
    //   }
    // });

  });


  $("#detailed-pageNext").click(() => {
    const pageNumber = +($("#detailed-pageNumber").val());
    const totalPages = +($("#detailed-totalPages").val());
    if (pageNumber < totalPages) {
      $("#detailed-pageNumber").val(pageNumber + 1);
      $("#detailed-controls-form").submit();
    }
  });
  $("#detailed-pagePrev").click(() => {
    const pageNumber = +($("#detailed-pageNumber").val());
    if (pageNumber > 1) {
      $("#detailed-pageNumber").val(pageNumber - 1);
      $("#detailed-controls-form").submit();
    }
  });
}


function getAPICall(data){
  Request(Endpoints.get("detailedAnalysis"), "POST", data, {showMainLoader: true}).done(data1 => {
    renderDetailedAnalysis(data1);
    var donwloadlink = data1.data.downloadReportLink;
    if (donwloadlink != null) {
      $("#detailed-donwloadFileButton").html(donwloadlink);
      getDetailedDownloadableFile();
      $("#detailed-donwloadFileButton").removeClass("d-none");
    } else {
      $("#detailed-donwloadFileButton").addClass("d-none");
    }
  });
}

const renderDetailedAnalysis = (data) => {

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

  if ($.fn.dataTable.isDataTable('#detailed-misTable')) {
    $('#detailed-misTable').DataTable().destroy();
  }

  var tabled = $('#detailed-misTable').DataTable({
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

  const totalPageCount = (data.data || {}).totalPageCount || 0;
  $("#detailed-totalPages").val(totalPageCount);

  const pageNumber = +($("#detailed-pageNumber").val());
  if (totalPageCount > pageNumber) {
    $("#detailed-pageNext").show();
  } else {
    $("#detailed-pageNext").hide();
  }

  if (pageNumber > 1) {
    $("#detailed-pagePrev").show();
  } else {
    $("#detailed-pagePrev").hide();
  }
}


/////////////////////////////////////////////////////////////////////// End Detailed Analaysis /////////////////////////////////////////////////////

// Download Report Block
const data = {
  loggedInUserName: User.getName(),
  fromDate: now,
  toDate: now,
  pageNumber: 1
};
Request(Endpoints.get("campaignReport"), "POST", data).done(data => {
  renderDetailedMis(data);
  var donwloadlink = data.data.downloadReportLink;
  if (donwloadlink != null) {
    $("#donwloadCampaignReport").html(donwloadlink);
    getDownloadableFile();
    $("#donwloadCampaignReport").removeClass("d-none");
  } else {
    $("#donwloadCampaignReport").addClass("d-none");
  }
});

function getDownloadableFile() {
  $('#donwloadCampaignReport').on('click', 'a', function (e) {
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
        a.download = User.getName() + "-" + dTime + "-campaignReport.csv";
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
    // exit();
    return false;
  });
}

// Clicker Download file
function getClickerDownloadableFile() {
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
        a.download = User.getName() + "-" + dTime + "-clickerAnalysis.csv";
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
    // exit();
    return false;
  });
}

//// Detailedd Download File
function getDetailedDownloadableFile() {
  $('#detailed-donwloadFileButton').on('click', 'a', function (e) {
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
        a.download =  User.getName()+"-"+dTime+"-detailReport.csv";
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
    return false;
  });
}
