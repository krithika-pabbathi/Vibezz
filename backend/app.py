from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_emotion

app = Flask(__name__)
CORS(app)  # ✅ FIXED CORS

@app.route("/detect", methods=["POST"])
def detect():
    data = request.get_json()
    text = data.get("text", "")

    mood = predict_emotion(text)

    return jsonify({"mood": mood})

if __name__ == "__main__":
    app.run(debug=True)