#!/usr/bin/python
#coding:utf8

import json

data = {}
data["normal"] = []
data["hard"] = []
data["instance"] = []
data["arena"] = []
person = {0: "李泽言", 1: "许墨", 2: "白起", 3: "周棋洛"}
lines = open("weight.txt").readlines()
for line in lines:
    tmp = line.replace('\n', '').split(' ')
    tmpdict = []
    for a in tmp:
        if a == "":
            continue
        else:
            tmpdict.append(a)
    print tmpdict[0]

    item = {}
    item["name"] = tmpdict[0]
    item["decision"] = tmpdict[1]
    item["creativity"] = tmpdict[2]
    item["appetency"] = tmpdict[3]
    item["action"] = tmpdict[4]
    item["prof"] = tmpdict[5]


    if tmpdict[0].find('拍摄副本') >= 0:
        item["name"] = tmpdict[0].replace('拍摄副本', '')
        item["list"] = {}
        for i in range(4):
            a = {}
            a["goods"] = tmpdict[i*5+6]
            # a["character"] = person[i]
            a["requests"] = []
            for j in range(2):
                request = {}
                request["request"] = tmpdict[i*5+6+2*j+1]
                request["content"] = tmpdict[i*5+6+2*j+2]
                a["requests"].append(request)
            item["list"][person[i]] = a
        data["instance"].append(item)

    if tmpdict[0].find('普通') >= 0:
        item["name"] = tmpdict[0].replace('普通', '')
        item["goods"] = tmpdict[6]
        item["requests"] = []
        for i in range(7, len(tmpdict), 2):
            request = {}
            request["request"] = tmpdict[i]
            request["content"] = tmpdict[i+1]
            if request["content"] != "-":
                item["requests"].append(request)
        data["normal"].append(item)

    if tmpdict[0].find('精英') >= 0:
        item["name"] = tmpdict[0].replace('精英', '')
        item["goods"] = tmpdict[6]
        item["requests"] = []
        for i in range(7, len(tmpdict), 2):
            request = {}
            request["request"] = tmpdict[i]
            request["content"] = tmpdict[i+1]
            if request["content"] != "-":
                item["requests"].append(request)
        data["hard"].append(item)

    if tmpdict[0].find('竞技场·') >= 0:
        item["name"] = tmpdict[0].replace('竞技场·', '')
        item["goods"] = "-"
        item["requests"] = []
        data["arena"].append(item)
    
with open("weight.json", "w") as fout:
    fout.write(json.dumps(data, indent=4))


data = []
lines = open("card.txt").readlines()
for line in lines:
    tmp = line.replace('\n', '').split(' ')
    tmpdict = []
    for a in tmp:
        if a == "":
            continue
        else:
            # print a
            tmpdict.append(a)
    item = {}
    item["rarity"] = tmpdict[0]
    item["character"] = tmpdict[1]
    item["name"] = tmpdict[2]
    item["way"] = tmpdict[3]
    item["decision"] = tmpdict[4]
    item["creativity"] = tmpdict[5]
    item["appetency"] = tmpdict[6]
    item["action"] = tmpdict[7]
    data.append(item)
        
with open("card.json", "w") as fout:
    fout.write(json.dumps(data, indent=4))


