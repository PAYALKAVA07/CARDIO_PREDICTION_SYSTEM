import os
import json
import joblib
import pandas as pd
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)
from sklearn.metrics import confusion_matrix
from sklearn.inspection import permutation_importance

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "best_heart_risk_model.pkl")
DATA_PATH = os.path.join(BASE_DIR, "cleaned_cardio.csv")
OUTPUT_PATH = os.path.join(BASE_DIR, "model_metrics.json")

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

print("Loading model & data...")
model = joblib.load(MODEL_PATH)
df = pd.read_csv(DATA_PATH)

if "BMI" not in df.columns:
    df["BMI"] = df["weight"] / ((df["height"] / 100) ** 2)

X = df[FEATURES]
y = df["cardio"]

print("Computing confusion matrix...")
preds = model.predict(X)
tn, fp, fn, tp = confusion_matrix(y, preds).ravel()

print("Computing permutation importance (this will take time ONCE)...")
perm = permutation_importance(
    model,
    X,
    y,
    n_repeats=5,        # reduced safely
    random_state=42,
    scoring="roc_auc",
    n_jobs=-1           # use all CPU cores
)

importance = perm.importances_mean
total = importance.sum()

feature_importance = {
    FEATURES[i]: float(importance[i] / total)
    for i in range(len(FEATURES))
}

accuracy = accuracy_score(y, preds)
precision = precision_score(y, preds)
recall = recall_score(y, preds)
f1 = f1_score(y, preds)
roc_auc = roc_auc_score(y, model.predict_proba(X)[:, 1])

metrics = {
    "confusion_matrix": {
        "tn": int(tn),
        "fp": int(fp),
        "fn": int(fn),
        "tp": int(tp)
    },
    "performance": {
        "accuracy": round(accuracy, 4),
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1_score": round(f1, 4),
        "roc_auc": round(roc_auc, 4)
    },
    "feature_importance": feature_importance,
    "correlation_matrix": df[FEATURES].corr().round(2).values.tolist(),
    "features": FEATURES,
    # ======================================================
# MODEL COMPARISON (FROM VALIDATED EXPERIMENTS)
# ======================================================

"model_comparison": [
    {
        "model": "Random Forest",
        "accuracy": 0.7369,
        "roc_auc": 0.8028,
        "selected": True
    },
    {
        "model": "Decision Tree",
        "accuracy": 0.7340,
        "roc_auc": 0.7940,
        "selected": False
    },
    {
        "model": "Logistic Regression",
        "accuracy": 0.7269,
        "roc_auc": 0.7925,
        "selected": False
    },
    {
        "model": "KNN",
        "accuracy": 0.7152,
        "roc_auc": 0.7685,
        "selected": False
    }
]

}

with open(OUTPUT_PATH, "w") as f:
    json.dump(metrics, f, indent=2)

print("✅ Metrics saved to model_metrics.json")
