import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

let pureMsg = "";
let shortList;
let campaignName = "";

function updatedwithShortURL() {
  // var shortname = $("#shortUrlName").val();
  // var shortObj = shortList.filter(p => p.name == shortname)[0];
  // $("#msgText").val(pureMsg + "\n" + shortObj.hostName + "/xxxxxx");

  var cursorPos = $('#msgText').prop('selectionStart');
  var v = $('#msgText').val();
  var textBefore = v.substring(0, cursorPos);
  var textAfter = v.substring(cursorPos, v.length);

  var shortnameArray = $("#shortUrlName").val();
  for (let shortname of shortnameArray) {
    var shortObj = shortList.filter(p => p.name == shortname)[0];
    $("#msgText").val(textBefore + "" + shortObj.hostName + "/xxxxxx" + textAfter);
  }

  msgCountUpdate();
}

function genCampaignName() {
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
  var CName = User.getName() + "-campaign-" + dTime;
  campaignName = CName;
  return CName;
}

$(function () {
  $("#campaignName").val(genCampaignName());

  $("#isShortUrlSelected-1,#isShortUrlSelected-0").click(function () {
    if ($(this).val() == "Y") {
      pureMsg = $("#msgText").val();
      // updatedwithShortURL();
      // displayShortURLShortNote();
    } else {
      $("#msgText").val(pureMsg);
    }
  });

  $('#translationModal').on('hidden.bs.modal', function () {
    // do something…
    $("#convertedText").html("");
    $("#convOriginalText").val("");
  })

  var convertedText;

  $("#convertBtn").click(function () {
    if ($("#convOriginalText").val()) {
      const additionalData = {
        loggedInUserName: User.getName(),
        text: $("#convOriginalText").val(),
        targetLanguage: $("#targetLanguage").val()
      };

      Request(Endpoints.get("translateText"), "POST", additionalData, { showMainLoader: true }).done(data => {
        if (Endpoints.validateResponse(data)) {
          $("#convertedText").html(data.convertedText);
          convertedText = data.convertedText;
          messageCountUpdate();
        }
      });
    }

  });

  $("#checkboxId").click(function () {
    if ($('#checkboxId').is(":checked")) {
      $("#msgText").val("");
      $("#charCount").html("0 characters");
      $("#smsCr").html("0");
    }
  });

  $("#cpyClose").click(function () {
    $("#msgText").val(convertedText);
    msgCountUpdate();
  })

  const data1 = {
    loggedInUserName: User.getName(),
  };

  Request(Endpoints.get("listShortUrl"), "POST", data1).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      shortList = resData.data.shortUrlList;
      const source = (app.store.senderIdList = resData.data.shortUrlList.map(
        o => ({
          id: o.shortUrlId,
          name: o.name
        })
      ));
      // source.forEach(i => {
      //   var o = new Option(i.name, i.name);
      //   $(o).html(i.name);
      //   $("#shortUrlName").append(o);
      // });

      source.forEach(i => {
        var o = new Option(i.name, i.name);
        $(o).html(i.name);
        $("#shortUrlName").append(o);
      });

      $("#shortUrlName").select2({
        allowClear: true,
      });

      // Bind an event
      $('#shortUrlName').on('select2:select', function (e) {
        var data = e.params.data;
        $('#shortUrlName').val($('#shortUrlName').val().reverse()).trigger("change");
        pureMsg = $("#msgText").val();
        updatedwithShortURL();
      });


      // Important
      $('#shortUrlName').on("select2:unselecting", function (e) {
        let unSelecteData = e.params.args.data.text;
        var unSelecteData_index = $('#shortUrlName').val().indexOf(unSelecteData);
        var shortObj = shortList.filter(p => p.name == unSelecteData)[0];
        let finding_text = shortObj.hostName + "/xxxxxx";
        let msg_txt = $("#msgText").val();

        let index = getIndex(msg_txt, finding_text, (unSelecteData_index+1))
        // console.log(index,finding_text.length)
        let new_text = msg_txt.slice(0, index) + msg_txt.slice((index+finding_text.length));
        $("#msgText").val(new_text)
    
        msgCountUpdate();
      }).trigger('change');
    }
  });
});

