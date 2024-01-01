$(() => {
    let params = new URLSearchParams(window.location.search);
    let tabValue = params.get('tab');
    switch (tabValue) {
        case '1':
            $('.tab-1').removeClass('d-none');
            $('.sideBar a').first().addClass('sideBar-active');
            $('.dropdownbtn span').text('品牌會客室');
            break;
        case '2':
            $('.tab-2').removeClass('d-none');
            $('.sideBar a').eq(1).addClass('sideBar-active');
            $('.dropdownbtn span').text('購物說明');
            break;
        case '3':
            $('.tab-3').removeClass('d-none');
            $('.sideBar a').eq(2).addClass('sideBar-active');
            $('.dropdownbtn span').text('會員說明');
            break;
        case '4':
            $('.tab-4').removeClass('d-none');
            $('.sideBar a').eq(3).addClass('sideBar-active');
            $('.dropdownbtn span').text('產品相關');
            break;
        default:
            $('.tab-1').removeClass('d-none');
            $('.sideBar a').first().addClass('sideBar-active');
            $('.dropdownbtn span').text('品牌會客室');
            console.log('default');
            break;
    }

})