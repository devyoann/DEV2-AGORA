$(document).ready(function() {
    console.log('ok');

    $('.button_board').click(function() {
        $('#board').toggleClass('open');
        $('header , #feed').toggleClass('board_open');
    });
});