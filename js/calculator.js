var w_decision = 0, w_creativity = 0, w_appetency = 0, w_action = 0;
var max_cards = -1;
var tmp_character = "李泽言";
var star_num = 3;
var tmp_category = 0, category_dict = {"normal": 1, "hard": 2, "instance": 3, "arena": 4};
var tmp_name = "";
var score_list = [];

function loadName(category) {
    $('#stage-name').empty();
    var str = "";
    var prename = "";
    if (category == 'instance') 
        prename = "副本";
    if (category == 'hard')
        prename = "精英";
    for (var i in weights[category]) {
        str += "<option value =\""+weights[category][i]["name"]+"\">"+prename+weights[category][i]["name"]+"</option>";
    }
    $('#stage-name').append(str);

    $('#div-star').remove();
    if (category == 'arena') {
        $('#div-character').attr("colspan", 1);
        $('#div-character').after("<td id=\"div-star\"><select id=\"stage-star\"><option value=\"3\">3星</option><option value=\"4\">4星</option><option value=\"5\">5星</option></select></td>");
    }
    else {
        $('#div-character').attr("colspan", 2);
    }

    $('#stage-character').empty();
    if (category == 'instance' || category == 'arena') {
        $('#stage-character').append("<option value=\"许墨\">许墨</option><option value=\"白起\">白起</option><option value=\"李泽言\">李泽言</option><option value=\"周棋洛\">周棋洛</option>");
        tmp_character = "许墨";
    }
    else {
        $('#stage-character').append("<option value=\"许墨\">无</option>");
        tmp_character = "许墨";
    }

}

function loadWeight(category, name) {
    for (var i in weights[category]) {
        if (weights[category][i]["name"] == name) {
            // w_decision = parseFloat(weights[category][i]["decision"]);
            // w_creativity = parseFloat(weights[category][i]["creativity"]);
            // w_appetency = parseFloat(weights[category][i]["appetency"]);
            // w_action = parseFloat(weights[category][i]["action"]);
            // $('#stage-decision').text(weights[category][i]["decision"]);
            // $('#stage-creativity').text(weights[category][i]["creativity"]);
            // $('#stage-appetency').text(weights[category][i]["appetency"]);
            // $('#stage-action').text(weights[category][i]["action"]);
            goods = weights[category][i]["goods"];
            $('#stage-goods').text(weights[category][i]["goods"]);
            break;
        }
    }
    // calScore();
}

function sortNumber(a, b) {
    return b["score"] - a["score"];
}

function calScore() {
    var card_list = new Array();
    for (var i in mycards["user-defined"]) {
        card_list[i] = mycards["user-defined"][i];
        card_list[i]["score"] = w_decision*card_list[i]["decision"]+w_creativity*card_list[i]["creativity"]+w_appetency*card_list[i]["appetency"]+w_action*card_list[i]["action"];
        if (tmp_category == 4 && card_list[i]["character"] == tmp_character)
            card_list[i]["score"] *= 1 + (star_num - 2) * 0.1;
        if (tmp_category == 3 && card_list[i]["character"] != tmp_character)
            card_list[i]["score"] = 0;
    }
    for (var i in allcards) {
        if (isInArray(mycards["pre-defined"], allcards[i]["name"])) {
            var temp = new Object();
            temp["name"] = allcards[i]["name"];
            temp["character"] = allcards[i]["person"];
            temp["rarity"] = allcards[i]["degree"];
            temp["way"] = allcards[i]["achieving"];
            temp["score"] = allcards[i]["scores"];
            temp["id"] = allcards[i]["name"];
            card_list.push(temp);
        }
    }
    card_list.sort(sortNumber);
    score_list = card_list;
    showScore();
    // for (var i in card_list) {
    //     if (max_cards == -1 || i < max_cards) {
    //         str += "<tr id=\""+card_list[i]["id"]+"\"><td>"+card_list[i]["name"]+"</td><td>"+card_list[i]["rarity"]+"</td><td>"+card_list[i]["character"]+"</td><td>"+card_list[i]["way"]+"</td><td><b>"+Math.round(card_list[i]["score"])+"</b></td></tr>";
    //     }
    // }
    // $('#recommendation').append(str);
}

function showScore() {
    $('#recommendation').empty();
    var str = "";
    for (var i in score_list) {
        if (max_cards == -1 || i < max_cards) {
            str += "<tr id=\""+score_list[i]["id"]+"\"><td>"+score_list[i]["name"]+"</td><td>"+score_list[i]["rarity"]+"</td><td>"+score_list[i]["character"]+"</td><td>"+score_list[i]["way"]+"</td><td><b>"+Math.round(score_list[i]["score"])+"</b></td></tr>";
        }
    }
    $('#recommendation').append(str);
}

function requestData(){
    $.ajax({
        type: "GET",
        url: "http://39.107.72.254/lyzz/card/sort/",
        data: {type: tmp_category, name: encodeURI(tmp_name), person: encodeURI(tmp_character), star: star_num},
        dataType: "json",
        success: function(data){
            if ( data == null || data.length == 0 || data == "" || data.length == 1) {
                document.getElementById('result').innerHTML = "<div style='padding-left: 20px'>未找到该关卡：" + name + " " + "/" + person + "</div>";
                return;
            }
            w_decision = data["decision"];
            w_creativity = data["creativity"];
            w_appetency = data["affinity"];
            w_action = data["proactiveness"];
            $('#stage-goods').empty();
            $('#stage-goods').append(data["goods"]);
            $('#div-request').empty();
            var str2 = "";
            for (var i in data["requests"]) {
                str2 += "<tr><td>"+data["requests"][i]["request"]+"</td><td>"+data["requests"][i]["content"]+"</td></tr>"
            }
            $('#div-request').append(str2);
            allcards = data["cards"];
            calScore();
        }
    });
}


// function setMaxNum(num) {
//     max_cards = parseInt(num);
//     showScore();
// }

