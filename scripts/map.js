$(document).ready(function () {
    $("#titleBar .menu-btn")
        .on("mouseover", function () {
            $('.queryWrapper').show();
            $("#titleBar").css("opacity", "1.0");
            //$(this).css("top", "0px");
        })
        .on("click", function () {
            $('.queryWrapper').hide();
            $("#titleBar").css("opacity", "0.6");
            //$(this).css("top", "-20%");
            var start = $('#datetimepicker1').data('datetimepicker').getDate();
            var end = $('#datetimepicker2').data('datetimepicker').getDate();
            console.log(start, end);
            getData("http://121.41.47.132/moumoon/backend.php");
        })
})

$(function () {
    $('#datetimepicker1').datetimepicker({
        language: 'en',
        format: 'MM/dd/yyyy HH:mm:ss PP',
        pick12HourFormat: false,
        pickSeconds: false
    });
    $('#datetimepicker2').datetimepicker({
        language: 'en',
        format: 'MM/dd/yyyy HH:mm:ss PP',
        pick12HourFormat: false,
        pickSeconds: false
    });
});