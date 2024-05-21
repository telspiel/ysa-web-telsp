import "./../../scripts/app";
import "./styles";

import Request from "./../../scripts/request";
import User from "./../../scripts/user";
import Endpoints from "./../../../config/endpoints";
import Alert from "./../../scripts/alert";

if (!User.isLoggedIn()) {
  window.location.href = "/login";
}

$("#addMoreRows").click(
  (row => {
    $("#scheduleMsgFieldsGroup").append(row);
  }).bind(null, $("#scheduleMsgFieldsGroup").html())
);
$("#msgText").keyup(() => {
  $("#charCount").html($("#msgText").val().length);
});
$("#cancelForm").click(() => {
  $("#bulk-upload")[0].reset();
});
$("#scheduleMsgFieldsGroup").on("click", ".removeRow", function() {
  $(this)
    .parent()
    .parent()
    .remove();
});
$(".removeRow")
  .first()
  .hide();

let fileName = null;

$("#fileUpload").click(function(e) {
  Alert.clearAll();
  const file = $("#selectFile").get(0).files[0];

  if (!file) {
    Alert.info("Please select a file.");
    return;
  }

  if (["text/csv", "text/plain"].indexOf(file.type) == -1) {
    Alert.clearAll();
    Alert.error("Only .csv and .txt files are allowed.");
    return;
  }

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
      Alert.clearAll();
      if (data.result === "Success") {
        fileName = data.data.fileName;
      }
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

$("#bulk-upload").submit(function(e) {
  e.preventDefault();
  const file = $("#selectFile").get(0).files[0];
  Alert.clearAll();
  if (file && !fileName) {
    Alert.error("Please upload the file by clicking Upload button.");
    return;
  }
  const formData = {
    scheduleInfo: {
      splitPart: []
    }
  };
  const frm = $(this).serializeArray();
  let i = 0;
  let j = 1;
  while (i < frm.length) {
    if (i < 5) {
      formData[frm[i].name] = frm[i].value;
      i++;
    } else {
      formData.scheduleInfo.splitPart.push({
        id: j.toString(),
        from: frm[i].value,
        to: frm[i + 1].value,
        hh: frm[i + 2].value,
        mm: frm[i + 3].value
      });
      i += 4;
      j++;
    }
  }
  const additionalData = {
    username: User.getName(),
    fileName
  };
  Alert.clearAll();
  Request(
    Endpoints.get("scheduleFile"),
    "POST",
    $.extend({}, formData, additionalData)
  ).done(data => {
    if (Endpoints.validateResponse(data)) {
      data.result === "Success" &&
        $("#bulk-upload")[0].reset() &&
        (fileName = null);
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
