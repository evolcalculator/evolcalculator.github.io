// $('.carousel').carousel({
//     interval: 5000
// })

$('#stage-category').change(function(){
    var p1 = $(this).children('option:selected').val();
    tmp_category = p1;
    loadName(p1);
    // var p2 = $('#stage-name').children('option:selected').val();
    // tmp_name = p2;
    // loadWeight(p1, p2);
})
// $('#stage-name').change(function(){
//     var p1 = $('#stage-category').children('option:selected').val();
//     var p2 = $(this).children('option:selected').val();
//     tmp_name = p2;
//     loadWeight(p1, p2);
// })
// $('#character').change(function(){
//     tmp_character = $(this).children('option:selected').val();
//     // calScore();
// })
// $('#star').change(function(){
//     star_num = $(this).children('option:selected').val();
//     // calScore();
// })
$('#btn-start').click(function(){
    tmp_name = $('#stage-name').children('option:selected').val();
    tmp_character = $('#stage-character').children('option:selected').val();
    if (document.getElementById('stage-star') != null)
        star_num = $('#stage-star').children('option:selected').val();
    requestData();
})

$('#num-cards').change(function(){
    max_cards = parseInt($(this).children('option:selected').val());
    showScore();
})

$('#select-rarity').change(function(){
    bond_rarity = $(this).children('option:selected').val();
    showBonds();
})

$('#select-character').change(function(){
    bond_character = $(this).children('option:selected').val();
    showBonds();
})

$('#mycard-rarity').change(function(){
    mycard_rarity = $(this).children('option:selected').val();
    showCards();
})

$('#mycard-character').change(function(){
    mycard_character = $(this).children('option:selected').val();
    showCards();
})

window.onload = function(){
    checkCookie();
    loadName("normal");
    // loadWeight("normal", "1-2");
    tmp_category = "normal";
    tmp_name = "1-2";
    showBonds();
    // cards = new Object();
    // cards["list"] = new Array();
}