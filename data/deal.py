#!/usr/bin/python
#coding:utf8

import json

lines = open("weight.csv").readlines()
data = {}
data["normal"] = []
data["hard"] = []
data["instance"] = []
data["arena"] = []
for line in lines:
    tmp = line.replace("\n", "").split(",")
    item = {}
    item["name"] = tmp[0]
    item["decision"] = tmp[1]
    item["creativity"] = tmp[2]
    item["appetency"] = tmp[3]
    item["action"] = tmp[4]
    if tmp[0].find('-') > 0:
        if tmp[0].find('J') == 0:
            data["hard"].append(item)
        else:
            data["normal"].append(item)
    else:
        data["arena"].append(item)
with open("weight.json", "w") as fout:
    fout.write(json.dumps(data))