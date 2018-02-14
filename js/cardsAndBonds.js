var mycards;
var allcards = [];

function setCookie(c_name, value, expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name)
{
  if (document.cookie.length > 0)
  {
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1)
      { 
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) 
            c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start,c_end));
      } 
  }
  return ""
}

function checkCookie() {
    var cardData = getCookie('cardData');
    if (cardData != null && cardData != "") {
        mycards = eval('(' + cardData + ')');
        if (!mycards.hasOwnProperty("user-defined")) {
            mycards = new Object();
            mycards["user-defined"] = new Array();
            mycards["pre-defined"] = new Array();
        }
        else
            showCards();
    }
    else {
        mycards = new Object();
        mycards["user-defined"] = new Array();
        mycards["pre-defined"] = new Array();
    }
}

function importCard() {
    var data = $('#import-text').val();
    try {
        mycards = JSON.parse(data);
        if (mycards.hasOwnProperty("user-defined") && mycards.hasOwnProperty("pre-defined")) {
            alert("导入成功!");
            $('#import-text').val('');
            setCookie('cardData', data, 100);
            showCards();
        }
        else {
            alert("请确认导入数据和之前导出时的格式一致哦!");
            $('#import-text').val('');
        }
    }
    catch(err) {
        alert("请输入符合JSON格式的数据!");
        $('#import-text').val('');
    }
}

function exportCard() {
    $('#import-text').val('');
    var str = JSON.stringify(mycards);
    $('#import-text').val(str);
}

function deleteCard(id) {
    for (var i in mycards["user-defined"]) {
        if (mycards["user-defined"][i]["id"] == id) {
            mycards["user-defined"].splice(i, 1);
            // alert("删除成功!");
            break;
        }
    }
    setCookie('cardData', JSON.stringify(mycards), 100);
    showCards();
}

function addCard() {
    var name = $('#card-name').val();
    var rarity = $('#card-rarity').val();
    var character = $('#card-character').val();
    var decision = parseInt('0'+$('#card-decision').val());
    var creativity = parseInt('0'+$('#card-creativity').val());
    var appetency = parseInt('0'+$('#card-appetency').val());
    var action = parseInt('0'+$('#card-action').val());
    var evol_card = new Object();
    if (name == "" || name == null) {
        alert("请输入完整的羁绊信息!");
        return;
    }
    evol_card["name"] = name;
    evol_card["rarity"] = rarity;
    evol_card["character"] = character;
    evol_card["decision"] = decision;
    evol_card["creativity"] = creativity;
    evol_card["appetency"] = appetency;
    evol_card["action"] = action;
    evol_card["way"] = "自定义";
    evol_card["id"] = (new Date()).valueOf();
    alert("羁绊: "+name+" 添加成功!");
    mycards["user-defined"].push(evol_card);
    setCookie('cardData', JSON.stringify(mycards), 100);
    showCards();
    $('#card-name').val('');
    $('#card-decision').val('');
    $('#card-creativity').val('');
    $('#card-appetency').val('');
    $('#card-action').val('');
}

function isInArray(arr,value){
    var index = $.inArray(value,arr);
    if(index >= 0)
        return true;
    return false;
}

function addBond(name) {
    mycards["pre-defined"].push(name);
    setCookie('cardData', JSON.stringify(mycards), 100);
    showBonds();
    showCards();
}

function deleteBond(name) {
    mycards["pre-defined"].splice($.inArray(name, mycards["pre-defined"]), 1);
    setCookie('cardData', JSON.stringify(mycards), 100);
    showBonds();
    showCards();
}

function addAll() {
    for (var i in bonds) {
        if (!isInArray(mycards["pre-defined"], bonds[i]["name"])) {
            mycards["pre-defined"].push(bonds[i]["name"]);
        }
    }
    setCookie('cardData', JSON.stringify(mycards), 100);
    showBonds();
    showCards();
}

function deleteAll() {
    mycards = new Object();
    mycards["user-defined"] = new Array();
    mycards["pre-defined"] = new Array();
    setCookie('cardData', JSON.stringify(mycards), 100);
    showCards();
    showBonds();
}

