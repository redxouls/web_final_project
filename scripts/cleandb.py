import pymongo
from pymongo import MongoClient
import pprint
import secrets
import string
import names
import bcrypt
import json

client = MongoClient("mongodb+srv://CJF:lightening_five_whips@courses.kjgaj.mongodb.net/courses_users?retryWrites=true&w=majority")
db = client.comments
comments = db.comments
comments.drop()
