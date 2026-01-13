import os
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
METRICS_PATH = os.path.join(BASE_DIR, "model_metrics.json")

def get_metrics():
    if not os.path.exists(METRICS_PATH):
        return {
            "error": "model_metrics.json not found. Run compute_metrics.py first."
        }

    with open(METRICS_PATH, "r") as f:
        return json.load(f)
