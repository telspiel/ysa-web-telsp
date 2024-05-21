import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";


const table = require("./../../partials/table.hbs");

console.log("Welcome to dynamic message!");

var uploadedFileName = '';
var uploadedZipFileNames = [];

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

console.log = function () { }

const data = {
  loggedInUserName: User.getName()
};

var domainSelect = document.getElementById("domain");
Request(Endpoints.get("getApprovedDomainList"), "POST", data).done(data => {
  const gpList = data.data.hostNameList;
  console.log(gpList);
  $.each(gpList, function (key, value) {
    domainSelect.options[domainSelect.options.length] = new Option(value.domainName, value.domainName);
  });
});


$('input[type=radio][name=fileType]').change(function () {
  if (this.value == 'zip') {
    $(".splitFileGroup").addClass("d-none");
  } else {
    $(".splitFileGroup").removeClass("d-none");

  }
});


$(document).ready(function () {
  // const visual = User.getShortUrlVisual();
  // console.log(visual);

  const visual = User.getShortUrlVisual();
  if (visual == "true") {
    $(".convShortUrlDiv").removeClass("d-none");
    $(".domainDiv").removeClass("d-none");
    $(".callBackDomainUrlDiv").removeClass("d-none");
  } else {
    $(".convShortUrlDiv").addClass("d-none");
    $(".domainDiv").addClass("d-none");
    $(".callBackDomainUrlDiv").addClass("d-none");
  }

  $("#scheduleDateTime").datetimepicker({
    minDate: new Date(),
    minTime: new Date(),
    dateFormat: 'yyyy-mm-dd',
    timeFormat: 'HH:mm:ss',
    format: 'Y-m-d H:i',
    scrollInput: false,
    timepicker: true,
    scrollMonth: false,
    scrollInput: false,
    yearStart: new Date().getFullYear(),
    yearEnd: new Date().getFullYear() + 1,
    step: 1,
    onSelectDate: function (current_time, $input) {
      if (current_time.getTime() < new Date().getTime()) {
        this.setOptions({
          timepicker: false
        });
      } else if (current_time.getTime() > new Date().getTime()) {
        this.setOptions({
          minTime: false,
          timepicker: true
        });
      } else if (current_time.getTime() === new Date().getTime()) {
        this.setOptions({
          minTime: '0',
          timepicker: true
        });
      }

      if (current_time.getDate() === new Date().getDate()
        && current_time.getMonth() === new Date().getMonth()
        && current_time.getFullYear() === new Date().getFullYear()) {
        this.setOptions({
          minTime: '0',
          timepicker: true
        });
      }
    },
    onChangeMonth: function (current_time, $input) {
      if (current_time.getTime() < new Date().getTime()) {
        this.setOptions({
          timepicker: false
        });
      } else if (current_time.getTime() > new Date().getTime()) {
        this.setOptions({
          minTime: false,
          timepicker: true
        });
      } else if (current_time.getTime() === new Date().getTime()) {
        this.setOptions({
          minTime: '0',
          timepicker: true
        });
      }

      if (current_time.getDate() === new Date().getDate()
        && current_time.getMonth() === new Date().getMonth()
        && current_time.getFullYear() === new Date().getFullYear()) {
        this.setOptions({
          minTime: '0',
          timepicker: true
        });
      }
    },
    onChangeYear: function (current_time, $input) {
      if (current_time.getTime() < new Date().getTime()) {
        this.setOptions({
          timepicker: false
        });
      } else if (current_time.getTime() > new Date().getTime()) {
        this.setOptions({
          minTime: false,
          timepicker: true
        });
      } else if (current_time.getTime() === new Date().getTime()) {
        this.setOptions({
          minTime: '0',
          timepicker: true
        });
      }

      if (current_time.getDate() === new Date().getDate()
        && current_time.getMonth() === new Date().getMonth()
        && current_time.getFullYear() === new Date().getFullYear()) {
        this.setOptions({
          minTime: '0',
          timepicker: true
        });
      }
    }
  }).attr('readonly', 'readonly');

  $("#scheduleDate").datetimepicker({
    timepicker: false,
    minDate: '0',
    minTime: '0',
    dateFormat: 'yyyy-mm-dd',
    format: 'Y-m-d',
    closeOnDateSelect: true,
    scrollMonth: false,
    scrollInput: false,
    yearStart: new Date().getFullYear(),
    yearEnd: new Date().getFullYear() + 1,
  }).attr('readonly', 'readonly');

});

