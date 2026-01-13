# from fastapi import FastAPI
# from pydantic import BaseModel
# import numpy as np
# import joblib
# import json

# # ----------------------------
# # Load model and metadata
# # ----------------------------
# model = joblib.load("best_heart_risk_model.pkl")

# with open("model_metadata.json", "r") as f:
#     model_metadata = json.load(f)

# # ----------------------------
# # FastAPI app
# # ----------------------------
# app = FastAPI(
#     title="AI-Powered Cardiovascular Risk Prediction API",
#     description="Predicts cardiovascular disease risk using a trained ML model",
#     version="1.0.0"
# )

# # ----------------------------
# # Input schema (MATCHES NOTEBOOK FEATURES)
# # ----------------------------
# class PatientData(BaseModel):
#     age: int
#     ap_hi: int
#     ap_lo: int
#     BMI: float
#     cholesterol: int
#     gluc: int
#     smoke: int
#     alco: int
#     active: int
#     gender: int   # 0 = Female, 1 = Male

# # ----------------------------
# # Risk categorization logic
# # ----------------------------
# def risk_category(prob):
#     if prob < 0.30:
#         return "Low Risk"
#     elif prob < 0.60:
#         return "Medium Risk"
#     else:
#         return "High Risk"

# # ----------------------------
# # Health check
# # ----------------------------
# @app.get("/")
# def home():
#     return {
#         "message": "Cardiovascular Risk Prediction API is running",
#         "model_used": model_metadata["model_name"]
#     }

# # ----------------------------
# # Model details endpoint (FOR REACT UI)
# # ----------------------------
# @app.get("/model-info")
# def model_info():
#     return model_metadata

# # ----------------------------
# # Prediction endpoint
# # ----------------------------
# @app.post("/predict")
# def predict(data: PatientData):

#     # IMPORTANT: feature order MUST match training
#     input_data = np.array([[
#         data.age,
#         data.ap_hi,
#         data.ap_lo,
#         data.BMI,
#         data.cholesterol,
#         data.gluc,
#         data.smoke,
#         data.alco,
#         data.active,
#         data.gender
#     ]])

#     # Prediction
#     probability = model.predict_proba(input_data)[0][1]
#     risk = risk_category(probability)

#     return {
#         "risk_percentage": round(probability * 100, 2),
#         "risk_level": risk,
#         "model_name": model_metadata["model_name"],
#         "accuracy": model_metadata["accuracy"],
#         "roc_auc": model_metadata["roc_auc"]
#     }



from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI(title="Cardiovascular Risk Prediction API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load trained model
model = joblib.load("best_heart_risk_model.pkl")

# -------- INPUT SCHEMA --------
class PatientFeatures(BaseModel):
    age: int
    ap_hi: int
    ap_lo: int
    BMI: float
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int
    gender: int

# -------- RISK LOGIC --------
def risk_category(prob):
    if prob < 0.30:
        return "Low Risk"
    elif prob < 0.70:
        return "Medium Risk"
    else:
        return "High Risk"

# -------- PREDICTION ENDPOINT --------
@app.post("/predict")
def predict(features: PatientFeatures):

    # 🔒 FEATURE ORDER — DO NOT CHANGE
    input_data = np.array([[
        features.age,
        features.ap_hi,
        features.ap_lo,
        features.BMI,
        features.cholesterol,
        features.gluc,
        features.smoke,
        features.alco,
        features.active,
        features.gender
    ]])

    probability = model.predict_proba(input_data)[0][1]
    risk = risk_category(probability)

    return {
        "risk_percentage": round(probability * 100, 2),
        "risk_level": risk
    }
