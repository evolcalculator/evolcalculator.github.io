#!/usr/bin/python
#coding:utf8

import urllib
import urllib2
import json
import ssl

# url = "http://39.107.72.254/lyzz/card/sort/"
url = "https://39.107.72.254:8443/lyzz/card/sort/"
word = {"type": 1, "person": "李泽言", "name": "1-2", "star": 3}
word = urllib.urlencode(word) #转换成url编码格式(字符串)

newurl = url + "?" + word

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"}

context = ssl._create_unverified_context()

request = urllib2.Request(newurl,headers = headers)

response = urllib2.urlopen(request, context=context)

print(response.read())

# result = json.loads(response.read())
# result["cards"] = []
# result["requests"] = []
# print(result)


# http://39.107.72.254/lyzz/card/sort/?type=2&person=李泽言&name=9-5&star=3