import pymongo
from pymongo import MongoClient
import pprint
import secrets
import string
import names
import bcrypt
import json

client = MongoClient()
client = MongoClient("mongodb+srv://CJF:lightening_five_whips@courses.kjgaj.mongodb.net/courses_users?retryWrites=true&w=majority")
db = client.courses_users
accounts = db.accounts


accounts_for_test = {} 
new_account = {"username":"Lisa" , "password": "lightening_five_whips"}
new_acount_id = accounts.insert_one(new_account).inserted_id

for i in range(50):
    if (i==0):
        username = "Lisa"
        password = "lightening_five_whips"
    elif (i==1):
        username = "TA"
        password = "i_like_web"
    else:
        alphabet = string.ascii_letters + string.digits
        password = ''.join(secrets.choice(alphabet) for i in range(20))  # for a 20-character password
        username = names.get_full_name()
        
    

    salt = bcrypt.gensalt(10)
    print("salt: ",salt)
    print("password: ", password)
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt )
    hashed_to_store = str(hashed)[2:-1]

    if bcrypt.checkpw(password.encode("utf-8"), hashed):
        print("It Matches!")
    else:
        print("It Does not Match :(")
    accounts_for_test[username] = [password, hashed_to_store]
    
    new_account = {"username": username, "password": hashed_to_store}
    new_acount_id = accounts.insert_one(new_account).inserted_id


# all_accounts = accounts.find()
# for account in all_accounts:
#     pprint.pprint(account)

with open("./accountInfo.txt","w") as f:
    json.dump(accounts_for_test,f)

print(accounts_for_test)