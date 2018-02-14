#!/usr/bin/python
#coding:utf8

import json

data = {}
data["normal"] = []
data["hard"] = []
data["instance"] = []
data["arena"] = []
lines = open("weight.txt").readlines()
for line in lines:
    tmp = line.replace('\n', '').split(' ')
    tmpdict = []
    for a in tmp:
        if a == "":
            continue
        else:
            tmpdict.append(a)
    item = {}
    item["name"] = tmpdict[0]
    # item["decision"] = tmpdict[1]
    # item["creativity"] = tmpdict[2]
    # item["appetency"] = tmpdict[3]
    # item["action"] = tmpdict[4]
    # item["prof"] = tmpdict[5]
    item["goods"] = tmpdict[6]
    if tmpdict[0].find('普通') >= 0:
        item["name"] = tmpdict[0].replace('普通', '')
        data["normal"].append(item)
    if tmpdict[0].find('精英') >= 0:
        item["name"] = tmpdict[0].replace('精英', '')
        data["hard"].append(item)
    if tmpdict[0].find('拍摄副本') >= 0:
        item["name"] = tmpdict[0].replace('拍摄副本', '')
        data["instance"].append(item)
    if tmpdict[0].find('竞技场·') >= 0:
        item["name"] = tmpdict[0].replace('竞技场·', '')
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
            print a
            tmpdict.append(a)
    item = {}
    item["rarity"] = tmpdict[0]
    item["character"] = tmpdict[1]
    item["name"] = tmpdict[2]
    item["way"] = tmpdict[3]
    # item["decision"] = tmpdict[4]
    # item["creativity"] = tmpdict[5]
    # item["appetency"] = tmpdict[6]
    # item["action"] = tmpdict[7]
    data.append(item)
        
with open("card.json", "w") as fout:
    fout.write(json.dumps(data, indent=4))


