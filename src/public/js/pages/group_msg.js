$(document).ready(function(){
    $(".datetimepicker" ).datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm:ss'
    }).attr('readonly', 'readonly');
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
$("#isTemplateSelected-0").click(function(){
    if($(this).is(':checked')) {
        $("#chooseTemplate-row").removeClass('d-none');
    } else {
        $("#chooseTemplate-row").addClass('d-none');
    }
});
$("#isTemplateSelected-1").click(function(){
    if($(this).is(':checked')) {
        $("#chooseTemplate-row").addClass('d-none');
    } else {
        $("#chooseTemplate-row").removeClass('d-none');
    }
});
$("#isScheduledSMS-0").click(function(){
    if($(this).is(':checked')) {
        $("#scheduleRow").removeClass('d-none');
    } else {
        $("#scheduleRow").addClass('d-none');
    }
});
$("#isScheduledSMS-1").click(function(){
    if($(this).is(':checked')) {
        $("#scheduleRow").addClass('d-none');
    } else {
        $("#scheduleRow").removeClass('d-none');
    }
});
function countChar(val) {
    var len = val.value.length;
    if (len >= 500) {
        val.value = val.value.substring(0, 500);
    } else {
        $('#charNum').text(len);
        if (len > 160) {
            var sms_credit = Math.ceil(len / 162);
            $("#smsCredit").text(sms_credit);
        } else {
            if (len > 0) {
                $("#smsCredit").text("1");
            } else {
                $("#smsCredit").text("0");
            }
        }
    }
};
$("#scheduleMessage-0").click(function(){
    if($(this).is(':checked')) {
        $(".scheduleDateGroup").removeClass('d-none');
    } else {
        $(".scheduleDateGroup").addClass('d-none');
    }
});
$("#scheduleMessage-1").click(function(){
    if($(this).is(':checked')) {
        $(".scheduleDateGroup").addClass('d-none');
    } else {
        $(".scheduleDateGroup").removeClass('d-none');
    }
});
