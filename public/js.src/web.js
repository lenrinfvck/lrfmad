$(document).ready(function($) {
    $(".proBox img").lazyload({
        threshold: 100,
        effect : "fadeIn"
    });   
});