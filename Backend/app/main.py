# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel

# import numpy as np
# import joblib
# import os

# from app.metrics import get_metrics

# # ---------------- APP ----------------
# app = FastAPI(title="Cardio Risk Prediction API")

# # ---------------- CORS (FIXED) ----------------
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )



# # ---------------- PATHS ----------------
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# MODEL_PATH = os.path.join(BASE_DIR, "best_heart_risk_model.pkl")

# # ---------------- LOAD MODEL ----------------
# model = joblib.load(MODEL_PATH)

# # ---------------- ROOT ----------------
# @app.get("/")
# def root():
#     return {"status": "API running"}

# # ---------------- METRICS ----------------
# @app.get("/metrics")
# def metrics():
#     return get_metrics()

# # ---------------- INPUT SCHEMA ----------------
# class PatientFeatures(BaseModel):
#     age: int
#     ap_hi: int
#     ap_lo: int
#     BMI: float
#     cholesterol: int
#     gluc: int
#     smoke: int
#     alco: int
#     active: int
#     gender: int

# # ---------------- RISK LOGIC ----------------
# def risk_category(prob):
#     if prob < 0.30:
#         return "Low Risk"
#     elif prob < 0.70:
#         return "Medium Risk"
#     else:
#         return "High Risk"

# # ---------------- PREDICTION ----------------
# @app.post("/predict")
# def predict(features: PatientFeatures):
#     input_data = np.array([[
#         features.age,
#         features.ap_hi,
#         features.ap_lo,
#         features.BMI,
#         features.cholesterol,
#         features.gluc,
#         features.smoke,
#         features.alco,
#         features.active,
#         features.gender
#     ]])

#     probability = model.predict_proba(input_data)[0][1]

#     return {
#         "risk_probability": round(probability, 4),
#         "risk_percentage": round(probability * 100, 2),
#         "risk_level": risk_category(probability)
#     }


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import json
import os

app = FastAPI(title="Cardio Risk AI")

# ---------------- CORS FIX ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://cardio-prediction-system-1.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- LOAD MODEL ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "best_heart_risk_model.pkl")
METRICS_PATH = os.path.join(BASE_DIR, "..", "model_metrics.json")

model = joblib.load(MODEL_PATH)

# ---------------- SCHEMA ----------------
class InputData(BaseModel):
    age: float
    ap_hi: float
    ap_lo: float
    BMI: float
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int
    gender: int


# ---------------- RISK LOGIC ----------------
def risk_category(prob):
    if prob < 0.30:
        return "Low Risk"
    elif prob < 0.70:
        return "Medium Risk"
    else:
        return "High Risk"
# ---------------- ROUTES ----------------

@app.get("/")
def root():
    return {"status": "CardioRisk AI backend running"}

@app.post("/predict")
def predict(data: InputData):
    X = np.array([[
        data.age,
        data.ap_hi,
        data.ap_lo,
        data.BMI,
        data.cholesterol,
        data.gluc,
        data.smoke,
        data.alco,
        data.active,
        data.gender
    ]])

    prob = model.predict_proba(X)[0][1]
    pred = int(prob >= 0.5)

    return {
        "prediction": pred,
        "risk_probability": round(float(prob), 4),
        "risk_percentage": round(prob * 100, 2),
        "risk_level": risk_category(prob)
    }

@app.get("/metrics")
def get_metrics():
    with open(METRICS_PATH, "r") as f:
        return json.load(f)
