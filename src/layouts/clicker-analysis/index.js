import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Cookie from "./../../scripts/cookie";
const stats = require("./../../partials/dashboard/stats.hbs");
const carousel = require("./../../partials/carousel.hbs");

console.log("Welcome to dashboard!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
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

  // console.log(graphData);
  // console.log(head);
  var options = {
    series: graphData,
    chart: {
      width: 380,
      type: 'pie',
    },
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
  var options = {
    series: graphData,
    labels: head,
    chart: {
      width: 380,
      type: 'pie',
    },
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
/*
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};
*/
$(() => {
  if (localStorage.getItem('campaignId')) {
    Request(Endpoints.get("clickerAnalysis"), "POST", {
      loggedInUserName: User.getName(),
      campaignId: localStorage.getItem('campaignId'),
      campaignName: localStorage.getItem('campaignName')
    }).done(data1 => {
      if (Endpoints.validateResponse(data1)) {
        var donwloadlink = data1.data.downloadReportLink;
        if (donwloadlink != null) {
          $("#donwloadFileButton").html(donwloadlink);
          getDownloadableFile();
          $("#donwloadFileButton").removeClass("d-none");
        } else {
          $("#donwloadFileButton").addClass("d-none");
        }
        const dashboardData = data1.data || {};
        const grid = dashboardData.grid[0];
        renderStats(grid);
        clickerStatus(grid);
        deliveryStatus(grid);
      }
    });
  }
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
    exit();
  });
}
