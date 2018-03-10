$(document).ready(function() {

    $('.button_board').click(function() {
        $('#board').toggleClass('open');
        $('header , #feed').toggleClass('board_open');
    });
});