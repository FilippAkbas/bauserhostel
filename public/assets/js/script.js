let hotelListBtn = document.querySelector('#hostel-list');

hotelListBtn.addEventListener('click', function(){ 
    this.classList.toggle('active');
});

$(".city-menu a").click(function(e) {
    e.preventDefault();
    $(".city-menu a").removeClass("active");
    $(this).addClass("active");
    var tab = $(this).attr("href");
    $(".city-box").not(tab).css({
        display: "none",
    });
    $(tab).fadeIn(400);
});