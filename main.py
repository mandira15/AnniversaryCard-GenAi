# from flask_cors import CORS
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


GOOGLE_API_KEY = "AIzaSyDHJULXz2gYBpeJFg0ZVLxKlCUEOlmF-Ag"
genai.configure(api_key=GOOGLE_API_KEY)
@app.route('/generate-poem', methods=['POST'])
def generate_poem():
    data = request.get_json()
    topic = data.get("topic",  "anniversary")

    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(f"Write a beautiful, creative poem about {topic}.")
        poem = response.text.strip()
        return jsonify({"poem": poem})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
