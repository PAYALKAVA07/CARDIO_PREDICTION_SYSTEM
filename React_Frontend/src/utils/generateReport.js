import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePatientReport(formData, prediction) {
  const doc = new jsPDF();

  /* ---------------- COLORS (OPTION 3 THEME) ---------------- */
  const COLORS = {
    primary: [63, 58, 160],     // Indigo-600
    textDark: [2, 6, 23],       // Slate-950
    textMuted: [100, 116, 139], // Slate-500
    border: [203, 213, 225],    // Slate-300
    success: [21, 128, 61],     // Green-700
    warning: [202, 138, 4],     // Yellow-600
    danger: [185, 28, 28]       // Red-700
  };

  /* ---------------- HEADER BAR ---------------- */
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, 210, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.text(
    "Cardiovascular Disease Risk Assessment Report",
    105,
    14,
    { align: "center" }
  );

  /* ---------------- META INFO ---------------- */
  doc.setTextColor(...COLORS.textMuted);
  doc.setFontSize(9);
  doc.text(
    `Report Generated: ${new Date().toLocaleString()}`,
    14,
    30
  );
  doc.text("ML Model Used: Random Forest", 14, 36);

  /* ---------------- RISK CARD ---------------- */
  const riskColor =
    prediction.risk_level === "Low Risk"
      ? COLORS.success
      : prediction.risk_level === "Medium Risk"
      ? COLORS.warning
      : COLORS.danger;

  doc.setFillColor(...riskColor);
  doc.roundedRect(14, 44, 182, 26, 4, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(prediction.risk_level.toUpperCase(), 105, 56, {
    align: "center"
  });

  doc.setFontSize(11);
  doc.text(
    `Risk Probability: ${prediction.risk_percentage}%`,
    105,
    64,
    { align: "center" }
  );

  /* ---------------- SECTION: PATIENT INFO ---------------- */
  let y = 80;
  sectionTitle(doc, "Patient Information", y, COLORS);
  y += 8;

  twoColumnRow(doc, "Age", `${formData.age} years`, "Gender", genderLabel(formData.gender), y, COLORS);
  y += 7;
  twoColumnRow(doc, "Height", `${formData.height} cm`, "Weight", `${formData.weight} kg`, y, COLORS);
  y += 7;
  twoColumnRow(doc, "BMI", formData.BMI, "", "", y, COLORS);

  /* ---------------- SECTION: CLINICAL ---------------- */
  y += 14;
  sectionTitle(doc, "Clinical Measurements", y, COLORS);
  y += 8;

  twoColumnRow(doc, "Systolic BP", `${formData.ap_hi} mm Hg`, "Diastolic BP", `${formData.ap_lo} mm Hg`, y, COLORS);
  y += 7;
  twoColumnRow(doc, "Cholesterol", levelLabel(formData.cholesterol), "Glucose", levelLabel(formData.gluc), y, COLORS);

  /* ---------------- SECTION: LIFESTYLE ---------------- */
  y += 14;
  sectionTitle(doc, "Lifestyle Factors", y, COLORS);
  y += 8;

  twoColumnRow(doc, "Smoker", yesNo(formData.smoke), "Alcohol Intake", yesNo(formData.alco), y, COLORS);
  y += 7;
  twoColumnRow(doc, "Physical Activity", yesNo(formData.active), "", "", y, COLORS);

  /* ---------------- DISCLAIMER ---------------- */
  doc.setTextColor(...COLORS.textMuted);
  doc.setFontSize(9);
  doc.text(
    "Disclaimer: This AI-generated report is intended for educational and decision-support purposes only. "
    + "It does not replace professional medical advice, diagnosis, or treatment.",
    14,
    285,
    { maxWidth: 180 }
  );

  /* ---------------- SAVE ---------------- */
  doc.save(`Cardio_Risk_Report_${formData.patientName}.pdf`);
}

/* ================= HELPER FUNCTIONS ================= */

function sectionTitle(doc, title, y, COLORS) {
  doc.setTextColor(...COLORS.textDark);
  doc.setFontSize(12);
  doc.text(title, 14, y);

  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.5);
  doc.line(14, y + 2, 196, y + 2);
}

function twoColumnRow(doc, l1, v1, l2, v2, y, COLORS) {
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.textMuted);
  doc.text(`${l1}:`, 14, y);
  doc.setTextColor(...COLORS.textDark);
  doc.text(v1, 50, y);

  if (l2) {
    doc.setTextColor(...COLORS.textMuted);
    doc.text(`${l2}:`, 110, y);
    doc.setTextColor(...COLORS.textDark);
    doc.text(v2, 150, y);
  }
}

function yesNo(val) {
  return val === "1" ? "Yes" : "No";
}

function levelLabel(val) {
  if (val === "1") return "Normal";
  if (val === "2") return "Above Normal";
  if (val === "3") return "Well Above Normal";
  return "-";
}

function genderLabel(val) {
  return val === "1" ? "Male" : "Female";
}
