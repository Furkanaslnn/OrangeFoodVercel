from flask import Flask, jsonify, request  
from flask_cors import CORS
import json
import os

from gemini.ai_recipes import main

app = Flask(__name__)
CORS(app)

def load_json(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print(f"Hata: {file_path} dosyası bulunamadı.")
        return {"error": f"{file_path} dosyası bulunamadı."}
    except json.JSONDecodeError:
        print("Hata: JSON dosyası doğru formatta değil.")
        return {"error": "JSON dosyası doğru formatta değil."}

@app.route("/api/foodrecipe", methods=['GET'])
def get_recipes():
    file_path = os.path.join("foodrecipe", "recipes.json")
    data = load_json(file_path)
    return jsonify(data)

@app.route("/api/daily-menu", methods=['GET'])
def get_daily_menu():
    file_path = os.path.join("daily-menu", "daily-menu.json")
    data = load_json(file_path)
    return jsonify(data)

@app.route("/api/ai", methods=['POST'])
def get_ai_recipes():
    try:
        # Kullanıcı girdisini POST isteği gövdesinden alıyoruz
        data = request.get_json()  # Gövdeyi JSON olarak al
        if not data or 'ingredients' not in data:
            return jsonify({"error": "Ingredients field is required"}), 400

        user_input = data['ingredients']  # "ingredients" alanını al

        # AI modelinden tarif oluşturma
        res = main(user_input)
        print("AI Response:", res)

        # Dönen cevabı temizleyin ve JSON doğrulaması yapın
        if isinstance(res, str):
            json_response = json.loads(res)  # Yanıt bir string ise parse et
        elif isinstance(res, list):  # Eğer yanıt bir liste ise direkt kullan
            json_response = res
        else:
            raise ValueError("Unsupported response format from AI")

    except json.JSONDecodeError as e:
        # Eğer JSON formatında değilse hata ver
        return jsonify({"error": "Invalid JSON response", "details": str(e)}), 400
    except ValueError as ve:
        # Diğer olası hataları yakala
        return jsonify({"error": "Unexpected response", "details": str(ve)}), 400
    except Exception as e:
        # Genel hata durumlarını yakala
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

    return jsonify(json_response)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
