import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

console.log("Welcome to Template-message");

var uploadedFileName = '';
var tparams;
let campaignName = "";

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

function genCampaignName() {
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
  var CName = User.getName() + "-campaign-" + dTime;
  campaignName = CName;
  return CName;
}

$(document).ready(function () {
  $("#campaignName").val(genCampaignName());
  $("#schedule_date").datetimepicker({
    minDate: '0',
    minTime: '0',
    dateFormat: 'yy-mm-dd',
    timeFormat: 'HH:mm:ss',
    format: 'Y-m-d H:i',
    step: 1
  }).attr('readonly', 'readonly');

  $("#schedule_date").datetimepicker({
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

});

loadTemplates()

function loadTemplates() {
  const data = {
    loggedInUserName: User.getName()
  };
  var templateList;

  var templateSelect = document.getElementById("templateOption");
  Request(Endpoints.get("viewTemplate"), "POST", data).done(data => {
    const gpList = data.data.templateList;
    templateList = gpList;
    window.templateList = gpList;
    $.each(gpList, function (key, value) {
      templateSelect.options[templateSelect.options.length] = new Option(value.templateTitle, value.templateTitle);
    });
    $("#msgText").val(templateList[0].templateText);
  });

  $('#templateOption').on('change', function () {
    var tt = this.value;
    templateList.forEach(function (entry) {
      if (entry.templateTitle == tt) {
        $("#msgText").val(entry.templateText);
      }
    });
  });

}

$("#fupload").click(function (e) {
  e.preventDefault();
  const selectFile = $("#selectFile").get(0).files[0];
  var selectedFileName = $("#selectFile").get(0).files[0].name;
  Alert.clearAll();
  if (!selectFile) {
    Alert.info("Please select a file.");
    return;
  }

  var ar = /^(\d|\w|-)+$/;
  if (ar.test(selectedFileName.split(".")[0]) == false) {
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

  $("#template-msg-form")
    .serializeArray()
    .forEach(i => {
      var key = i.name;
      if (key == "campaignName" || key == "msgPart" || key == "msgType" || key == "templateName") {
        data2[i.name] = i.value;
        formData1.append(i.name, i.value);
      }
    });

  templateList.forEach(function (entry) {
    if (entry.templateTitle == $('#templateOption').val()) {
      formData1.append('templateId', entry.templateId);
    }
  });

  Request(Endpoints.get("uploadTemplateMsg"), "POST", formData1, {
    showMainLoader: true,
    contentType: false,
    processData: false,
    data: formData1
  }).done(data => {
    if (Endpoints.validateResponse(data)) {
      uploadedFileName = data.data.fileName;
      var numberSelect = document.getElementById("mobileNumber");
      const headerList = data.data.columnHeaderMap;
      $.each(headerList, function (key, value) {
        numberSelect.options[numberSelect.options.length] = new Option(key, value);
      });

      const params = data.data.templateParamList;
      tparams = params;
      console.log(params);
      $.each(params, function (key, value) {
        var htmlContent = "<div class='form-group row eachParam'><label class='col-sm-2 col-form-label paramLabel'>" + value + "</label>";
        htmlContent += "<div class='col-sm-6'><select type='text' class='form-control templateParam' id='templateParam-" + key + "'  name='" + value + "'><option selected>-- Select --</option></select></div>";
        htmlContent += "</div>";

        $("#allParams").append(htmlContent);

      });

      var i = 0;
      $("#allParams").find('.templateParam').each(function () {
        var fielSelect = document.getElementById("templateParam-" + i);
        $.each(headerList, function (key, value) {
          fielSelect.options[fielSelect.options.length] = new Option(key, value);
        });
        i++;
      });

      $("#selectFile").attr("disabled", "true");
      $("#fupload").attr("disabled", "true");

      Alert.clearAll();
      data.message &&
        (data.result === "Success"
          ? Alert.success(data.message, {
            clearTime: 60 * 60 * 1000
          })
          : Alert.error(data.message, {
            clearTime: 60 * 60 * 1000
          }));
    }
  });
});
// $(function () {

$("#btnPreview").click(() => {
  var ar =  /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/;
  if ($("#campaignName").val() != campaignName) {
    if (ar.test($("#campaignName").val()) == false) {
      Alert.error("Campaign Name should not contain space", {
        clearTime: 10 * 1000
      });
      return;
    }
  }

  const data2 = {};
  $("#template-msg-form")
    .serializeArray()
    .forEach(i => {
      if (i.value) {
        data2[i.name] = i.value;
      }
    });
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");

  var CName = $("#campaignName").val();
  data2["campaignName"] = CName;
  templateList.forEach(function (entry) {
    if (entry.templateTitle == $('#templateOption').val()) {
      data2['templateId'] = entry.templateId;
    }
  });

  delete data2["templateName"];

  if (data2['scheduleMessage'] === "no") {
    delete data2["scheduleDateTime"];
    //  delete data2["splitFileTime"];
  } else {
    var dateTime = data2["scheduleDateTime"].split(/\s+/);
    data2["scheduleDate"] = dateTime[0];
    var splitTime = dateTime[1].split(":");
    data2["scheduleHour"] = splitTime[0];
    data2["scheduleMinute"] = splitTime[1];
    delete data2["scheduleDateTime"];
  }

  const additionalData = {
    loggedInUserName: User.getName()
  };

  var paramFieldMapping = {};
  var plist = 0;
  $.each(tparams, function (key, value) {
    paramFieldMapping[value] = data2[value];
    delete data2[value];
    //paramFieldMapping.push(value,"templateParam-"+plist);
  });

  data2['paramFieldMapping'] = paramFieldMapping;
  data2['fileName'] = uploadedFileName;
  var serviceType = $("input[name=serviceType]:checked").val();
  if ((serviceType == "trans") || (serviceType == "promo")) {
    delete data2['serviceSubType'];
  }

  Request(Endpoints.get("getTemplatePreview"), "POST", $.extend({}, data2, additionalData), { showMainLoader: true }).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      console.log(resData);
      var tData = resData.previewDataMap;
      $("#totalCount").html(resData.totalCount);
      $("#count").html(resData.plainCount);
      $("#credit").html(resData.plainCredit);
      $("#uniCode").html(resData.unicodeCount);
      $("#uniCodeCr").html(resData.unicodeCredit);
      $("#smsCr").html(resData.plainCredit);
      if (resData.unicodeCredit != 0) {
        $("#smsCr").html(resData.unicodeCredit);
      }
      var html = "";
      Object.keys(tData).forEach(function (key) {
        console.log(key + ': ' + tData[key]);
        html = html + "<tr><td>" + key + "</td><td>" + tData[key] + "</td></tr>";
        console.log(html);
      });
      $("#tBody").html(html);
      $('#messageModal').modal('show');
    }
  });

});

