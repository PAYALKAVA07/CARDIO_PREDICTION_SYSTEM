import numpy as np
import joblib
import pandas as pd
from sklearn.metrics import confusion_matrix

# Load model and data
model = joblib.load("models/best_model.pkl")
df = pd.read_csv("cleaned_cardio.csv")

FEATURES = [
    "age",
    "ap_hi",
    "ap_lo",
    "BMI",
    "cholesterol",
    "gluc",
    "smoke",
    "alco",
    "active",
    "gender"
]

X = df[FEATURES]
y = df["cardio"]

# Predictions
y_pred = model.predict(X)

# Confusion Matrix
cm = confusion_matrix(y, y_pred)
tn, fp, fn, tp = cm.ravel()

# Feature Importance (Random Forest)
feature_importance = dict(
    zip(FEATURES, model.feature_importances_.tolist())
)

# Correlation Matrix
corr_matrix = df[FEATURES].corr().round(2).values.tolist()

def get_metrics():
    return {
        "confusion_matrix": {
            "tn": int(tn),
            "fp": int(fp),
            "fn": int(fn),
            "tp": int(tp)
        },
        "feature_importance": feature_importance,
        "correlation_matrix": corr_matrix,
        "features": FEATURES
    }
