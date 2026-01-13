const API_BASE_URL = "http://127.0.0.1:8000";

export async function predictRisk(formData) {
  const payload = {
    age: Number(formData.age),
    ap_hi: Number(formData.ap_hi),
    ap_lo: Number(formData.ap_lo),
    BMI: Number(formData.BMI),
    cholesterol: Number(formData.cholesterol),
    gluc: Number(formData.gluc),
    smoke: Number(formData.smoke),
    alco: Number(formData.alco),
    active: Number(formData.active),
    gender: Number(formData.gender)
  };

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}
