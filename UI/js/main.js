$('#get-started').on('click',function(){
    const imgLoc = $('#section').position().top;
    console.log(imgLoc);
    $('html, body').animate({
        scrollTop: imgLoc
    }, 900);
});