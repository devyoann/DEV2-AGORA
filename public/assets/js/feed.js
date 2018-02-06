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
        $(this).parent().next().slideDown();
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

// document.addEventListener("DOMContentLoaded", function() {
//     initialiseMediaPlayer();
// }, false);
//
// var mediaPlayer = document.getElementById('media-video');
//
// function initialiseMediaPlayer() {
//     mediaPlayer.controls = false;
// }
//
// function togglePlayPause() {
//     var btn = document.getElementById('play-pause-button');
//     if (mediaPlayer.paused || mediaPlayer.ended) {
//         btn.title = 'pause';
//         btn.innerHTML = 'pause';
//         btn.className = 'pause';
//         mediaPlayer.play();
//     } else {
//         btn.title = 'play';
//         btn.innerHTML = 'play';
//         btn.className = 'play';
//         mediaPlayer.pause();
//     }
// }
//
// function changeButtonType(btn, value) {
//     btn.title = value;
//     btn.innerHTML = value;
//     btn.className = value;
// }
//
// function toggleMute() {
//     var btn = document.getElementById('mute-button');
//     if (mediaPlayer.muted) {
//         changeButtonType(btn, 'mute');
//         mediaPlayer.muted = false;
//     } else {
//         changeButtonType(btn, 'unmute');
//         mediaPlayer.muted = true;
//     }
// }
//
// function updateProgressBar() {
//     var progressBar = document.getElementById('progress-bar');
//     var percentage = Math.floor((100 / mediaPlayer.duration) *
//         mediaPlayer.currentTime);
//     progressBar.value = percentage;
//     progressBar.innerHTML = percentage + '% played';
// }
//
// mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);