function getIndex(str, substr, ind) {
  var Len = str.length, i = -1;
  while (ind-- && i++ < Len) {
    i = str.indexOf(substr, i);
    if (i < 0) break;
  }
  return i;
}


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
    // var type = $("input[name=msgType]:checked").val();
    // if (type == "plain") {
    //   $("#charCount").html(charCount + " characters");
    // }
    // if (type == "unicode") {
    //   $("#charCount").html(charCount + " unicode characters");
    // }
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
$("#cancelForm").click(() => {
  $("#bulk-upload")[0].reset();
});

$(document).ready(function () {

  $("#scheduleDateTime").datetimepicker({
    minDate: '0',
    minTime: '0',
    dateFormat: 'yyyy-mm-dd',
    timeFormat: 'HH:mm:ss',
    format: 'Y-m-d H:i',
    step: 1,
    onSelectDate: function (dp, $input) {
      if (dp.getDate() == new Date().getDate()) {
        this.setOptions({
          minTime: '0'
        });
      } else {
        this.setOptions({
          minTime: false
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
    closeOnDateSelect: true
  }).attr('readonly', 'readonly');
});

Date.prototype.toDateInputValue = (function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
});
//$('#scheduleDate').val(new Date().toDateInputValue());
$("#scheduleMsgFieldsGroup").on("click", ".removeRow", function () {
  $(this)
    .parent()
    .parent()
    .remove();
});
$(".removeRow")
  .first()
  .hide();

let fileName = null;

$("#fileUpload").click(function (e) {
  const file = $("#selectFile").get(0).files[0];
  var selectedFileName = $("#selectFile").get(0).files[0].name;

  if (!file) {
    Alert.clearAll();
    Alert.info("Please select a file.");
    return;
  }
  var ar = /^(\d|\w|-)+$/;
  if (ar.test(selectedFileName.split(".")[0]) == false) {
    Alert.clearAll();
    Alert.error("File Name should not contain space", {
      clearTime: 10 * 1000
    });
    return;
  }

  var ext = $("#selectFile").val().split('.').pop();
  const fileType = $("input[name=fileType]:checked").val();

  if (ext != fileType) {
    Alert.clearAll();
    Alert.error("File Type Mismatch");
    return;
  }

  /*
    if (["text/xls", "text/plain", "text/xlsx"].indexOf(file.type) == -1) {
      Alert.error("Only .xls, .xlsx and .txt files are allowed.");
      return;
    }
  */
  const formData = new FormData();
  formData.append("userName", User.getName());
  formData.append("fileType", $("input[name=fileType]:checked").val());
  formData.append("file", file);

  Request(Endpoints.get("uploadFile"), "POST", formData, {
    showMainLoader: true,
    contentType: false,
    processData: false,
    data: formData
  }).done(data => {
    if (Endpoints.validateResponse(data)) {
      if (data.result === "Success") {
        fileName = data.data.fileName;
      }
      $("#selectFile").attr("disabled", "true");
      $("#fileUpload").attr("disabled", "true");
      var numbers = data.message.match(/\d+/g);
      //var sum = numbers.reduce(function(a, b) { return parseInt(a) + parseInt(b); }, 0);
      var sum = parseInt(numbers[0]) - parseInt(numbers[1]);
      $("#totalMobile").html(sum);
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

function toValidDate(datestring) {
  return datestring.replace(/(\d{2})(\/)(\d{2})/, "$3$2$1");
}

function parseToJSON(formdata, data) {
  // var data = {};
  $(formdata).each(function (index, obj) {
    if (obj.value && obj.name != 'fileType') {
      data[obj.name] = obj.value;
    }
  });
  return data;
}


// $('#campaignName').on('keypress', function (e) {
//   if (e.which == 32) {
//     Alert.clearAll();
//     Alert.error("Campaign Name should not contain space", {
//       clearTime: 10 * 1000
//     });
//     return false;
//   }
// });

var data1;
var data2;
$("#bulk-upload").submit(function (e) {
  e.preventDefault();

  // Code Start
  // var ar = /^(\d|\w|-)+$/;
  var ar = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/;
  if ($("#campaignName").val() != campaignName) {
    if (ar.test($("#campaignName").val()) == false) {
      Alert.clearAll();
      Alert.error("Campaign Name should not contain space", {
        clearTime: 10 * 1000
      });
      return;
    }
  }

  const file = $("#selectFile").get(0).files[0];
  const splitFile = $("input[name=splitFile]:checked").val();
  const scheduleMessage = $("input[name=scheduleMessage]:checked").val();
  const isShorturl = $("input[name=isShortUrlSelected]:checked").val();

  if (file && !fileName) {
    Alert.clearAll();
    Alert.error("Please upload the file by clicking Upload button.");
    return;
  }

  const formData = {
    scheduleInfo: {
      splitPart: []
    }
  };
  const additionalData = {
    username: User.getName(),
    fileName
  };

  const fData = parseToJSON($(this).serializeArray(), formData);
  // console.log(fData);
  // console.log(formData);

  if (isShorturl === "Y" && !formData["shortUrlName"]) {
    Alert.error("Please Select Short Url Name.");
    return;
  }

  if (scheduleMessage == "no") {
    delete formData['splitFile'];
  }

  if (isShorturl === "Y") {
    delete formData['shortUrlName'];
    formData['shortUrlName'] = $("#shortUrlName").val()
  }else if (isShorturl === "N") {
    delete formData['scheduleDateTime'];
  }

  if (splitFile == "no" && scheduleMessage == "yes") {
    var scheduleDateTime = $("#scheduleDateTime").val();
    var dateTime = scheduleDateTime.split(/\s+/);
    var scheduleDate = dateTime[0];
    var splitTime = dateTime[1].split(":");
    var hour = splitTime[0];
    var min = splitTime[1];

    formData['scheduleDate'] = scheduleDate;
    formData['scheduleHour'] = hour;
    formData['scheduleMinute'] = min;

    delete formData['scheduleDateTime'];
  }

  if (splitFile == "yes") {

    delete formData['hour'];
    delete formData['min'];
    delete formData['scheduleMessageFrom'];
    delete formData['scheduleMessageTo'];
    delete formData['split_date'];
    var frm = $(this).serializeArray();
    
    const index = frm.map(e => e.name).indexOf('scheduleMessageFrom');
var j = index;
    // var j = isShorturl === "N" ? 16 : 17;
    for (var i = j; i < frm.length;) {

      formData.scheduleInfo.splitPart.push({
        id: (formData.scheduleInfo.splitPart.length + 1).toString(),
        from: frm[i].value,
        to: frm[i + 1].value,
        hh: frm[i + 2].value,
        mm: frm[i + 3].value
      });
      i = i + 4;
    }
    //j++;

  }

  // console.log(fData);
  // console.log(formData);

  var dateValidation = true;

  if (splitFile == "yes") {
    var scheduleDate = $("#scheduleDate").val().split("//");
    var dt = new Date();
    var obj = formData.scheduleInfo.splitPart;

    $.each(obj, function (key, value) {
      var d = new Date(toValidDate((scheduleDate[2]) + "/" + scheduleDate[1] + "/" + scheduleDate[0] + ' ' + value.hh + ':' + value.mm));
      if (d <= new Date()) {
        Alert.clearAll();
        Alert.clearAll();
        Alert.error("Date Mismatch", { clearTime: 10 * 1000 });
        dateValidation = false;
        return;
      }
    });
  } else if (scheduleMessage == "yes" && splitFile == "no") {

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
      Alert.error("Date Mismatch", { clearTime: 20 * 1000 });
      dateValidation = false;
      return;

    }

  }

  // Code End

  var validForm = true;
  var type = $("input[name=msgType]:checked").val();
  var part = $("input[name=msgPart]:checked").val();
  if (isPlainMsg && (type == "plain" || type == "FL")) {
    validForm = true;
  } else if (!isPlainMsg && (type == "unicode" || type == "FU")) {
    validForm = true;
  } else {
    validForm = false;
    if (isPlainMsg && (type == "unicode" || type == "FU")) {
      Alert.clearAll();
      Alert.error("Message Type Mismatch, Please select Message Type Plain to send SMS.", {
        clearTime: 10 * 1000
      });
    } else if (!isPlainMsg && (type == "plain" || type == "FL")) {
      Alert.clearAll();
      Alert.error("Message Type Mismatch, Please select Message Type Unicode to send SMS.", {
        clearTime: 10 * 1000
      });
    }
    else {
      validForm = true;
      // Alert.error("Message Type Mismatch, Please select Message Type Unicode to send SMS.", {
      //   clearTime: 10 * 1000
      // });
    }
  }

  if (validForm) {
    var sectionToCheck = $("#msgText").val();
    var allFoundCharacters = sectionToCheck.match(/[\[\]\{\}\\|\^€\~]/g);
    var splCharCount = (allFoundCharacters) ? allFoundCharacters.length : 0;//count
    var charCount = parseInt($("#msgText").val().length) + parseInt(splCharCount);

    if (isPlainMsg && (charCount > 160) && (part == "single")) {
      validForm = false;
      Alert.clearAll();
      Alert.error("You are trying to send a Multipart SMS, Please select Message Part as Multipart to send the SMS.", {
        clearTime: 10 * 1000
      });
    } else if (!isPlainMsg && (charCount > 70) && (part == "single")) {
      validForm = false;
      Alert.clearAll();
      Alert.error("You are trying to send a Multipart SMS, Please select Message Part as Multipart to send the SMS.", {
        clearTime: 10 * 1000
      });
    } else if (isPlainMsg && (charCount < 160) && (part == "multi")) {
      validForm = false;
      Alert.clearAll();
      Alert.error("You are trying to send a Singlepart SMS, Please select Message Part as Singlepart to send the SMS.", {
        clearTime: 10 * 1000
      });
    } else if (!isPlainMsg && (charCount < 70) && (part == "multi")) {
      validForm = false;
      Alert.clearAll();
      Alert.error("You are trying to send a Singlepart SMS, Please select Message Part as Singlepart to send the SMS.", {
        clearTime: 10 * 1000
      });
    } else {
      validForm = true;
    }
  }

  //console.log(validForm);
  if (dateValidation && validForm) {
    Alert.clearAll();
    $('#messageModal').modal('show');
    data1 = formData;
    data2 = additionalData;
  }

});

$(function () {
  // On Modal Open Event
  $('#messageModal').on('shown.bs.modal', function (e) {
    $("#modelMessage").html($("#msgText").val());
    var msgType = $("input[name=msgType]:checked").val();
    // if ((msgType == "plain") || (msgType == "unicode")) {
    var testmsg = $("#msgText").val();
    var test = testmsg.replace(/\`/g, "'");
    $("#modelMessage").html(test);
    // }
    if (!isPlainMsg) {
      $("#modelCharCount").html($("#charCount").html() + " Unicode");
    } else {
      $("#modelCharCount").html($("#charCount").html());
    }
    var smsCr = parseInt($("#smsCr").html());
    var mobileCount = parseInt($("#totalMobile").html());
    $("#modelSmsCr").html((smsCr));
    $("#sender").html($("#senderIdSelect").val());
  });

});


// Modal Send Now Button
$("#sendNow").click(function () {
  var TextValue = $("#msgText").val();
  sendBulkSMS();
});

function sendBulkSMS() {
  var TextValue = $("#msgText").val();
  var msgType = $("input[name=msgType]:checked").val();
  // if ((TextValue.match(/\`|\~/)) && (msgType == "plain") || (msgType == "unicode")) {
  var test = TextValue.replace(/\`/g, "'");
  TextValue = TextValue.replace(/\`/g, "'");
  // $("#modelMessage").html($("#msgText").val(test));
  // $("#msgText").val(test);
  // }
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
  // $("#btnSubmit").attr("disabled", true);
  // $("#btnCancel").attr("disabled", true);
  $("#sendNow").addClass("d-none");

  var campName = $("#campaignName").val();
  if (campName.length == "0") {
    return true;
  }
  data1["msgText"] = TextValue;
  data1["campaignName"] = campName;
  data1['perMsgCredit'] = $('#modelSmsCr').text();
  var serviceType = $("input[name=serviceType]:checked").val();
  if ((serviceType == "trans") || (serviceType == "promo")) {
    delete data1['serviceSubType'];
  }

  Request(
    Endpoints.get("scheduleFile"),
    "POST",
    $.extend({}, data1, data2),
    { showMainLoader: true }
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
      Alert.clearAll();
      data.result === "Success" &&
        $("#bulk-upload")[0].reset() &&
        (fileName = null);
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message, {
            clearTime: 10 * 1000
          })
          : Alert.error(data.message, {
            clearTime: 10 * 1000
          }));
      $('#messageModal').modal('hide');
      // $("#btnSubmit").attr("disabled", false);
      $("#campaignName").val(campaignName);
    }
  });
}

// On bulk Upload Reset
$("#bulk-upload").on('reset', function (event) {

  // event.preventDefault();
  // $(this).closest('form').get(0).reset();

  $("#selectFile").removeAttr("disabled");
  $("#fileUpload").removeAttr("disabled");
  $("#shortUrlName").val(null).trigger('change');
  $('#charCount').html('0 character');
  $("#totalMobile").html("0");
  $('#smsCr').html('0');
  $("#short_url").addClass('d-none');
  $("#schd_msg").addClass("d-none");
  $(".splitFileGroup").addClass("hidden");
  $(".scheduleActivitiesGroup").addClass("hidden");
  $(".custom-file-label").html('Choose File');
  $(".add_split_row").html("");
  $("#scheduleMsgFieldsGroup").addClass('d-none');
  $("#schd_msg_div").addClass('d-none');
  $(".scheduleDateGroup").removeClass('d-none');
  $(".displayTemplateTextSpan").addClass("d-none");
  $("#msgText").html('');
  $("#sendNow").removeClass("d-none");
  $("#entityId").val('').removeAttr("readonly");
  $("#dltTemplateId").removeAttr("readonly");
  $(".service_type").addClass("d-none");
  $("#campaignName").val(genCampaignName());
});

$(window).bind("load", function () {
  const visual = User.getShortUrlVisual();
  if (visual == "true") {
    $("#isShortUrlVisual").removeClass("d-none");
    $("#shortURLNote").removeClass("d-none");
  } else if (visual == "false") {
    $("#isShortUrlVisual").addClass("d-none");
    $("#shortURLNote").addClass("d-none");
  }
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
  $('#senderIdSelect')
    .empty()
    .append('<option selected disabled >-- Select --</option>');
  $('#templatename')
    .empty()
    .append('<option selected value="">-- Select --</option>');

  if ((selValue == "trans") || (selValue == "service")) {
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
  } else {
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
    $("#msgText").text(txt.templateText)
    $("#displayTemplateText").html(txt.templateText);
    // $(".displayTemplateTextSpan").removeClass("d-none");
    msgCountUpdate();

    $("#entityId").val(txt.entityId);
    $("#dltTemplateId").val(txt.operatorTemplateId);
    $("#entityId").prop("readonly", true);
    $("#dltTemplateId").prop("readonly", true);
  } else {
    $("#displayTemplateText").html("");
    $(".displayTemplateTextSpan").addClass("d-none");
    $("#entityId").val('');
    $("#dltTemplateId").val('');
    $("#entityId").removeAttr("readonly");
    $("#dltTemplateId").removeAttr("readonly");
  }
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
