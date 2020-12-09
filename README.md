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

### /api/user

```javascript
method: GET;
path: "/api/user";
querystring: "?username=xxx&mode=xxx";
// acepted mode now: "simple_list", "timeline_list"
// accepted user: "CJF"
example: "http://localhost:3000/api/user?username=CJF&mode=simple_list";
```

```json
sample response:
mode: "simple_list"
[
    {
        "serial_number": "01001",
        "title": " 大學國文：文學鑑賞與寫作（一）"
    },
    {
        "serial_number": "44345",
        "title": " 微積分2"
    },
    {
        "serial_number": "97007",
        "title": " 健康體適能"
    },
    {
        "serial_number": "97045",
        "title": " 健康體適能"
    },
    {
        "serial_number": "97110",
        "title": " 羽球初級"
    }
]
mode: "timeline_list"
{
    "Mon": {
        "1": [
            {
                "serial_number": "97007",
                "title": " 健康體適能"
            },
            {
                "serial_number": "97045",
                "title": " 健康體適能"
            },
            {
                "serial_number": "97110",
                "title": " 羽球初級"
            }
        ],
        "2": [
            {
                "serial_number": "97007",
                "title": " 健康體適能"
            },
            {
                "serial_number": "97045",
                "title": " 健康體適能"
            },
            {
                "serial_number": "97110",
                "title": " 羽球初級"
            }
        ],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "10": [
            {
                "serial_number": "44345",
                "title": " 微積分2"
            }
        ],
        "A": [],
        "B": [],
        "C": [],
        "D": []
    },
    "Tue": {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "10": [],
        "A": [],
        "B": [],
        "C": [],
        "D": []
    },
    "Wed": {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [
            {
                "serial_number": "44345",
                "title": " 微積分2"
            }
        ],
        "7": [
            {
                "serial_number": "44345",
                "title": " 微積分2"
            }
        ],
        "8": [],
        "9": [],
        "10": [],
        "A": [],
        "B": [],
        "C": [],
        "D": []
    },
    "Thu": {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "10": [],
        "A": [],
        "B": [],
        "C": [],
        "D": []
    },
    "Fri": {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [
            {
                "serial_number": "44345",
                "title": " 微積分2"
            }
        ],
        "7": [
            {
                "serial_number": "01001",
                "title": " 大學國文：文學鑑賞與寫作（一）"
            },
            {
                "serial_number": "44345",
                "title": " 微積分2"
            }
        ],
        "8": [
            {
                "serial_number": "01001",
                "title": " 大學國文：文學鑑賞與寫作（一）"
            }
        ],
        "9": [
            {
                "serial_number": "01001",
                "title": " 大學國文：文學鑑賞與寫作（一）"
            }
        ],
        "10": [],
        "A": [],
        "B": [],
        "C": [],
        "D": []
    },
    "Sat": {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "10": [],
        "A": [],
        "B": [],
        "C": [],
        "D": []
    }
}

```

### /api/course

```javasript
method: GET
path: "/api/course"
querystring: "?serial_number=xxxxx" (string required)
example: "http://localhost:3000/api/course?serial_number=01001"
```

```json
sample response:

{
    "serial_number": "01001",
    "department": " ",
    "number": "CHIN8012",
    "class": "01",
    "title": " 大學國文：文學鑑賞與寫作（一）",
    "credits": "3.0",
    "id": "10180110",
    "full/half": "半年",
    "required": "必修",
    "teacher": "李文鈺",
    "rule": "3",
    "stu_limit": "35",
    "limit": "本校修課人數上限：35人",
    "note": " ",
    "location": "普403",
    "time": [
        {
            "Fri": [
                "7",
                "8",
                "9"
            ]
        }
    ],
    "week": []
}
```

get /api/comment 流水號

get /api/result/:course 流水號

// post /api/vote

get /api/history 流水號
