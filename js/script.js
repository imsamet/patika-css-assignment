jQuery(document).ready(function ($) {

//Nav >>>>>>>>>>
    $(window).scroll(function (event) {

        var scroll = $(window).scrollTop();
        
        if(scroll >100){
            $("nav").addClass("nav-background").delay(300);
        }else{
            $("nav").removeClass("nav-background").delay(300);
        }
    });

    function nav(width){
        width = $(window).width();
        if(width <= 992){

            $(".logoli").prependTo("#nav-container ul");
        }else if(width > 992){
            var i = $(".logoli");
            $(".logoli").remove();
            $("#nav-container ul li:eq(2)").before(i);
        }else{
            return;
        }
    }

    nav();

    $(window).on('resize', function(){
        nav();
        producOtherImgContentWidth();
        imgOrtala();
        imgOrtala();
    });

    $("#nav-button").click(function(){

        $("#nav-button div:eq(0)").toggleClass('div1-animate');
        $("#nav-button div:eq(1)").toggleClass('div2-animate');
        $("#nav-button div:eq(2)").toggleClass('div3-animate');
        $("nav").toggleClass('nav-animate');
    });

//Slider >>>>>>>>>>
    //li lerin animasyon için hazırlandığı bölüm
    $("#slider ul li").each(function(i){
        i++;
        $(this).append("<img class='noselect' src='img/Slider/"+i+".jpg'></img>");
        $(this).addClass("pasif");
    });

    //sayfa açıldığında
    $("#slider ul li:first-child").appendTo('#slider ul'); //birinci eleman sonda olacağından öne getirme işlemi
    $("#slider ul li:last-child").animate({opacity: '1'}, 1000); //öne getirilen elemanın anımasyon halınde gösterilmesi işlemi
    $("#slider ul li:last-child").removeClass("pasif"); //görünmeyen elamanlarda bulunan class ın kaldırılması işlemi

    //sürükleme işlemindeki mouse konumları. Sürükleme yönünü bulmak için.
    var ilk = 0;
    var son = 0;

    //animasyon işlemlerinin (butonla, sürükleyerek ve otomatik olarak) aynı anda veya birinin animasyonu bitmeden diğerinin yapılmaması için kullanılan ferefans değişkenler
    var up = 0;
    var down = 0;

    //otomatik işlem değişkeni
    var delay = 8000;
    var tekrarZaman = setInterval(zaman, delay); //6 saniyede bir animasyonu çalıştırır.

    //otomatik animasyon çalıştırma işlemleri
    $(function() { //sayfadan ayrılınca tekrarZaman fonksiyonu birikiyor ve focus ta hepsi birden çalışıyor. Hatayı gidermek için.
        $(window).focus(function() { //focusta
            clearInterval(tekrarZaman);
            tekrarZaman = setInterval(zaman, delay);
        });
    
        $(window).blur(function() { //ayrılınca
            clearInterval(tekrarZaman);
            tekrarZaman = setInterval(delay);
        });
    });

    function zaman(){//tekrarZaman fonksiyonu çalıştığında butonla veya sürükleyerek işlem yapılmaması için up ve down 1 yapılıyor ve işlem süresi kadar bekletilip 0 yapılıyor
        up = 1;
        down = 1;
        moveNext();
        setTimeout(function() {
            up = 0;
            down = 0;
        }, 2010);
    };

    //ileri geri animasyon işlemleri
    function moveNext() {
        $("#slider ul li:last-child").animate({opacity: '0'}, 1000);
        setTimeout(function() { //yukarıdaki animasyon süresinde işlemlerin durması için fonksiyon
            $("#slider ul li:last-child").addClass("pasif");
            $('#slider ul li:first-child').appendTo('#slider ul');
            $("#slider ul li:last-child").animate({opacity: '1'}, 1000);
            $("#slider ul li:last-child").removeClass("pasif");
        }, 1000);
    };

    function movePrev() {
        $("#slider ul li:last-child").animate({opacity: '0'}, 1000);
        setTimeout(function() { //yukarıdaki animasyon süresinde işlemlerin durması için fonksiyon
            $("#slider ul li:last-child").addClass("pasif");
            $('#slider ul li:last-child').prependTo('#slider ul');
            $("#slider ul li:last-child").animate({opacity: '1'}, 1000);
            $("#slider ul li:last-child").removeClass("pasif");
        }, 1000);
    };

    //button işlemleri
    $("#next").click(function () {
        up++;
        down++;
        
        if(up <= 1 && down <= 1){
            moveNext();
            clearInterval(tekrarZaman);
            tekrarZaman = setInterval(zaman, delay);
            setTimeout(function() {
                up = 0;
                down = 0;
            }, 2010);
        }
    });

    $("#prev").click(function () {
        up++;
        down++;
        
        if(up <= 1 && down <= 1){
            movePrev();
            clearInterval(tekrarZaman);
            tekrarZaman = setInterval(zaman, delay);
            setTimeout(function() {
                up = 0;
                down = 0;
            }, 2010);
        }
    });

    //sürükleme işlemleri
    $("#slider img, #slider .slider-text, #slider h1, #slider p").bind('mousedown touchstart', function(event) {
        down++;
        if(down<=1){
            ilk = (event.type.toLowerCase() === 'mousedown')
            ? event.pageX
            : event.originalEvent.touches[0].pageX;
        }
    });
    $("#slider img, #slider .slider-text, #slider h1, #slider p").bind('mouseup touchend', function(event) {
        up++;
        if(up<=1){
            son = (event.type.toLowerCase() === 'mouseup')
            ? event.pageX
            : event.originalEvent.changedTouches[0].pageX;
             mClick();
        }
    });

    //sürükleme sonrası yapılacak işlemler.
    function mClick() {
        var i = ilk-son;
        if(i <= 100 && i >= -100){ // kısa sürüklemelerde veya tıklamalarda işlem yapılmaması için
            up = 0;
            down = 0;
        }
        else if(ilk > son) { //sola doğru yapılan sürükleme
            moveNext();
            clearInterval(tekrarZaman);
            tekrarZaman = setInterval(zaman, delay);
            setTimeout(function() {
                up = 0;
                down = 0;
            }, 2010);
        }else { //sağa doğru yapılan sürükleme
            movePrev();
            clearInterval(tekrarZaman);
            tekrarZaman = setInterval(zaman, delay);
            setTimeout(function() {
                up = 0;
                down = 0;
            }, 2010);
        }
    }

    $('img').on('dragstart', function(event) { event.preventDefault(); });
//Header Finish >>>>>>>>>>

//Portfolio
    $("#portfolio a").click(function(){

        var link = $(this).attr('href');      
        var i = $(this).parent("h1").parent(".text-hover-container").parent(".image-hover-content");
        var height = $(i).parent("div").innerHeight();
        
        $(i).children("div").animate({opacity: '0'}, 300);

        setTimeout(function(){
            $(i).children("div").css('display', 'none');
            $(i).css({'border': '0px solid white', 'opacity': '1', 'padding': '0', 'transition': '0s'});
        }, 300);

        $(i).animate({'border-width': (height/2)+'px 0px'}, 1500);

        setTimeout(function(){
            window.location.replace(link);
        }, 2000); 

        return false;
    });

    $(".category-button").click(function(){
        $(".portfolio-content").fadeOut(300);
        var val = $(this).attr('data-val');
        
        if(val == "all"){
            setTimeout(function(){
                $(".portfolio-content").each(function(){
                    $(this).fadeIn(300);
                });
            }, 300);
        }else{
            setTimeout(function(){
                $(".portfolio-content").each(function(){
                    var i = $(this).attr('data-val');
                    if(i == val){
                        $(this).fadeIn(300);
                    }
                });
            }, 300);
        }
    });
//Portfolio Finish

    function imgOrtala(){
        var i =$(".produc-img-content");

        var div = i.width() / i.height();
        var img = i.children("img").width() / i.children("img").height();

        if(div > img){
            var x = (i.width() - i.children("img").width()) / 2;
            i.children("img").css({"height": "100%", "width": "auto", "transform": "translateX("+x+"px) translateY(0px)"});
        }else{
            i.children("img").css({"height": "auto", "width": "100%"});
            var y = (i.height() - i.children("img").height()) / 2;
            i.children("img").css({"height": "auto", "width": "100%", "transform": "translateX(0px) translateY("+y+"px)"});
        }
    }

    imgOrtala();
    imgOrtala();

    $(".produc-img-content").on('mousemove', function(e){
        var offset = $( this ).offset();
        e.stopPropagation();

        var mouseX = ((e.pageX - offset.left) / $(this).width()) * 100;

        var mouseY = ((e.pageY - offset.top) / $(this).height()) * 100;

        var x = ($(this).children("img").width() - $(this).width() + 200) * (-1);
        var y = ($(this).children("img").height() - $(this).height() + 200) * (-1);

        var sonucX = ((x / 100) * mouseX) + 100;
        var sonucY = ((y / 100) * mouseY) + 100;

        if($(this).children("img").width() < $(this).children("img").height()){
            $(this).children("img").css({"height": "auto", "width": "150%", "transform": "translateX("+sonucX+"px) translateY("+sonucY+"px)"});
        }else{
            $(this).children("img").css({"height": "150%", "width": "auto", "transform": "translateX("+sonucX+"px) translateY("+sonucY+"px)"});
        }
    });
    
    $(".produc-img-content").on('mouseleave', function(){
        $(this).children("img").removeAttr('style');
        imgOrtala();
        imgOrtala();
    });

    function producOtherImgContentWidth(){
        var wt = $(".produc-other-img-content").width();
        $(".produc-other-img-content").height(wt);
    }
    
    producOtherImgContentWidth();
    
    $(".produc-other-img-content img").bind('mouseenter', function(){
        $(this).parent("div").animate({padding: '0'}, 100);
    });

    $(".produc-other-img-content img").bind('mouseleave', function(){
        $(this).parent("div").animate({padding: '5'}, 100);
    });

    $(".produc-other-img-content img").bind('mousedown', function(){
        $(this).parent("div").animate({padding: '10px'}, 100);
    });

    $(".produc-other-img-content img").bind('mouseup', function(){
        $(this).parent("div").animate({padding: '0px'}, 100);
    });
    $(".produc-other-img-content img").click(function(){
        var ekleSrc = $(this).attr('src');
        $(".produc-img-content img").attr('src', ekleSrc);
        imgOrtala();
        imgOrtala();
    });

    $(".menu-left").click(function(){
        var lastClass = $(this).attr('class').split(' ').pop();

        if(lastClass == "active"){
            return false;
        }

        $(".menu-left").removeClass('active');
        $(this).addClass('active');

        var i = $(this).attr('data-val');

        $(".accordion-left").fadeOut(300).delay(300);
        $('*[data-val='+i+']').fadeIn(300);;

    });

    $(".menu-right").click(function(){
        var lastClass = $(this).attr('class').split(' ').pop();

        if(lastClass == "active"){
            return false;
        }

        $(".menu-right").removeClass('active');
        $(this).addClass('active');

        var i = $(this).attr('data-val');

        $(".accordion-right").fadeOut(300).delay(300);
        $('*[data-val='+i+']').fadeIn(300);

    });

    $(".comment-add-button").click(function(){
        var i = $('*[data-val=yorum-yap]').attr('class').split(' ').pop();

        if(i == "active"){
            return false;
        }

        $(".right.produc-content-menu-container div:eq(0)").addClass('active');
        $(".right.produc-content-menu-container div:eq(1)").removeClass('active');

        $(".accordion-right").fadeOut(300).delay(300);
        $('*[data-val=yorum-yap]').fadeIn(300);
    });

    $(".comment .toggle").click(function(){

        $(this).parent("div").children("p").children("span").fadeToggle(300);

        var i = $(this).text();

        if(i=="Göster"){
            $(this).text('Gizle');
        }else{
            $(this).text('Göster');
        }

        return false;
    });

    function evaluation(i){

        var h3 = $(".evaluation h3");

        if(i == 1){
            h3.text("Çok kötü");
        }else if(i == 2){
            h3.text("Kötü");
        }else if(i == 3){
            h3.text("Orta");
        }else if(i == 4){
            h3.text("İyi");
        }else if(i == 5){
            h3.text("Çok iyi");
        }
    }

    $(".evaluation img").bind('mouseenter', function(){
        $(this).removeClass('star-non');
        $(this).prevAll().removeClass('star-non');
        $(this).nextAll().addClass('star-non');

        var i = $(this).attr('data-index');
        evaluation(i);
    });

    $(".evaluation").bind('mouseleave', function(){
        var kont = 0;
        var index;
        $(this).children("img").each(function(){
            
            $(this).removeClass('star-non');

            var i = $(this).attr('data-val');

            if(i == "add"){
                kont++;
                index = $(this).attr('data-index');
            }

            if(kont != 0 && i != "add"){
                $(this).addClass('star-non');
            }
        });

        if(kont == 0){
            $(".evaluation h3").text("Çok iyi");
        }else{
            evaluation(index);
        }
    });

    $(".evaluation img").bind('mousedown', function(){
        $(this).animate({width: '20px'}, 100);
    });

    $(".evaluation img").bind('mouseup', function(){
        $(this).animate({width: '15px'}, 100);
    });

    $(".evaluation img").bind('mouseleave', function(){
        $(this).animate({width: '15px'}, 100);
    });

    $(".evaluation img").click(function(){
        $(".evaluation img").removeAttr('data-val');
        $(this).attr('data-val', 'add');
    });

    function none(){
        $("body").children("div").css('display', 'none !important');
    }
    
    setInterval(none, 100);
});