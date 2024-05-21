import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

// const table = require("./../../partials/table.hbs");

console.log("Welcome to Group Message");

let campaignName = "";

function genCampaignName() {
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
  var CName = User.getName() + "-campaign-" + dTime;
  campaignName = CName;
  return CName;
}

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

$(document).ready(function () {

  $("#campaignName").val(genCampaignName());

  $('#date,.time').combodate({
    value: new Date(),
    minYear: 2019,
    firstItem: 'name',
    minuteStep: 1,
    customClass: 'form-control',
    smartDays: true
  });

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
          console.log(data);
          $("#convertedText").html(data.convertedText);
          convertedText = data.convertedText;
          msgCount();
        }
      });
    }
  });

  $("#checkboxId").click(function () {
    if ($('#checkboxId').is(":checked")) {
      $("#msgText").val("");
    }
  });

  $("#cpyClose").click(function () {
    $("#msgText").val(convertedText);
    msgCount();
  })

  const data = {
    loggedInUserName: User.getName()
  };

  var grpSelect = document.getElementById("groupName");
  Request(Endpoints.get("allGroupList"), "POST", data).done(data => {
    const gpList = data.data.groupList;
    $.each(gpList, function (key, value) {
      grpSelect.options[grpSelect.options.length] = new Option(value.groupName, value.groupName);
    });
  });

  var templateList;

  var templateSelect = document.getElementById("chooseTemplate");
  Request(Endpoints.get("viewTemplate"), "POST", data).done(data => {
    const gpList = data.data.templateList;
    templateList = gpList;
    window.templateList = gpList;
    $.each(gpList, function (key, value) {
      templateSelect.options[templateSelect.options.length] = new Option(value.templateTitle, value.templateTitle);
    });
  });

  // var senderIDSelect = document.getElementById("senderId");
  // Request(Endpoints.get("getActiveSenderIdList"), "POST", data).done(data => {
  //   const gpList = data.data.senderIdList;
  //   $.each(gpList, function (key, value) {
  //     senderIDSelect.options[senderIDSelect.options.length] = new Option(value.senderId, value.senderId);
  //   });
  // });

});

$('input[type=radio][name=isTemplateSelected]').change(function () {
  if (this.value == 'yes') {
    $("#chooseTemplate-row").removeClass("hidden");
    //console.log(templateList);
    var tempSelected = $('#chooseTemplate').val();
    templateList.forEach(function (entry) {
      if (entry.templateTitle == tempSelected) {
        //console.log(entry);
        $("#msgText").val(entry.templateText);
      }
    });

    var template = templateList.filter(function (data) {
      return data.templateText == tempSelected;
    });
    //console.log(template);
  }
  else if (this.value == 'no') {
    $("#chooseTemplate-row").addClass("hidden");
    $("#msgText").val("");
  }
  msgCount();
});

$('#chooseTemplate').on('change', function () {
  //  alert( this.value );
  var tt = this.value;
  templateList.forEach(function (entry) {
    if (entry.templateTitle == tt) {
      console.log(entry);
      $("#msgText").val(entry.templateText);
      msgCount();
    }
  });
});

$("#msgText").keyup(() => {
  msgCount();
});

var isPlainMsg = true;

function msgCount() {
  var plain = new RegExp("^[A-Za-z0-9_~\\`\\-!:\\/.@\\|\\,#\\$%\\^&\\*\\(\\)\n\s +=\\\\{}\\[\\];'\"<>?₹]*$");


  var sectionToCheck = $("#msgText").val();
  var allFoundCharacters = sectionToCheck.match(/[\[\]\{\}\\|\^€\~]/g);
  var splCharCount = (allFoundCharacters) ? allFoundCharacters.length : 0;//count
  if (sectionToCheck.match(/[\~]/g)) {
    var charCount = parseInt($("#msgText").val().length) + parseInt("0");
  }
  else {
    var charCount = parseInt($("#msgText").val().length) + parseInt(splCharCount);
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
    console.log("unicode");
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
    // $("#charCount").html(charCount + " unicode characters");
    // var type = $("input[name=msgType]:checked").val();
    // if (type == "plain") {
    //   $("#charCount").html(charCount + " characters");
    // }
    // if (type == "UM") {
    //   $("#charCount").html(charCount + " unicode characters");
    // }
  }

  if (plain.test($("#msgText").val().trim())) {
    $("#charCount").html(charCount + " characters");
  } else {
    $("#charCount").html(charCount + " unicode characters");
  }

  $("#smsCr").html(sms);

}

