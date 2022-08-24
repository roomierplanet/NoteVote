from pymongo import MongoClient
from backend import settings

client_url = 'mongodb+srv://arnavnagpal:' + settings.DB_PASSWORD + '@note-vote.fin7qf1.mongodb.net/?retryWrites=true&w=majority'

client = MongoClient(client_url)

db = client.get_database('NoteVote')

# collection with group(host) data
group_records = db.Groups

