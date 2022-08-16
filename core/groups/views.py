from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
import json
from bson.objectid import ObjectId
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
    return HttpResponse(group_records.find({"_id": ObjectId(_id)}))

# Function to add votes