$("#addToMsg").click(function (e) {
  e.preventDefault();

  var text = $('#msgText').val();
  var cursorPos = $('#msgText').prop('selectionStart');
  var textBefore = text.substring(0, cursorPos);
  var textAfter = text.substring(cursorPos, text.length);

  if ($("#columnList").val() === null) {
    return;
  }

  const hasVar = $('#msgText').val().includes("{#var#}");
  console.log(hasVar);
  if (hasVar) {
    $('#msgText').val(text.replace('{#var#}', $("#columnList").val()));
  } else {
    $("#msgText").val(textBefore + "" + $("#columnList").val() + "" + textAfter);
  }

  msgCountUpdate();
});

$(function () {
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
  var CName = User.getName() + "-campaign-" + dTime;
  $("#campaignName").val(CName);
});

$("#fupload").click(function (e) {
  e.preventDefault();
  const selectFile = $("#selectFile").get(0).files[0];
  var selectedFileName = $("#selectFile").get(0).files[0].name;
  if (selectedFileName.substr(selectedFileName.lastIndexOf('.') + 1) == "txt" ||
    selectedFileName.substr(selectedFileName.lastIndexOf('.') + 1) == "xls") {
    Alert.clearAll();
    Alert.error("Please select Only .xlsx and .csv file", { clearTime: 10 * 1000 });
    return;
  }
  if (!selectFile) {
    Alert.clearAll();
    Alert.info("Please select a file.");
    return;
  }

  var ar = /^(\d|\w|-)+$/;
  // var ar =  /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/;
  if (ar.test(selectedFileName.split(".")[0]) == false) {
    Alert.clearAll();
    Alert.error("File Name should not contain space", {
      clearTime: 10 * 1000
    });
    return;
  }

  const formData1 = new FormData();
  formData1.append("userName", User.getName());
  formData1.append("fileType", "xls");
  formData1.append("file", selectFile);

  const data2 = {};

  $("#dynamic-msg-form")
    .serializeArray()
    .forEach(i => {
      var key = i.name;
      if (key == "campaignName" || key == "msgPart" || key == "msgType" || key == "templateName") {
        formData1.append(i.name, i.value);
      }
    });
  //$("#btnSubmit").attr("disabled", true);
  //$("#btnCancel").attr("disabled", true);

  Request(Endpoints.get("uploadDynamicMessage"), "POST", formData1, {
    showMainLoader: true,
    contentType: false,
    processData: false,
    data: formData1
  }).done(data => {

    if (selectedFileName.substr(selectedFileName.lastIndexOf('.') + 1) == "zip") {
      $(".splitFileGroup").addClass("d-none");
    }

    if (Endpoints.validateResponse(data)) {

      Alert.clearAll();
      Alert.clearAll();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message, {
            clearTime: 10 * 1000
          })
          : Alert.error(data.message, {
            clearTime: 10 * 1000
          }));

      uploadedFileName = data.data.fileName;
      uploadedZipFileNames = data.data.uploadedDynamicfileName;

      $("#selectFile").attr("disabled", "true");
      $("#fupload").attr("disabled", "true");

      var numberSelect = document.getElementById("mobileNumber");
      const headerList = data.data.columnHeaderMap;
      $.each(headerList, function (key, value) {
        let isSelected = key == "Mobile" ? true : false;
        numberSelect.options[numberSelect.options.length] = new Option(key, value, isSelected, isSelected);
      });

      var coloumList = document.getElementById("columnList");
      //      const headerList = data.data.columnHeaderMap;
      $.each(headerList, function (key, value) {
        coloumList.options[coloumList.options.length] = new Option(key, value);
      });

    }
  });
});

