import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

// $("#cancelForm").click(() => {
//   $("#sendMessage")[0].reset();
// });

let pureMsg = "";
let shortList;
let campaignName = "";


$(window).bind("load", function () {

  const visual = User.getShortUrlVisual();
  console.log(typeof (visual));
  if (visual == "true") {
    $("#isShortUrlVisual").removeClass("d-none");
    $("#shortURLNote").removeClass("d-none");
  } else if (visual == "false") {
    $("#isShortUrlVisual").addClass("d-none");
    $("#shortURLNote").addClass("d-none");
  }
});


// Woirking on it
function updatedwithShortURL() {
  console.log("incomming")
  var cursorPos = $('#msgText').prop('selectionStart');
  var v = $('#msgText').val();
  var textBefore = v.substring(0, cursorPos);
  var textAfter = v.substring(cursorPos, v.length);

  var shortnameArray = $("#shortUrlName").val();
  for (let shortname of shortnameArray) {
    var shortObj = shortList.filter(p => p.name == shortname)[0];
    $("#msgText").val(textBefore + " " + shortObj.hostName + "/xxxxxx " + textAfter);
  }
  messageCountUpdate();
}

function genCampaignName() {
  const dTime = moment(new Date()).format("DDMMYYYY-HHmm");
  var CName = User.getName() + "-campaign-" + dTime;
  campaignName = CName;
  return CName;
}
$(function () {
  $("#campaignName").val(genCampaignName());

  $("#sendMessage").on('reset', function (event) {

    $("#short_url").addClass('d-none');
    $('#charCount').html('0 character');
    $('#smsCr').html('0');
    $('#totalMobile').html('0');
    $(".displayTemplateTextSpan").addClass("d-none");
    $("#entityId").prop("disabled", false);
    $("#operatorTemplateId").prop("disabled", false);
    $(".service_type").addClass("d-none");
  });


  function displayShortURLShortNote() {
    var shortname = $("#shortUrlName").val();
    var shortObj = shortList.filter(p => p.name == shortname)[0];
    if (shortObj.isDynamic == "N") {
      $("#staticUrlNote").removeClass("d-none");
      $("#dynamicUrlNote").addClass("d-none");
    } else if (shortObj.isDynamic == "Y") {
      $("#dynamicUrlNote").removeClass("d-none");
      $("#staticUrlNote").addClass("d-none");
    }
  }

  $("#isShortUrlSelected-1,#isShortUrlSelected-0").click(function () {
    // pureMsg = $("#msgText").val();
    if ($(this).val() == "Y") {
      pureMsg = $("#msgText").val();
      $("#shortUrlName").val($("#shortUrlName option:first").val());
      // updatedwithShortURL();
      // displayShortURLShortNote();
    } else {
      console.log(pureMsg);
      $("#msgText").val(pureMsg);
    }
  });

  $('#messageModal').on('shown.bs.modal', function (e) {
    // do something...
    $("#modelMessage").html($("#msgText").val());
    var serviceType = $("input[name=msgType]:checked").val();
    // if ((serviceType == "plain") || (serviceType == "unicode")) {
    var testmsg = $("#msgText").val();
    var test = testmsg.replace(/\`/g, "'");
    $("#modelMessage").html(test);
    // }
    if (!isPlainMsg) {
      $("#modelCharCount").html($("#charCount").html() + " Unicode");
    }
    $("#modelCharCount").html($("#charCount").html());
    // var totalCr = parseInt($("#smsCr").html()) * parseInt($("#totalMobile").html());
    $("#modelSmsCr").html($("#smsCr").html());
    $("#sender").html($("#senderIdSelect").val());
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
          console.log(data);
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
    }
  });

  $("#cpyClose").click(function () {
    $("#msgText").val(convertedText);
    messageCountUpdate();
  })


  // mODAL cLICK eVENT
  $("#sendNow").click(function () {

    const formData = {};
    var TextValue = $("#msgText").val();
    var serviceType = $("input[name=msgType]:checked").val();
    // if ((TextValue.match(/\`|\~/)) && (serviceType == "plain") || (serviceType == "unicode")) {
    var test = TextValue.replace(/\`/g, "'");
    TextValue = TextValue.replace(/\`/g, "'");
    // $("#modelMessage").html($("#msgText").val(test));
    $("#msgText").val(test);
    // }

    $("#sendMessage")
      .serializeArray()
      .forEach(i => {
        if (i.value) {
          formData[i.name] = i.value;
        }
      });

    const additionalData = {
      loggedInUserName: User.getName(),
      shortUrlName: $("#shortUrlName").val()
    }
    var serviceType = $("input[name=serviceType]:checked").val();
    if ((serviceType == "trans") || (serviceType == "promo")) {
      delete formData['serviceSubType'];
    }

    formData['perMsgCredit'] = $('#modelSmsCr').text();

    $("#btnSubmit").attr("disabled", true);
    $("#btnCancel").attr("disabled", true);
    $("#sendNow").addClass("d-none");
    Request(Endpoints.get("quickMessage"), "POST", $.extend({}, formData, additionalData), { showMainLoader: true }).done(data => {
      if (Endpoints.validateResponse(data)) {
        $('#messageModal').modal('hide');
        Alert.clearAll();
        if (data.result === "Success") {
          $("#sendMessage")[0].reset();
          $("#campaignName").val(genCampaignName());
        }
        Alert.clearAll();
        data.message &&
          (data.result === "Success"
            ? Alert.success(data.message, {
              clearTime: 10 * 1000
            })
            : Alert.error(data.message, {
              clearTime: 10 * 1000
            }));
        $("#btnSubmit").attr("disabled", false);
        $("#btnCancel").attr("disabled", false);
        $("#sendNow").removeClass("d-none");
      }
    });
  });


  $("#sendMessage").submit(function (e) {
    const dateTime = moment(new Date()).format("DDMMYYYY-HHmm");

    e.preventDefault();


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

    const data = {
      // campaignName: CName,
      loggedInUserName: User.getName(),
      serviceType: $("input[name=serviceType]:checked").val(),
      msgText: this[9].value,
      mobileNumber: this[1].value,
      senderIdType: this[7].value,
    };
    var validForm = true;
    var type = $("input[name=msgType]:checked").val();
    var part = $("input[name=msgPart]:checked").val();

    if (isPlainMsg && (type == "plain" || type == "FL")) {
      validForm = true;
    } else if (!isPlainMsg && (type == "unicode" || type == "FU")) {
      validForm = true;
    }
    else {
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

    //var regEx = new RegExp("^\d[\d\s]*$");
    var regEx = new RegExp("^(\d{10})+\s");
    var mobileTextarea = $("#mobileNumber").val();
    //if(regEx.test(mobileTextarea.trim())){
    if (validForm) {
      // console.log("true");
      $('#messageModal').modal('show');
      // console.log("false");
    }
  });
});

var isPlainMsg = true;
$("#msgText").keyup(() => {
  //  $("#charCount").html($("#msgText").val().length);
  messageCountUpdate();
});

$("#mobileNumber").keyup(() => {
  var count = $('#mobileNumber').val().split(/[\n\r]+[0-9]{1}/g).length;
  var fieldLength = $('#mobileNumber').val().length;
  if (fieldLength != 0) {
    $("#totalMobile").html(count);
  } else {
    $("#totalMobile").html("0");
  }
});

function messageCountUpdate() {

  var sectionToCheck = $("#msgText").val();
  var allFoundCharacters = sectionToCheck.match(/[\[\]\{\}\\|\^€\~]/g);
  var splCharCount = (allFoundCharacters) ? allFoundCharacters.length : 0;//count

  if (sectionToCheck.match(/[\~]/g)) {
    var charCount = parseInt($("#msgText").val().length) + parseInt("0");
  }
  else {
    var charCount = parseInt($("#msgText").val().length) + parseInt(splCharCount);
  }


  var plain = new RegExp("^[A-Za-z0-9_~\\`\\-!:\\/.@\\|\\,#\\$%\\^&\\*\\(\\)\n\s +=\\\\{}\\[\\];'\"<>?₹]*$");

  var count = charCount;
  var sms = 0;
  if (plain.test($("#msgText").val().trim())) {

    isPlainMsg = true;
    if (charCount > 160) {
      var n = count / 153;
      var dec = Math.ceil(n)
      sms = dec;
    } else if (count != 0 && count <= 160) {
      sms = 1;
    } else {
      sms = 0;
    }
    $("#charCount").html(charCount + " characters");
  } else {
    isPlainMsg = false;
    if (charCount > 70) {
      var n = count / 67;
      var dec = Math.ceil(n)
      sms = dec;
    } else if (count != 0 && count <= 70) {
      sms = 1;
    } else {
      sms = 0;
    }
    var type = $("input[name=msgType]:checked").val();
    if (type == "plain") {
      $("#charCount").html(charCount + " characters");
    }
    if (type == "unicode") {
      $("#charCount").html(charCount + " unicode characters");
    }

  }
  $("#smsCr").html(sms);
}
$(() => {
  const data1 = {
    loggedInUserName: User.getName(),
  };
  // Request(Endpoints.get("getActiveSenderIdList"), "POST", data1).done(data1 => {
  //   if (Endpoints.validateResponse(data1)) {
  //     const source = (app.store.senderIdList = data1.data.senderIdList.map(
  //       o => ({
  //         id: o.id,
  //         name: o.senderId
  //       })
  //     ));
  //     source.forEach(i => {
  //       var o = new Option(i.name, i.name);
  //       $(o).html(i.name);
  //       $("#senderIdSelect").append(o);
  //     });
  //   }
  // });

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
        let finding_text = shortObj.hostName + "/xxxxxx ";
        let msg_txt = $("#msgText").val();

        let index = getIndex(msg_txt, finding_text, (unSelecteData_index+1))
        // console.log(index,finding_text.length)

        let new_text = msg_txt.slice(0, index) + msg_txt.slice((index+finding_text.length));

        $("#msgText").val(new_text)
        
        messageCountUpdate();

        // console.log(msg_txt)
        // console.log(new_text)

//         var str = "sadfsd asdf api.tltx.in/xxxxxx asdf api.tltx.in/xxxxxx ";
// str = str.slice(0, 11) + str.slice(31);
// console.log(str)

// VM1748:3 sadfsd asdfasdf api.tltx.in/xxxxxx 

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
      .append('<option selected disabled >-- Select --</option>');
    $('#templatename')
      .empty()
    // .append('<option selected>-- Select --</option>');
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
      .append('<option selected disabled >-- Select --</option>');
    $('#templatename')
      .empty()
    // .append('<option selected>-- Select --</option>');
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
    messageCountUpdate();
    // $(".displayTemplateTextSpan").removeClass("d-none");

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