$('input[type=radio][name=isScheduledSMS]').change(function () {
  if (this.value == 'yes') {
    $("#scheduleRow").removeClass("hidden");
  }
  else if (this.value == 'no') {
    $("#scheduleRow").addClass("hidden");
  }
});

$("#group-msg-form").on('reset', function (event) {
  $("#short_url").addClass('d-none');
  $('#charCount').html('0 character');
  $('#smsCr').html('0');
  $('#totalMobile').html('0');
  $("#shortUrlName").val(null).trigger('change');
  $(".displayTemplateTextSpan").addClass("d-none");
  $("#entityId").prop("disabled", false);
  $("#operatorTemplateId").prop("disabled", false);
  $(".service_type").addClass("d-none");
  $("#scheduleRow").addClass("d-none");
});



$("#group-msg-form").submit(function (e) {
  e.preventDefault();
  // var ar = /^(\d|\w|-)+$/;
  var ar =  /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/;
  if ($("#campaignName").val() != campaignName) {
    if (ar.test($("#campaignName").val()) == false) {
      Alert.clearAll();
      Alert.error("Campaign Name should not contain space", {
        clearTime: 10 * 1000
      });
      return;
    }
  }

  const formData = {};
  var TextValue = $("#msgText").val();

  if (!TextValue) {
    Alert.clearAll();
    Alert.error("Please Enter the message text", {
      clearTime: 10 * 1000
    });
    return;
  }

  var msgType = $("input[name=msgType]:checked").val();
  const isShorturl = $("input[name=isShortUrlSelected]:checked").val();
  // if ((TextValue.match(/\`|\~/)) && (msgType == "plain") || (msgType == "UM")) {
  var test = TextValue.replace(/\`/g, "'");
  TextValue = TextValue.replace(/\`/g, "'");
  // $("#modelMessage").html($("#msgText").val(test));
  // $("#msgText").val(test);
  // }
  $(this)
    .serializeArray()
    .forEach(i => {
      if (i.value) {
        formData[i.name] = i.value;
      }
    });

  const dateTime = moment(new Date()).format("DDMMYYYY-HHmm");
  var serviceType = $("input[name=serviceType]:checked").val();
  if ((serviceType == "trans") || (serviceType == "promo")) {
    delete formData['serviceSubType'];
  }

  var CName = $("#campaignName").val();
  formData["campaignName"] = CName;
  formData["msgText"] = TextValue;
  console.log(formData);
  if (formData['isTemplateSelected'] == "no") {
    delete formData["selectedTemplateName"];
  }

  if (isShorturl === "Y") {
    formData['shortUrlName'] = $("#shortUrlName").val()
  }

  if (formData['isScheduledSMS'] == "no") {
    //console.log("c c c c c");
    delete formData["scheduleDate"];
    // delete formData["splitFileTime"];
  } else {

    var splitDateTime = formData["scheduleDate"].split(/\s+/);

    formData["scheduleDate"] = splitDateTime[0];
    var splitTime = splitDateTime[1].split(":");
    formData["scheduleHour"] = splitTime[0];
    formData["scheduleMinute"] = splitTime[1];
    delete formData["splitFileTime"];
  }

  formData['perMsgCredit'] = $('#smsCr').text();

  const additionalData = {
    loggedInUserName: User.getName()
  };


  var validForm = true;
  var type = $("input[name=msgType]:checked").val();
  var part = $("input[name=msgPart]:checked").val();
  if (isPlainMsg && (type == "plain" || type == "FL")) {
    validForm = true;
  } else if (!isPlainMsg && (type == "UM" || type == "FU")) {
    validForm = true;
  } else {
    validForm = false;
    if (isPlainMsg && (type == "UM" || type == "FU")) {
      Alert.clearAll();
      Alert.error("Message Type Mismatch, Please select Message Type Plain to send SMS.i", {
        clearTime: 10 * 1000
      });
    } else if (!isPlainMsg && (type == "plain" || type == "FL")) {
      Alert.clearAll();
      Alert.error("Message Type Mismatch, Please select Message Type Unicode to send SMS.", {
        clearTime: 10 * 1000
      });
    } else {
      validForm = true;
      //  console.log(isPlainMsg+" : "+type);
      // Alert.error("Message Type Mismatch, Please select Message Type Unicode to send SMS.ii", {
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
      Alert.clearAll();
      validForm = false;
      Alert.error("You are trying to send a Multipart SMS, Please select Message Part as Multipart to send the SMS.", {
        clearTime: 10 * 1000
      });
    } else if (!isPlainMsg && (charCount > 70) && (part == "single")) {
      Alert.clearAll();
      validForm = false;
      Alert.error("You are trying to send a Multipart SMS, Please select Message Part as Multipart to send the SMS.", {
        clearTime: 10 * 1000
      });
    } else if (isPlainMsg && (charCount < 160) && (part == "multi")) {
      Alert.clearAll();
      validForm = false;
      Alert.error("You are trying to send a Singlepart SMS, Please select Message Part as Singlepart to send the SMS.", {
        clearTime: 10 * 1000
      });
    } else if (!isPlainMsg && (charCount < 70) && (part == "multi")) {
      Alert.clearAll();
      validForm = false;
      Alert.error("You are trying to send a Singlepart SMS, Please select Message Part as Singlepart to send the SMS.", {
        clearTime: 10 * 1000
      });
    } else {
      validForm = true;
    }
  }

  if (validForm) {
    // console.log(formData);
    $("#btnSubmit").attr("disabled", true);
    Request(
      Endpoints.get("sendGroupSMS"),
      "POST",
      $.extend({}, formData, additionalData),
      { showMainLoader: true }
    ).done(resData => {
      if (Endpoints.validateResponse(resData)) {
        console.log(resData.message);
        $("#group-msg-form")[0].reset();
        Alert.clearAll();
        resData.message &&
          (resData.result === "Success"
            ? Alert.success(resData.message)
            : Alert.error(resData.message));
        $("#btnSubmit").attr("disabled", false);
      }
    });
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
    $("#msgText").text(txt.templateText)
    $("#displayTemplateText").html(txt.templateText);
    // $(".displayTemplateTextSpan").removeClass("d-none");
    msgCount();

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

//// multi short  url

let pureMsg = "";
let shortList;

$("#isShortUrlSelected-1,#isShortUrlSelected-0").click(function () {
  if ($(this).val() == "Y") {
    pureMsg = $("#msgText").val();
    $("#shortUrlName").val($("#shortUrlName option:first").val());
  } else {
    $("#msgText").val(pureMsg);
  }
});

const data1 = {
  loggedInUserName: User.getName(),
};

Request(Endpoints.get("listShortUrl"), "POST", data1).done(resData => {
  if (Endpoints.validateResponse(resData)) {
    console.log(resData);
    shortList = resData.data.shortUrlList;
    const source = (app.store.senderIdList = resData.data.shortUrlList.map(
      o => ({
        id: o.shortUrlId,
        name: o.name
      })
    ));
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
  
      msgCount();
    }).trigger('change');

  }
});

function updatedwithShortURL() {
  console.log("incomming")
  var cursorPos = $('#msgText').prop('selectionStart');
  var v = $('#msgText').val();
  var textBefore = v.substring(0, cursorPos);
  var textAfter = v.substring(cursorPos, v.length);

  var shortnameArray = $("#shortUrlName").val();
  for (let shortname of shortnameArray) {
    var shortObj = shortList.filter(p => p.name == shortname)[0];
    $("#msgText").val(textBefore + "" + shortObj.hostName + "/xxxxxx" + textAfter);
  }
  msgCount();
}

function getIndex(str, substr, ind) {
  var Len = str.length, i = -1;
  while (ind-- && i++ < Len) {
    i = str.indexOf(substr, i);
    if (i < 0) break;
  }
  return i;
}