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
$("#scheduleMessage-0").click(function(){
    if($(this).is(':checked')) {
        $("#schd_msg").removeClass('d-none');
    } else {
        $("#schd_msg").addClass('d-none');
    }
});
$("#scheduleMessage-1").click(function(){
    if($(this).is(':checked')) {
        $("#schd_msg").addClass('d-none');
    } else {
        $("#schd_msg").removeClass('d-none');
    }
});

$("#isShortUrlSelected-1").click(function(){
    if($(this).is(':checked')) {
        $("#short_url").addClass('d-none');
    } else {     
        $("#short_url").removeClass('d-none');
    }
});

$("#isShortUrlSelected-0").click(function(){
    if($(this).is(':checked')) {
        $("#short_url").removeClass('d-none');    
    } else {
        $("#short_url").addClass('d-none');
    }
});
$("#splitFile-0").click(function(){
    if($(this).is(':checked')) {
        $("#scheduleMsgFieldsGroup").removeClass('d-none');
        $("#schd_msg_div").removeClass('d-none');
        $(".scheduleDateGroup").addClass('d-none');
    } else {
        $("#scheduleMsgFieldsGroup").addClass('d-none');
        $("#schd_msg_div").addClass('d-none');
        $(".scheduleDateGroup").removeClass('d-none');
    }
});
$("#splitFile-1").click(function(){
    if($(this).is(':checked')) {
        $("#scheduleMsgFieldsGroup").addClass('d-none');
        $("#schd_msg_div").addClass('d-none');
        $(".scheduleDateGroup").removeClass('d-none');
    } else {
        $("#scheduleMsgFieldsGroup").removeClass('d-none');
        $("#schd_msg_div").removeClass('d-none');
        $(".scheduleDateGroup").addClass('d-none');
    }
});

$("#addMoreRows").click(function() {
    $('.add_split_row').append(`<div class="form-group row split_row"><label for="scheduleMessage" class="col-md-4 col-form-label"></label><div class="col-md-6 split_row_child"><div class="row">
                <div class="col-3 pr-0"><input type="number" max="5000000" min="1" name="split_date" id="split_date" class="form-control" placeholder="From"></div>
                <div class="col-3 pr-0"><input type="number" max="5000000" min="1" name="split_date" id="split_date" class="form-control" placeholder="To"></div>
                <div class="col-3 pr-0"><select name="hour" id="hour" class="form-control hour"></select></div>
                <div class="col-1 pt-1">&nbsp;<b style="font-size: 20px;">:</b>&nbsp;</div>
                <div class="col-2 p-0"><select name="min" id="min" class="form-control min"></select></div></div>
            </div><div class="col-md-2">
            <button type="button" id="removeMoreRows" class="btn btn-danger float-right removeMoreRows"><i class="fa fa-minus" aria-hidden="true"></i>&ensp;Remove</button>
        </div>
    </div>`);
    load_hour()
    load_minute()
    $('.removeMoreRows').click(function(e){
        e.stopImmediatePropagation();
        if (confirm('Are you sure? Do you want to remove this?')) {
            $(this).closest('.split_row').remove();
        } else {
            return false;
        }
    })
    $(".datetimepicker" ).datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm:ss'
    }).attr('readonly', 'readonly');
});

$(document).ready(function() {
    load_hour()
    load_minute()
});

function load_minute() {
    $(".min").append("<option value=''>min</option>")
    for (let i = 0; i < 60; i++) {
        i = (i < 10 ? '0' : '') + i;
        $(".min").append("<option value='"+i+"'>"+i+"</option>");
        // console.log(i);
    }
}

function load_hour() {
    $(".hour").append("<option value=''>hour</option>")
    for (let i = 0; i < 24; i++) {
        i = (i < 10 ? '0' : '') + i;
        $(".hour").append("<option value='"+i+"'>"+i+"</option>");
        // console.log(i);
    }
}
