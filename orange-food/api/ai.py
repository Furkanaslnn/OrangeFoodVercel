import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Ortam değişkenlerini yükle
load_dotenv()

# AI modeli yapılandırması
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

def generate_recipe(user_input):
    API_KEY = os.getenv("API_KEY")
    genai.configure(api_key=API_KEY)

    # Yeni bir chat oturumu başlat
    chat_session = model.start_chat(history=[])

    # Mesaj formatını hazırlayın
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

    message += user_input
    response = chat_session.send_message(message)
    raw_data = response.text.strip()

    # JSON formatı temizleme
    if raw_data.startswith("```json"):
        raw_data = raw_data[7:]
    if raw_data.endswith("```"):
        raw_data = raw_data[:-3]

    # JSON'u ayrıştır
    try:
        data = json.loads(raw_data)
    except json.JSONDecodeError as e:
        raise ValueError("Döndürülen çıktı geçerli bir JSON değil: " + str(e))

    return data

# Vercel handler fonksiyonu
def handler(event, context):
    try:
        # Kullanıcı girdisini al
        body = json.loads(event.get("body", "{}"))
        user_input = body.get("ingredients")

        if not user_input:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Ingredients field is required"})
            }

        # Tarif oluştur
        result = generate_recipe(user_input)
        return {
            "statusCode": 200,
            "body": json.dumps(result)
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
