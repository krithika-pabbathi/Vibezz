from transformers import pipeline

# Load NLP model
classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

# Mapping model labels → your app moods
label_map = {
    "joy": "happy",
    "sadness": "sad",
    "anger": "angry",
    "neutral": "chill",
    "fear": "sad",
    "surprise": "happy"
}

def predict_emotion(text):
    text = text.lower()

    # ✅ HANDLE NEGATIVE PHRASES
    if "not happy" in text:
        return "sad"
    if "not sad" in text:
        return "happy"
    if "not angry" in text:
        return "chill"
    if "not chill" in text:
        return "angry"

    # Run model
    results = classifier(text)[0]

    # Get highest score emotion
    top = max(results, key=lambda x: x['score'])

    label = top['label']

    return label_map.get(label, "chill")