$("#sendNow").click(function () {
  $("#btnPreview").attr("disabled", true);
  $("#sendNow").addClass("d-none");
  const data2 = {};

  $("#template-msg-form")
    .serializeArray()
    .forEach(i => {
      if (i.value) {
        data2[i.name] = i.value;
      }
    });

  templateList.forEach(function (entry) {
    if (entry.templateTitle == $('#templateOption').val()) {
      data2['templateId'] = entry.templateId;
    }
  });

  delete data2["templateName"];
  console.log(data2);
  console.log(data2['scheduleMessage']);
  if (data2['scheduleMessage'] == "no") {
    delete data2["scheduleDateTime"];
  } else {
    var dateTime = data2["scheduleDateTime"].split(/\s+/);
    data2["scheduleDate"] = dateTime[0];
    var splitTime = dateTime[1].split(":");
    data2["scheduleHour"] = splitTime[0];
    data2["scheduleMinute"] = splitTime[1];
    delete data2["scheduleDateTime"];
  }

  var paramFieldMapping = {};
  $.each(tparams, function (key, value) {
    paramFieldMapping[value] = data2[value];
    delete data2[value];
  });
  data2['paramFieldMapping'] = paramFieldMapping;
  data2['fileName'] = uploadedFileName;
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
  var CName = $("#campaignName").val();
  data2["campaignName"] = CName;

  var selValue = $("input[name='serviceType']:checked").val();
  if ((selValue == "trans") || (selValue == "promo")) {
    delete data2['serviceSubType'];
  }

  data2['perMsgCredit'] = $('#smsCr').text();

  const additionalData = {
    loggedInUserName: User.getName()
  };

  Request(
    Endpoints.get("sendTemplateSMS"),
    "POST",
    $.extend({}, data2, additionalData),
    { showMainLoader: true }
  ).done(resData => {
    if (Endpoints.validateResponse(resData)) {
      console.log(resData.message);
      $("#template-msg-form")[0].reset();
      $("#campaignName").val(genCampaignName());
      $('#messageModal').modal('hide');
      Alert.clearAll();
      resData.message &&
        (resData.result === "Success"
          ? Alert.success(resData.message)
          : Alert.error(resData.message));
    }
  });

});

