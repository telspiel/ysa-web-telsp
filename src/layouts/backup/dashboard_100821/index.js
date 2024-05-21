import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";

const stats = require("./../../partials/dashboard/stats.hbs");
const carousel = require("./../../partials/carousel.hbs");

console.log("Welcome to dashboard!");

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

const renderStats = (data) => {
  for (let key in data) {
    if(data[key] == null){
      $("#" + key).html(0);
    }else{
    $("#" + key).html(data[key]);
    }
  }
}

const renderHourlyGraph = (data) => {

  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  let statsData = [];
  let tableData = [];
  const grid = data.grid[0];

  for (let key in grid) {
    if (grid.hasOwnProperty(key)) {
      statsData.push({
        heading: getHeading(key),
        value: grid[key]
      });
      tableData.push(grid[key]);
    }
  }

  const hdata = data.grid;
  const totalSubmit = [];
  const totalDelivered = [];
  const newhoursList = [];
  for (var i = 0; i < 24; i++) {
    totalSubmit[i] = 0;
    totalDelivered[i] = 0;
    
    newhoursList[i] = year + "-" + month + "-" + day+"T" + i + ":00:00";
  }
  //var totalSubmit = [];
  for (let row in hdata) {
    var summaryHour = hdata[row]['summaryHour'];
    totalSubmit[summaryHour] = hdata[row]['totalSubmit'];
    totalDelivered[summaryHour] = hdata[row]['totalDelivered'];
  }

  var colors = ['#3e3181', '#e951a5'];
  var options = {
    chart: {
      height: 350,
      type: 'area',
    },
    colors : colors,
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    series: [{
      name: 'Total Delivered',
      data: totalDelivered
    }, {
      name: 'Total Submit',
      data: totalSubmit
    }],

    xaxis: {
      type: 'datetime',
      categories: newhoursList,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    }
  }
  console.log(options);
  var chart = new ApexCharts(
    document.querySelector("#hourlyGraph"),
    options
  );

  chart.render();

}

const renderSummaryReportGraph = (data) => {
  const getHeading = (key) => {
    let result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const grid = data.grid[0];

  let tableHeader = [];
  let tableData = [];
  let formattedTableHeader = [];
  for (let key in grid) {
    if (key !== "summaryDate") {
      if (grid.hasOwnProperty(key)) {
        tableHeader.push(key);
        formattedTableHeader.push(getHeading(key));
        tableData.push(grid[key]);
      }
    }
  }
console.log(grid);
console.log(tableData);
  var colors = ['#3e3181', '#e951a5', '#e951a53d', '#e951a5cf', '#a33091', '#3e3181'];
  var options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#3e3181"]
      }
    },
    series: [{

      data: tableData
    }],
    xaxis: {
      categories: formattedTableHeader,
      labels: {
        style: {
          colors: colors
        }
      }
    }
  }

  var chart = new ApexCharts(
    document.querySelector("#summaryReport"),
    options
  );

  chart.render();
}

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

Request(Endpoints.get("dashboard"), "POST", {
  username: User.getName()
}).done(data => {
  if (Endpoints.validateResponse(data)) {
    const dashboardData = data.data || {};
    renderStats(dashboardData);
  }
});

Request(Endpoints.get("getHourlyReport"), "POST", {
  loggedInUserName: User.getName()
}).done(data => {
  //console.log(data);
  if (Endpoints.validateResponse(data)) {
    const dashboardData = data.data || {};
    renderHourlyGraph(dashboardData);

  }
});

var d = new Date();
var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
console.log(year + "-" + month + "-" + day);

var todayDate = year + "-" + month + "-" + day;
// replace this variable in from and to date.. once it is live
Request(Endpoints.get("summaryReport"), "POST", {
  loggedInUserName: User.getName(),
  fromDate: todayDate,
  toDate: todayDate
}).done(data => {
  if (Endpoints.validateResponse(data)) {
    const dashboardData = data.data || {};
    renderSummaryReportGraph(dashboardData);
  }
});
