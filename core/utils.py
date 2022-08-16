from pymongo import MongoClient

client = MongoClient('mongodb+srv://arnavnagpal:L0FKHBfmgpWZShHo@note-vote.fin7qf1.mongodb.net/?retryWrites=true&w=majority')

db = client.get_database('NoteVote')

group_records = db.Groups

# add user records later
