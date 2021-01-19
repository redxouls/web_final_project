import requests, json
import random

with open("./accountInfo.json","r") as f:
    accountInfo = json.load(f)

# for key in accountInfo:
#     print(key, ": ",accountInfo[key][0])


headers = {
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
    'credentials': 'include',
    'content-type': 'application/x-www-form-urlencoded',
    'Accept': '*/*',
    'Sec-GPC': '1',
    'Origin': 'http://127.0.0.1:3000',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'http://127.0.0.1:3000/',
    'Accept-Language': 'en-US,en;q=0.9',
}

to_follow = [84599, 34256, 26732, 60240, 79134, 74023, 12001, 73087, 70941]

for username in accountInfo:
    password = accountInfo[username][0]
    with requests.Session() as s:

        # Login

        data = {
        'username': username,
        'password': password
        }

        s = requests.Session()
        s.post('http://127.0.0.1:3000/api/login', headers=headers, data=data)
        
        # Get course informations

        course_list_raw = s.get("http://127.0.0.1:3000/api/user/list", headers=headers)
        course_list = [course["serial_number"] for course in json.loads(course_list_raw.text)]
        print(course_list)

        serial_number_to_vote = "84599"
        question = ["time", "priority", "people"]
        option = {
            "time":["Wed 3", "Wed 4"],
            "priority":["本系優先", "高年級優先", "抽籤"],
            "people":["1~10", "11~20", "21~30", "31~40", "40~"] 
        }
        question_to_vote = question[random.randint(0, 2)]
        option_to_vote = option[question_to_vote][random.randint(0,len(option[question_to_vote])-1)]
        to_vote = {
            "serial_number": serial_number_to_vote,
            "question": question_to_vote,
            "option": option_to_vote
        }
        vote_response = s.post("http://127.0.0.1:3000/api/vote", headers=headers, data=to_vote)
        print(vote_response.text)


        # Adding course from to_follow 

        # for serial_number in to_follow:
        #     add_course_response = s.post("http://127.0.0.1:3000/api/user", headers=headers, data ={"serial_number":serial_number})
        #     print(add_course_response.text)            
        

    # break