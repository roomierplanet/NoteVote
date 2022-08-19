from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
import json
from bson.objectid import ObjectId
from django.views.decorators.csrf import csrf_exempt

# Hacky way to get relative imports working in Python
import os
import sys
sys.path.append(os.path.realpath('.'))
from utils import group_records


class GroupView(APIView):
    def get(self, request):
        cursor = group_records.find({}, {
            "_id": 1,
            "name": 1
        })
        ret = []
        for field in cursor:
            field['_id'] = str(field['_id'])
            ret.append(field)
        return HttpResponse(json.dumps(ret))
    def post(self, request):
        req_body = request.body.decode('utf-8')
        body = json.loads(req_body)
        response = group_records.insert_one(body)
        response_id = response.inserted_id
        return HttpResponse(response_id, content_type='application/json')

def get_group(request, _id):
    doc = group_records.find_one({"_id": ObjectId(_id)})
    doc['_id'] = str(doc['_id'])
    return HttpResponse(json.dumps(doc), content_type='application/json')

def get_group_auth0(request, auth0_id):
    doc = group_records.find_one({"auth0_id": auth0_id})
    if doc:
        doc['_id'] = str(doc['_id'])
        return HttpResponse(json.dumps(doc), content_type='application/json')
    else: 
        return HttpResponse(json.dumps({
            '_id': 'none'
        }), content_type='application/json')

# Function to add votes
@csrf_exempt
def vote_group(request, _id):
    _id = ObjectId(_id)
    docs = group_records.find_one({"_id": _id})
    plist = docs['playlist']
    req_body = request.body.decode('utf-8')
    body = json.loads(req_body)
    song_id = body['song_id']
    if song_id in plist:
        plist[song_id] += 1
    else:
        plist[song_id] = 1
    group_records.update_one({"_id": _id}, {"$set": {"playlist": plist}})
    return HttpResponse("hello")
