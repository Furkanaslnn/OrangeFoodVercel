import json
import os

def handler(event, context):
    file_path = os.path.join("foodrecipe", "daily-menu.json")
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
        return {
            "statusCode": 200,
            "body": json.dumps(data)
        }
    except FileNotFoundError:
        return {
            "statusCode": 404,
            "body": json.dumps({"error": "File not found"})
        }
