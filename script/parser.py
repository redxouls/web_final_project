import json, re

time = {}
loc = {}
day = {
    "一":"Mon", "二":"Tue", "三":"Wed",
    "四":"Thu", "五":"Fri", "六":"Sat",
    "日":"Sun",
}
with open("../course_info/cs_course.json", "r") as f :
    data = json.loads(f.read())
    for key in data:
        raw_str = data[key]["location_time"]
        replaced_str = raw_str.replace(")","(")
        sep_str = replaced_str.split("(")
        parsed_time = []
        loc = ""
        for i in sep_str:
            if (i == ""): 
                continue
            if (i[0] in day.keys()):
                parsed_time.append({day[i[0]]:i[1:]})
                continue
            loc = i
        if (parsed_time == []):
            print(data[key])
        print("parsed time: ", parsed_time)
        print("location: ", loc)
        del data[key]["location_time"]
        data[key]["location"] = loc
        data[key]["time"] = parsed_time

        #print(replaced_str.split("("))

with open("../course_info/parsed_cs_course.json", "w", encoding = "utf-8") as f:
    json.dump(data, f , ensure_ascii=False)
