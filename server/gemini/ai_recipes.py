import os
import google.generativeai as genai
from dotenv import load_dotenv
import json 
from flask import Flask, jsonify

app = Flask(__name__)
load_dotenv()

generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
)

def main(user_input):
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    genai.configure(api_key=API_KEY)

    chat_session = model.start_chat(
        history=[]
    )

    message = """
    (Verdiğin çıktı JSON formatında olması gerekli. Sadece şu örnek formata uygun şekilde döndür:) 
    [
    {
    "id": 1,
    "name": "Yemek Adı",
    "image": "/images/yemekadi.jpg",
    "recipe": {
        "ingredients": [
            "malzeme1",
            "malzeme2",
            "malzeme3"
        ],
        "instructions": "Yemeğin yapılış tarifi."
    }
    }
    ]
    Verdiğin tarif ayrıntılı bir instructions bölümüne sahip olsun ve önemli olarak sadece şu malzemeleri içeren yemek tarifi ver başka malzemler içermesin:
    """

    message = message + user_input
    response = chat_session.send_message(message)
    raw_data = response.text.strip()

    if raw_data.startswith("```json"):
        raw_data = raw_data[7:]  
    if raw_data.endswith("```"):
        raw_data = raw_data[:-3]  

    try:
        data = json.loads(raw_data)
    except json.JSONDecodeError as e:
        raise ValueError("Döndürülen çıktı geçerli bir JSON değil: " + str(e))

    return data
