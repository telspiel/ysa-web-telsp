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
      { title: "Receive Date" },
      { title: "Message Id" },
      { title: "Mobile Number" },
      //  { title: "Submit Status" },
      // { title: "Submit Error Code" },
      { title: "Sent Date" },
      { title: "Sender Id" },
      { title: "Delivery Status" },
      { title: "Error Code" },
      { title: "Delivery Date" },
      { title: "Message Text" },
      { title: "Message Type" }
    ],
    "order": [[2, "desc"]],

    'columnDefs': [
      {
        'targets': 8,
        'render': function (data, type, full, meta) {
          var data1;
          if (type === 'display') {
            data1 = strtrunc(data, 100);
          }

          return '<a href="#" data-trigger="manual" data-placement="right" data-toggle="popover" title="Message" data-content="' + data + '">' + data1 + '</a>';
        }
      }
    ],
    "footerCallback": function (row, data, start, end, display) {
      var api = this.api(), data;

      // Remove the formatting to get integer data for summation
      var intVal = function (i) {
        return typeof i === 'string' ?
          i.replace(/[\$,]/g, '') * 1 :
          typeof i === 'number' ?
            i : 0;
      };

      var columnCount = 9;
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
    },
    "fnCreatedRow": function (nRow, aData, iDataIndex) {
      $(nRow).children("td").css("overflow", "hidden");
      $(nRow).children("td").css("white-space", "nowrap");
      $(nRow).children("td").css("text-overflow", "ellipsis");
    }
  });

  tabled.order([0, 'desc']).draw();

  $('body').on('click', function (e) {
    $('[data-toggle=popover]').each(function () {

      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
        $(this).popover('hide');
      }
    });
  });

  $("[data-toggle=popover]").mousedown(function () {
    //toggle popover when link is clicked
    $(this).popover('toggle');
  });

  function strtrunc(str, max, add) {
    add = add || '...';
    return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
  };



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
  const data1 = {
    loggedInUserName: User.getName(),
  };
  Request(Endpoints.get("getAllSenderIdList"), "POST", data1).done(data1 => {
    if (Endpoints.validateResponse(data1)) {
      const source = (app.store.senderIdList = data1.data.senderIdList.map(
        o => ({
          id: o.id,
          name: o.senderId
        })
      ));
      source.forEach(i => {
        var o = new Option(i.name, i.name);
        $(o).html(i.name);
        $("#senderIdSelect").append(o);
      });
    }
  });

  $("#controls-form").submit(function (e) {
    e.preventDefault();
   var mobileNumber =$("#mobileNumber").val();
    var From_date = new Date($("#fromDate").val());
    var To_date = new Date($("#toDate").val());
      var start = new Date(From_date);
      var  end   = new Date(To_date);
      var  diff  = new Date(end - start);
      var  days  = diff/1000/60/60/24;
      var DateValidation = Math.round(days);
      if(DateValidation > 7){
        Alert.clearAll();
       Alert.error("You can select max 7 days in date range", {
         clearTime: 10 * 1000
       })
       return;
     }
    // else if(mobileNumber.length == 0){
    //   Alert.error("Please Enter Mobile Number", {
    //     clearTime: 10 * 1000
    //   })
    //   return;
    // }

    const data = {
      loggedInUserName: User.getName(),
      fromDate: this[0].value,
      toDate: this[1].value,
      mobileNumber: this[2].value,
      senderId: this[3].value,
      messageId: this[4].value,
      pageNumber: this[5].value,
    };

    if (data.mobileNumber !== "") {
      data.pageNumber = 1;
    }
    Request(Endpoints.get("detailedReport"), "POST", data, {
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
        $("#pageNumber").val(1);
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
      console.log(pageNumber);
      console.log(totalPages);
      $("#pageNumber").val(pageNumber + 1);
      // $("#controls-form").submit();
      detailMisReport();

    }
  });
  $("#pagePrev").click(() => {
    const pageNumber = +($("#pageNumber").val());
    if (pageNumber > 1) {
      console.log(pageNumber);
      console.log(totalPages);
      $("#pageNumber").val(pageNumber - 1);
      // $("#controls-form").submit();
      detailMisReport();
    }
  });
});

const data = {
  loggedInUserName: User.getName(),
  fromDate: now,
  toDate: now,
  pageNumber: 1
};
Request(Endpoints.get("detailedReport"), "POST", data).done(data => {
  renderDetailedMis(data);

  var donwloadlink = data.data.downloadReportLink;
  if (donwloadlink != null) {
    $("#donwloadFileButton").html(donwloadlink);
      getDownloadableFile();
    $("#donwloadFileButton").removeClass("d-none");
  } else {
    $("#donwloadFileButton").addClass("d-none");
  }
});

function detailMisReport(){
  var From_date = new Date($("#fromDate").val());
  var To_date = new Date($("#toDate").val());
    var start = new Date(From_date);
    var  end   = new Date(To_date);
    var  diff  = new Date(end - start);
    var  days  = diff/1000/60/60/24;
    var DateValidation = Math.round(days);
    if(DateValidation > 7){
      Alert.clearAll();
     Alert.error("You can select max 7 days in date range", {
       clearTime: 10 * 1000
     })
     return;
   }
  const data = {
    loggedInUserName: User.getName(),
    fromDate: $("#fromDate").val(),
    toDate:$("#toDate").val(),
    mobileNumber: $("#mobileNumber").val(),
    senderId: $("#SenderID").val(),
    messageId: $("#messageId").val(),
    pageNumber: $("#pageNumber").val(),
  };
  Request(Endpoints.get("detailedReport"), "POST", data, {
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
      $("#donwloadFileButton").html(donwloadlink);
        getDownloadableFile();
      $("#donwloadFileButton").removeClass("d-none");
    } else {
      $("#donwloadFileButton").addClass("d-none");
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
    exit();
  });
}
