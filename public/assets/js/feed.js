$(document).ready(function() {
    $('.container').masonry({
        itemSelector: '.post',
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer',
        horizontalOrder: true,
        percentPosition: true,
    });
});