const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
var CName = User.getName() + "-campaign-" + dTime;
$("#campaignName").val(CName);

$("#dynamic-msg-form").submit(function (e) {
  console.log("printing")
  e.preventDefault();
  console.log("printing 2")


  var ar = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/;
  if ($("#campaignName").val() != campaignName) {
    if (ar.test($("#campaignName").val()) == false) {
      Alert.clearAll();
      Alert.error("Campaign Name should not contain space or special character", {
        clearTime: 10 * 1000
      });
      return;
    }
  }

  // if campaign name contains % then show alert message

  if ($("#campaignName").val().indexOf("%") != -1) {
    Alert.clearAll();
    Alert.error("Campaign Name should not contain % character ", {
      clearTime: 10 * 1000
    });
    return;
  }

  const additionalData = {
    loggedInUserName: User.getName()
  };

  const data2 = {
    scheduleInfo: {
      splitPart: []
    }
  };

  $(this)
    .serializeArray()
    .forEach(i => {
      if (i.value) {
        data2[i.name] = i.value;
      }
    });

  console.log(data2)

  if (data2['convertShortUrl'] == "N") {
    delete data2["callbackUrl"];
    delete data2["domainName"];
  }
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
  var CName = $("#campaignName").val();
  if (CName.length == 0) {
    CName = User.getName() + "-campaign-" + dTime;
  }
  data2["campaignName"] = CName;

  const splitFile = $("input[name=splitFile]:checked").val();

  if (splitFile === "no" && data2['scheduleMessage'] === "yes") {
    var scheduleDateTime = $("#scheduleDateTime").val();
    if (!scheduleDateTime) {
      Alert.error("Please Choose Scheduling Date and Time")
      return;
    }
  } else if (splitFile === "yes" && data2['scheduleMessage'] === "yes") {
    var scheduleDate = $("#scheduleDate").val();
    if (!scheduleDate) {
      Alert.error("Please Choose Scheduling Date")
      return;
    }
  }

  if (data2['scheduleMessage'] == "no") {
    delete data2["scheduleDate"];
  } else {

    if (splitFile == "yes") {

      var frm = $(this).serializeArray();
      console.log(data2)
      var j = 18;
      for (var i = j; i < frm.length;) {
        data2.scheduleInfo.splitPart.push({
          id: (data2.scheduleInfo.splitPart.length + 1).toString(),
          from: frm[i].value,
          to: frm[i + 1].value,
          hh: frm[i + 2].value,
          mm: frm[i + 3].value
        });
        i = i + 4;
      }
    } else {
      console.log("scheduleDateTime");
      console.log(data2["scheduleDateTime"]);
      var splitDateTime = data2["scheduleDateTime"].split(/\s+/);
      console.log(splitDateTime);
      data2["scheduleDate"] = splitDateTime[0];
      var splitTime = splitDateTime[1].split(":");
      data2["scheduleHour"] = splitTime[0];
      data2["scheduleMinute"] = splitTime[1];
      delete data2['scheduleDateTime'];
    }
  }
  data2['fileName'] = uploadedFileName;

  var serviceType = $("input[name=serviceType]:checked").val();
  if ((serviceType == "trans") || (serviceType == "promo")) {
    delete data2['serviceSubType'];
  }

  if (splitFile === "no" && data2['scheduleMessage'] === "yes") {
    var scheduleDateTime = $("#scheduleDateTime").val();
    if (!scheduleDateTime) {
      Alert.error("Please Choose Scheduling Date and Time")
      return;
    }

    var scheduleDateTime = $("#scheduleDateTime").val();
    var dateTime = scheduleDateTime.split(/\s+/);
    var scheduleDate = dateTime[0];
    var splitTime = dateTime[1].split(":");
    var hour = splitTime[0];
    var min = splitTime[1];

    var currentdate = new Date();

    var startTime = new Date(toValidDate((scheduleDate[2]) + "/" + scheduleDate[1] + "/" + scheduleDate[0] + ' ' + hour + ':' + min));
    if (startTime <= currentdate) {
      Alert.clearAll();
      Alert.error("Date Time Mismatch", { clearTime: 20 * 1000 });
      dateValidation = false;
      return;

    }

  } else if (splitFile === "yes" && data2['scheduleMessage'] === "yes") {
    var scheduleDate = $("#scheduleDate").val().split("//");
    var dt = new Date();
    var obj = data2.scheduleInfo.splitPart;

    $.each(obj, function (key, value) {
      var d = new Date(toValidDate((scheduleDate[2]) + "/" + scheduleDate[1] + "/" + scheduleDate[0] + ' ' + value.hh + ':' + value.mm));
      console.log(d)
      if (d <= new Date()) {
        Alert.clearAll();
        Alert.clearAll();
        Alert.error("Date Time Mismatch", { clearTime: 10 * 1000 });
        dateValidation = false;
        return;
      }
    });
  }

  data2['uploadedDynamicfileName'] = uploadedZipFileNames;

  delete data2['hour'];
  delete data2['min'];
  delete data2['scheduleMessageFrom'];
  delete data2['scheduleMessageTo'];
  delete data2['split_date'];
  delete data2['scheduleDateTime'];

  $("#btnSubmit").attr("disabled", true);
  Request(
    Endpoints.get("getDynamicPreview"),
    "POST",
    $.extend({}, data2, additionalData),
    { showMainLoader: true }
  ).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      console.log(resData);
      var tData = resData.previewDataMap;

      $("#totalCount").html(resData.totalCount);
      $("#count").html(resData.plainCount);
      $("#credit").html(resData.plainCredit);
      $("#uniCode").html(resData.unicodeCount);
      $("#uniCodeCr").html(resData.unicodeCredit);
      var html = "";
      Object.keys(tData).forEach(function (key) {
        console.log(key + ': ' + tData[key]);
        var TextValue = tData[key];
        if ((TextValue.match(/\`|\~/))) {
          var test = TextValue.replace(/\`/g, "'");
          TextValue = TextValue.replace(/\`/g, "'");
          // $("#modelMessage").html($("#msgText").val(test));
          tData[key] = test;
        }
        html = html + "<tr><td>" + key.split('Æ')[0] + "</td><td class='text-wrap'>" + tData[key] + "</td></tr>";
        console.log(html);
      });
      $("#tBody").html(html);

      $('#messageModal').modal('show');
    }
  });

});


function toValidDate(datestring) {
  return datestring.replace(/(\d{2})(\/)(\d{2})/, "$3$2$1");
}

$('#messageModal').on('shown.bs.modal', function () {
  var table = $('#dyamicPreviewTable').DataTable({
    "paging": false,
    "bPaginate": false,
    "bLengthChange": false,
    "bFilter": false,
    "createdRow": function (row, data, dataIndex) {
      $(row).children(':nth-child(2)').css("overflow-wrap", "anywhere");
    }
  });
  //destroy table

  table.destroy();
});



$('#messageModal').on('hidden.bs.modal', function () {
  // do something…
  $("#btnSubmit").removeAttr("disabled");
});


//if campaign is scheduled then show the schedule insted of send now
$("#scheduleMessage-0").click(function () {
  if ($("#scheduleMessage-0").is(":checked")) {
    $('#sendNow').text('Schedule Now');
  }
});



$('input[name="scheduleDateTime"]').change(function () {
  var selectedDate = $('input[name="scheduleDateTime"]').val();
  console.log(selectedDate,'selectedDate');
  var currentDate = new Date();
  console.log(currentDate,'currentDate');
  var currentDateString = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
  console.log(currentDateString,'currentDateString');
  var currentDateTime = new Date(currentDateString);
  console.log(currentDateTime,'currentDateTime');
  var selectedDateTime = new Date(selectedDate);
  console.log(selectedDateTime,'selectedDateTime');
  console.log(selectedDateTime.getTime() < currentDateTime.getTime(),'selectedDateTime.getTime() < currentDateTime.getTime()');
  if (selectedDateTime.getTime() < currentDateTime.getTime()) {
    alert("Selected date and time is less than current date and time");
    $('input[name="scheduleDateTime"]').val("");
  }
});


$("#sendNow").click(function () {
  const splitFile = $("input[name=splitFile]:checked").val();
  var TextValue = $("#msgText").val();
  if ((TextValue.match(/\`|\~/))) {
    var test = TextValue.replace(/\`/g, "'");
    TextValue = TextValue.replace(/\`/g, "'");
    // $("#modelMessage").html($("#msgText").val(test));
    $("#msgText").val(test);
  }
  // $("#btnSubmit").attr("disabled", true);
  $("#sendNow").addClass("d-none");
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
  const additionalData = {
    loggedInUserName: User.getName()
  };

  const data2 = {
    scheduleInfo: {
      splitPart: []
    }
  };

  $("#dynamic-msg-form")
    .serializeArray()
    .forEach(i => {
      if (i.value) {
        data2[i.name] = i.value;
      }
    });
  var CName = $("#campaignName").val();
  if (CName.length == 0) {
    CName = User.getName() + "-campaign-" + dTime;
  }
  data2["campaignName"] = CName;
  if (data2['scheduleMessage'] == "no") {
    delete data2["scheduleDate"];
  } else {
    const splitFile = $("input[name=splitFile]:checked").val();
    if (splitFile == "yes") {
      // delete data2['hour'];
      // delete data2['min'];
      // delete data2['scheduleMessageFrom'];
      // delete data2['scheduleMessageTo'];
      // delete data2['split_date'];
      // delete data2['scheduleDateTime'];

      var frm = $("#dynamic-msg-form").serializeArray();
      var j = 18;
      for (var i = j; i < frm.length;) {
        data2.scheduleInfo.splitPart.push({
          id: (data2.scheduleInfo.splitPart.length + 1).toString(),
          from: frm[i].value,
          to: frm[i + 1].value,
          hh: frm[i + 2].value,
          mm: frm[i + 3].value
        });
        i = i + 4;
      }
    } else {
      console.log("scheduleDateTime");
      console.log(data2["scheduleDateTime"]);
      var splitDateTime = data2["scheduleDateTime"].split(/\s+/);
      console.log(splitDateTime);
      data2["scheduleDate"] = splitDateTime[0];
      var splitTime = splitDateTime[1].split(":");
      data2["scheduleHour"] = splitTime[0];
      data2["scheduleMinute"] = splitTime[1];
      delete data2['scheduleDateTime'];
    }
  }
  data2['fileName'] = uploadedFileName;

  if (data2['convertShortUrl'] == "N") {
    delete data2["callbackUrl"];
    // delete data2["domainName"];
    delete data2["userDomain"];
  } else {
    let frameCallback = $("#callBackDomainUrl").val() + data2["callbackUrl"];
    data2["callbackUrl"] = data2["callbackUrl"] ? frameCallback : "";
  }

  var selValue = $("input[name='serviceType']:checked").val();
  if ((selValue == "trans") || (selValue == "promo")) {
    delete data2['serviceSubType'];
  }

  data2['perMsgCredit'] = $('#smsCr').text();

  delete data2['hour'];
  delete data2['min'];
  delete data2['scheduleMessageFrom'];
  delete data2['scheduleMessageTo'];
  delete data2['split_date'];
  delete data2['scheduleDateTime'];
  data2['uploadedDynamicfileName'] = uploadedZipFileNames;

  Request(
    Endpoints.get("sendDynamicSMS"),
    "POST",
    $.extend({}, data2, additionalData),
    { showMainLoader: true }
  ).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      console.log(resData.message);
      $("#dynamic-msg-form")[0].reset();
      $('#messageModal').modal('hide');
      $("#campaignName").val(CName);
      Alert.clearAll();
      resData.message &&
        (resData.result === "Success"
          ? Alert.success(resData.message)
          : Alert.error(resData.message));
    }
  });
});

$('#dynamic-msg-form').on('reset', function (e) {
  uploadedFileName = null;
  $("#selectFile").removeAttr("disabled");
  $("#fupload").removeAttr("disabled");
  $(".custom-file-label").html('Choose File');
  $(".scheduleDateGroup").addClass('d-none');
  $("#btnSubmit").attr("disabled", false);
  $("#sendNow").removeClass("d-none");
  $("#schd_msg").addClass("d-none");
  $(".shortUrlDisplayBlock").addClass("d-none");
  $(".displayTemplateTextSpan").addClass("d-none");
  $(".custom-file-label").html('Choose File');
  $(".add_split_row").html("");
  $("#entityId").val('');
  $("#operatorTemplateId").val('');
  $("#entityId").removeAttr("readonly");
  $("#operatorTemplateId").removeAttr("readonly");
  $('#charCount').html('0 character');
  $('#smsCr').html('0');
  $('#mobileNumber')
    .empty()
    .append('<option disabled selected >-- Select --</option>');
  $('#columnList')
    .empty()
    .append('<option selected value="">-- Select --</option>');

  // $("#campaignName").val(CName);

  var mobileNumber = document.getElementById("mobileNumber");
  mobileNumber.options.length = 0;
  var columnList = document.getElementById("columnList");
  columnList.options.length = 0;
});


$(document).ready(function () {
  const datalist = {
    loggedInUserName: User.getName(),
    messageType: "other",
    messageSubType: ""
  }
  var senderIdList = document.getElementById("senderIdSelect");
  Request(Endpoints.get("senderIdListByMessageType"), "POST", datalist).done(data => {
    const tempList = data.data.senderIdList;
    $.each(tempList, function (key, value) {
      senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);
    });
    $("#senderIdSelect").select2();
  });
  $(".messagetype").click(function () {
    var selValue = $(this).val();
    if ((selValue == "trans") || (selValue == "promo")) {
      $(".service_type").addClass("d-none");
    }
    else {
      $(".service_type").removeClass("d-none");
    }
  });
});


$(".messagetype").click(function () {
  var selValue = $(this).val();
  if ((selValue == "trans") || (selValue == "service")) {
    $('#senderIdSelect')
      .empty()
      .append('<option disabled selected >-- Select --</option>');
    $('#templatename')
      .empty()
      .append('<option selected value="">-- Select --</option>');
    const datalist = {
      loggedInUserName: User.getName(),
      messageType: "other",
      messageSubType: ""
    }
    var senderIdList = document.getElementById("senderIdSelect");
    Request(Endpoints.get("senderIdListByMessageType"), "POST", datalist).done(data => {
      const tempList = data.data.senderIdList;
      $.each(tempList, function (key, value) {
        senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);
      });
      $("#senderIdSelect").select2();
    });
  }
  else {
    $('#senderIdSelect')
      .empty()
      .append('<option disabled selected >-- Select --</option>');
    $('#templatename')
      .empty()
      .append('<option selected value="">-- Select --</option>');
    const datalist = {
      loggedInUserName: User.getName(),
      messageType: selValue,
      messageSubType: ""
    }
    var senderIdList = document.getElementById("senderIdSelect");
    Request(Endpoints.get("senderIdListByMessageType"), "POST", datalist).done(data => {
      const tempList = data.data.senderIdList;
      $.each(tempList, function (key, value) {
        senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);
      });
      $("#senderIdSelect").select2();
    });
  }
});

var selectTemplateName;

$(".isShortUrlSelectedInput").change(function () {
  let value = $("input[name=convertShortUrl]:checked").val();
  if (value === "Y") {
    $(".shortUrlDisplayBlock").removeClass("d-none");
  } else {
    $(".shortUrlDisplayBlock").addClass("d-none");
  }
});

$("#senderIdSelectDiv .senderIdSelect").change(function () {
  $('#templatename')
    .empty()
    .append('<option selected value="">-- Select --</option>');
  var senderid = $(this).children("option:selected").val();
  var serviceType = $("input[name=serviceType]:checked").val();
  if (serviceType == "service") {
    var service = $("input[name=serviceSubType]:checked").val();
  } else {
    var service = "";
  }
  $("input[name=serviceType]:checked").val()
  const datalist = {
    loggedInUserName: User.getName(),
    messageType: serviceType,
    messageSubType: service,
    senderId: senderid
  }
  var templateTitleSelect = document.getElementById("templatename");
  Request(Endpoints.get("viewAllContentTemplateListByMessageType"), "POST", datalist).done(data => {
    const tempList = data.data.contentTemplateList;
    selectTemplateName = tempList;
    $.each(tempList, function (key, value) {
      templateTitleSelect.options[templateTitleSelect.options.length] = new Option(value.templateTitle, value.templateId);
    });
    $("#templatename").select2();
  });
});

$("#templatename").change(function () {
  var contentTemplateId = $(this).children("option:selected").val();
  var txt = selectTemplateName.find((x) => x.templateId == contentTemplateId);
  if (txt) {
    $("#msgText").val(txt.templateText);
    $("#displayTemplateText").html(txt.templateText);
    // $(".displayTemplateTextSpan").removeClass("d-none");
    msgCountUpdate();
    $("#entityId").val(txt.entityId);
    $("#operatorTemplateId").val(txt.operatorTemplateId);
    $("#entityId").prop("readonly", true);
    $("#operatorTemplateId").prop("readonly", true);
  } else {
    $("#msgText").val("");
    $("#msgText").removeAttr("readonly");
    $("#displayTemplateText").html("");
    $(".displayTemplateTextSpan").addClass("d-none");
    $("#entityId").val('');
    $("#operatorTemplateId").val('');
    $("#entityId").removeAttr("readonly");
    $("#operatorTemplateId").removeAttr("readonly");
    msgCountUpdate();
  }
});


var isPlainMsg = true;
$("#msgText").keyup(() => {
  msgCountUpdate();
});

function msgCountUpdate() {
  var plain = new RegExp("^[A-Za-z0-9_~\\`\\-!:\\/.@\\|\\,#\\$%\\^&\\*\\(\\)\n\s +=\\\\{}\\[\\];'\"<>?₹]*$");


  var sectionToCheck = $("#msgText").val();
  var allFoundCharacters = sectionToCheck.match(/[\[\]\{\}\\|\^€\~]/g);
  var splCharCount = (allFoundCharacters) ? allFoundCharacters.length : 0;//count
  var charCount = 0;
  if (sectionToCheck.match(/[\~]/g)) {
    charCount = parseInt($("#msgText").val().length) + parseInt("0");
  } else {
    charCount = parseInt($("#msgText").val().length) + parseInt(splCharCount);
  }
  var sms = 0;
  if (plain.test($("#msgText").val().trim())) {
    //  console.log("plain");
    isPlainMsg = true;
    if (charCount > 160) {
      var n = charCount / 153;
      var dec = Math.ceil(n)
      sms = dec;
    } else if (charCount != 0 && charCount <= 160) {
      sms = 1;
    } else {
      sms = 0;
    }
    $("#charCount").html(charCount + " characters");
  } else {
    isPlainMsg = false;
    if (charCount > 70) {
      var n = charCount / 67;
      var dec = Math.ceil(n)
      sms = dec;
    } else if (charCount != 0 && charCount <= 70) {
      sms = 1;
    } else {
      sms = 0;
    }
  }
  // var mobileCount  = parserInt($("#totalMobile").html());
  if (plain.test($("#msgText").val().trim())) {
    $("#charCount").html(charCount + " characters");
  } else {
    $("#charCount").html(charCount + " unicode characters");

  }
  // var mobileCount  = parserInt($("#totalMobile").html());
  $("#smsCr").html(sms);
}