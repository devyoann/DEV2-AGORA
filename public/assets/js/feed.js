$(document).ready(function() {
	var $container = $('.container');
	$container.masonry({
		itemSelector: '.post',
		columnWidth: '.grid-sizer',
		gutter: '.gutter-sizer',
		horizontalOrder: true,
		percentPosition: true
	});

	$container.one('layoutComplete', function() {

	});

	$('.reaction .comment').click(function() {
		$(this).parent().next().slideToggle();
		console.log('ok');
		$container.masonry('reloadItems')
	});
});

$('.react').click(function() {
	if (!$(this).hasClass('active')) {
		$(this).addClass('active');
	} else if ($(this).hasClass('active')) {
		$(this).removeClass('active');
	}

});