$('#messageModal').on('hidden.bs.modal', function () {
  // do something…
  $("#btnPreview").removeAttr("disabled");
});

$("#template-msg-form").on('reset', function (event) {
  $("#selectFile").removeAttr("disabled");
  $("#fupload").removeAttr("disabled");
  $("#btnPreview").removeAttr("disabled");
  $("#tBody").html("");
  $("#allParams").html('');
  $(".custom-file-label").html('Choose File');
  $(".scheduleDateGroup").addClass('d-none');
  $("#sendNow").removeClass("d-none");
  var select = document.getElementById("mobileNumber");
  select.options.length = 0;
  var template = document.getElementById("templateOption");
  template.options.length = 1;
  var senderId = document.getElementById("senderId");
  senderId.options.length = 1;
  uploadedFileName = null;
  loadTemplates();
});

$(document).ready(function () {
  const datalist = {
    loggedInUserName: User.getName(),
    messageType: "other",
    messageSubType: ""
  }
  var senderIdList = document.getElementById("senderIdSelect");
  Request(Endpoints.get("senderIdListByMessageType"), "POST", datalist).done(data => {
    console.log(data);
    const tempList = data.data.senderIdList;
    console.log(tempList);
    $.each(tempList, function (key, value) {
      senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);
    });

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
      console.log(data);
      const tempList = data.data.senderIdList;
      console.log(tempList);
      $.each(tempList, function (key, value) {
        senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);
      });
    });
  } else {
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
      console.log(data);
      const tempList = data.data.senderIdList;
      console.log(tempList);
      $.each(tempList, function (key, value) {
        senderIdList.options[senderIdList.options.length] = new Option(value.senderId, value.senderId);
      });

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
  });
});


$("#templatename").change(function () {
  var contentTemplateId = $(this).children("option:selected").val();
  var txt = selectTemplateName.find((x) => x.templateId == contentTemplateId);
  if (txt) {
    $("#displayTemplateText").html(txt.templateText);
    $(".displayTemplateTextSpan").removeClass("d-none");
    $("#entityId").val(txt.entityId);
    $("#operatorTemplateId").val(txt.operatorTemplateId);
    $("#entityId").prop("readonly", true);
    $("#operatorTemplateId").prop("readonly", true);
  } else {
    $("#displayTemplateText").html("");
    $(".displayTemplateTextSpan").addClass("d-none");
    $("#entityId").val('');
    $("#operatorTemplateId").val('');
    $("#entityId").removeAttr("readonly");
    $("#operatorTemplateId").removeAttr("readonly");
  }
});
