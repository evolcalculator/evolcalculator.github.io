var bond_rarity = "all", bond_character = "all";
var mycard_rarity = "all", mycard_character = "all";
var max_cards = 10;
var max_bonds = 10;
var toggle_bonds = true, toggle_cards = true;

function showCards() {
    $('#card-table').empty();
    var str = "";
    var card_list = mycards["user-defined"];
    var cnt = 0, flag = false;
    for (var i in card_list) {
        if (cnt < max_cards) {
            if (cardFilter(card_list[i])) {
                str += "<tr id=\""+card_list[i]["id"]+"\"><td>"+card_list[i]["name"]+"</td><td>"+card_list[i]["rarity"]+"</td><td>"+card_list[i]["character"]+"</td><td>"+card_list[i]["decision"]+"/"+card_list[i]["creativity"]+"/"+card_list[i]["appetency"]+"/"+card_list[i]["action"]+"</td><td><a href=\"javascript:void(0);\" onclick=\"deleteCard('"+card_list[i]["id"]+"')\">删除</a></td></tr>";
                cnt ++;
            }
        }
        else {
            flag = true;
            break;
        }
    }
    for (var i in bonds) {
        if (cnt < max_cards) {
            if (isInArray(mycards["pre-defined"], bonds[i]["name"]) && cardFilter(bonds[i])) {
                str += "<tr id=\""+bonds[i]["name"]+"\"><td>"+bonds[i]["name"]+"</td><td>"+bonds[i]["rarity"]+"</td><td>"+bonds[i]["character"]+"</td><td></td><td><a href=\"javascript:void(0);\" onclick=\"deleteBond('"+bonds[i]["name"]+"')\">删除</a></td></tr>";
                cnt ++;
            }
        }
        else {
            flag = true;
            break;
        }
    }
    $('#card-table').append(str);
    if (max_cards > 10 || flag)
        addtoggleCards();
}


function cardFilter(card) {
    if (mycard_character != 'all' && card["character"] != mycard_character)
        return false;
    if (mycard_rarity != 'all' && card["rarity"] != mycard_rarity)
        return false;
    return true;
}

function bondFilter(bond) {
    if (isInArray(mycards["pre-defined"], bond["name"]))
        return false;
    if (bond_character != 'all' && bond["character"] != bond_character)
        return false;
    if (bond_rarity != 'all' && bond["rarity"] != bond_rarity)
        return false;
    return true;
}

function showBonds() {
    $('#bonds-table').empty();
    var str = "";
    var cnt = 0, flag = false;
    for (var i in bonds) {
        if (cnt < max_bonds) {
            if (bondFilter(bonds[i])) {
                str += "<tr id=\""+bonds[i]["name"]+"\"><td>"+bonds[i]["name"]+"</td><td>"+bonds[i]["rarity"]+"</td><td>"+bonds[i]["character"]+"</td><td>"+bonds[i]["way"]+"</td><td><a href=\"javascript:void(0);\" onclick=\"addBond('"+bonds[i]["name"]+"')\">添加</a></td></tr>";
                cnt ++;
            }
        }
        else {
            flag = true;
            break;
        }
    }
    $('#bonds-table').append(str);
    if (max_bonds > 10 || flag)
        addtoggleBonds();
}

function addtoggleBonds() {
    var str;
    if (toggle_bonds)
        str = "<tr><td colspan=\"9\"><a href=\"javascript:void(0);\" onclick=\"toggleBonds()\">展开▼</a></td></tr>";
    else
        str = "<tr><td colspan=\"9\"><a href=\"javascript:void(0);\" onclick=\"toggleBonds()\">收起▲</a></td></tr>";
    $('#bonds-table').append(str);
}

function toggleBonds() {
    toggle_bonds = !toggle_bonds;
    if (toggle_bonds)
        max_bonds = 10;
    else
        max_bonds = 10000;
    showBonds();
}

function addtoggleCards() {
    var str;
    if (toggle_cards)
        str = "<tr><td colspan=\"9\"><a href=\"javascript:void(0);\" onclick=\"toggleCards()\">展开▼</a></td></tr>";
    else
        str = "<tr><td colspan=\"9\"><a href=\"javascript:void(0);\" onclick=\"toggleCards()\">收起▲</a></td></tr>";
    $('#card-table').append(str);
}

function toggleCards() {
    toggle_cards = !toggle_cards;
    if (toggle_cards)
        max_cards = 10;
    else
        max_cards = 10000;
    showCards();
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
