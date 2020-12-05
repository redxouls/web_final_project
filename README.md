# Web Programming Final Project

One Paragraph of project description goes here

## Getting Started

### Prerequisites

What things you need to install the software and how to install them

```
node, npm
```

### Installing

A step by step series of examples that tell you how to get a development env running

After first clone:

```
npm install
```

## Developing

First, run the following command in the first terminal to auto build.

```
npm run watch
```

Secondly, run the following command in a new terminal to start the server.

```
npm run start
```

## Api route

```
get /api/user username

get /api/course 流水號

get /api/comment 流水號

get /api/result/:course 流水號

// post /api/vote

get /api/history 流水號
```

## File format for references

```
Time table

0 7:10~8:00     1 8:10~9:00
2 9:10~10:00    3 10:20~11:10
4 11:20~12:10   5 12:20~13:10
6 13:20~14:10   7 14:20~15:10
8 15:30~16:20   9 16:30~17:20
10 17:30~18:20  A 18:25~19:15
B 19:20~20:10   C 20:15~21:05
D 21:10~22:00
```

```json
/course_info/parsed_cs_course.json

{
  "06213": {
    "serial_number": "06213",
    "department": "資工系",
    "number": "MATH1201",
    "class": "03",
    "title": "微積分甲上",
    "credits": "4.0",
    "id": "201 101A1",
    "full/half": "全年",
    "required": "必修",
    "teacher": "劉瓊如",
    "rule": "3",
    "stu_limit": "130",
    "limit": "限本系所學生(含輔系、雙修生),本校修課人數上限：130人",
    "note": "統一教學.大二以上限20人.一10為實習課.",
    "location": "新102",
    "time": [{ "Mon": "10" }, { "Wed": "6,7" }, { "Fri": "6,7" }]
  }
}
```

```json
/user_info/user_info.json

{
  "CJF": {
    "username": "CJF",
    "password": "lightening_five_whips",
    "following": ["06213", "53399"]
  }
}
```
