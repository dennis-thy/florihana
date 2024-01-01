$(document).ready(function() {
    var images = $('.thumbnail').map(function() {
        return $(this).attr('src');
    }).get();

    var currentIndex = 0;

    // 初始設置
    $('#mainImage').attr('src', images[0]);
    $('.thumbnail').eq(0).addClass('active');

    // 縮略圖點擊事件
    $('.thumbnail').click(function() {
        var src = $(this).attr('src');
        $('#mainImage').attr('src', src);
        currentIndex = images.indexOf(src);

        $('.thumbnail').removeClass('active');
        $(this).addClass('active');
    });

    // 上一張圖片
    $('#prevImage').click(function() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            $('#mainImage').attr('src', images[currentIndex]);
            $('.thumbnail').removeClass('active').eq(currentIndex).addClass('active');
        }
    });

    // 下一張圖片
    $('#nextImage').click(function() {
        if (currentIndex < images.length - 1) {
            currentIndex += 1;
            $('#mainImage').attr('src', images[currentIndex]);
            $('.thumbnail').removeClass('active').eq(currentIndex).addClass('active');
        }
    });
});
