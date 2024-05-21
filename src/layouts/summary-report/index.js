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


const renderDetailedMis = (data) => {
  /*if (!Endpoints.validateResponse(data)) {
    return false;
  }*/
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
      //      formattedTableHeader.push(getHeading(key));
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

  //  $("#misTable").html(table({ formattedTableHeader , tableData }));

  console.log(formattedTableHeader);
  console.log(JSON.stringify(formattedTableHeader));
  console.log(tableData);
  console.log(JSON.stringify(tableData));
  if ($.fn.dataTable.isDataTable('#misTable')) {
    $('#misTable').DataTable().destroy();
  }

  const fHeader = JSON.stringify(formattedTableHeader);

  $('#misTable').DataTable({
    data: tableData,
    "columns": [
      // { title: "Sequence Id" },
      { title: "Summary Date" },
      { title: "Total Request" },
      { title: "Total Rejected" },
      { title: "Total Submit" },
      { title: "Total Delivered" },
      { title: "Total Failed" },
      { title: "Total Awaited" }
    ],
    paging:false,
    "order": [[0, "desc"]],
    "footerCallback": function (row, data, start, end, display) {
      var api = this.api(), data;

      // Remove the formatting to get integer data for summation
      var intVal = function (i) {
        return typeof i === 'string' ?
          i.replace(/[\$,]/g, '') * 1 :
          typeof i === 'number' ?
            i : 0;
      };

      var columnCount = 6;
      for (let i = 0; i <= columnCount; i++) {

        // Total over this page
        var pageTotal = api
          .column(i, { page: 'current' })
          .data()
          .reduce(function (a, b) {
            return intVal(a) + intVal(b);
          }, 0);

        // Update footer
        $(api.column(i).footer()).html(pageTotal);

            $('tfoot td').css("font-weight", "bold");
            $('.Total').css("text-align", "center");
            $(".Total").text("Total");

      }
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
  if (pageNumber >= 1) {
    $("#pagePrev").show();
  } else {
    $("#pagePrev").hide();
  }
}

const now = moment(new Date()).format("YYYY-MM-DD");

$(() => {
  $("#controls-form").submit(function (e) {
    e.preventDefault();
    const data = {
      loggedInUserName: User.getName(),
      fromDate: this[0].value,
      toDate: this[1].value,
      //mobileNumber: this[2].value,
      pageNumber: +this[2].value,
    };
    Request(Endpoints.get("summaryReport"), "POST", data, {
      showMainLoader: true
    }).done(data1 => {
Alert.clearAll();
      data1.message &&
        (data1.result === "Success"
          ? Alert.success(data1.message, {
            clearTime: 10 * 1000
          })
          : Alert.error(data1.message, {
            clearTime: 10 * 1000
          }));

      renderDetailedMis(data1);
      var donwloadlink = data1.data.downloadReportLink;
            if (donwloadlink != null) {
        $("#donwloadSummaryReport").html(donwloadlink);
        getDownloadableFile();
        $("#donwloadSummaryReport").removeClass("d-none");
      }else{
        $("#donwloadSummaryReport").addClass("d-none");
          $("tfoot td").html("");
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

const data = {

  loggedInUserName: User.getName(),
  fromDate: now,
  toDate: now,
  //mobileNumber: "",
  pageNumber: 1
};
Request(Endpoints.get("summaryReport"), "POST", data).done(data1 => {
  renderDetailedMis(data1);
  var  donwloadlink= data1.data.downloadReportLink;
  if (donwloadlink != null) {
    $("#donwloadSummaryReport").html(donwloadlink);
    getDownloadableFile();
    $("#donwloadSummaryReport").removeClass("d-none");

  }else{
    $("#donwloadSummaryReport").addClass("d-none");
      $("tfoot td").html("");
  }
});
function getDownloadableFile() {
  $('#donwloadSummaryReport').on('click', 'a', function (e) {
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
        a.download =  User.getName()+"-"+dTime+"-summaryReport.csv";
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
