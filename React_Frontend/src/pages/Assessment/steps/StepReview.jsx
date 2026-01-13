// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { predictRisk } from "../../../services/api";

// import { User, Activity, HeartPulse, ClipboardList } from "lucide-react";

// import Button from "../../../components/common/Button";

// export default function StepReview({ form }) {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const handlePredict = async () => {
//     try {
//       setLoading(true);
//       const result = await predictRisk(formData);

//       // store result in session (simple & safe)
//       sessionStorage.setItem(
//         "predictionResult",
//         JSON.stringify({
//           ...result,
//           patientName: formData.patientName,
//         })
//       );

//       navigate("/result");
//     } catch (err) {
//       alert("Prediction failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { formData, prevStep } = form;

//   const displayGender = formData.gender === "1" ? "Male" : "Female";

//   const yesNo = (val) => (val === "1" ? "Yes" : "No");

//   const levelLabel = (val) => {
//     if (val === "1") return "Normal";
//     if (val === "2") return "Above Normal";
//     if (val === "3") return "Well Above Normal";
//     return "-";
//   };

//   return (
//     <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6">
//       <h2 className="text-xl font-semibold text-textPrimary mb-2">
//         Review & Confirm
//       </h2>
//       <p className="text-sm text-textSecondary mb-6">
//         Verify the entered information carefully. This data will be used by the
//         AI model to estimate cardiovascular risk.
//       </p>

//       {/* Patient Info */}
//       <Section title="Patient Information" icon={User}>
//         <Row label="Patient Name" value={formData.patientName} />
//         <Row label="Age" value={formData.age} />
//         <Row label="Gender" value={displayGender} />
//       </Section>

//       {/* Body Metrics */}
//       <Section title="Body Metrics" icon={Activity}>
//         <Row label="Height" value={`${formData.height} cm`} />
//         <Row label="Weight" value={`${formData.weight} kg`} />
//         <Row label="BMI" value={formData.BMI} />
//       </Section>

//       {/* Vitals */}
//       <Section title="Vital Signs" icon={HeartPulse}>
//         <Row label="Systolic BP" value={`${formData.ap_hi} mmHg`} />
//         <Row label="Diastolic BP" value={`${formData.ap_lo} mmHg`} />
//       </Section>

//       {/* Lifestyle */}
//       <Section title="Lifestyle & Health" icon={ClipboardList}>
//         <Row label="Cholesterol" value={levelLabel(formData.cholesterol)} />
//         <Row label="Glucose" value={levelLabel(formData.gluc)} />
//         <Row label="Smoking" value={yesNo(formData.smoke)} />
//         <Row label="Alcohol" value={yesNo(formData.alco)} />
//         <Row label="Physically Active" value={yesNo(formData.active)} />
//       </Section>

//       {/* Actions */}
//       <div className="flex gap-3 mt-6">
//         <Button variant="secondary" onClick={prevStep}>
//           Back & Edit
//         </Button>
//         <Button onClick={handlePredict} disabled={loading}>
//           {loading ? "Analyzing..." : "Confirm & Predict"}
//         </Button>
//       </div>

//       <p className="text-xs text-muted mt-4 leading-relaxed">
//         This AI-based assessment is intended for educational and
//         decision-support purposes only. It does not replace professional medical
//         advice, diagnosis, or treatment.
//       </p>
//     </div>
//   );
// }

// /* ---------- Reusable Components ---------- */

// function Section({ title, icon: Icon, children }) {
//   return (
//     <div className="mb-6">
//       <div className="flex items-center gap-2 mb-2">
//         <Icon size={16} className="text-primary" />
//         <h3 className="text-sm font-semibold text-primary">{title}</h3>
//       </div>
//       <div className="space-y-1 bg-bgMain rounded-lg p-3">{children}</div>
//     </div>
//   );
// }

// function Row({ label, value }) {
//   return (
//     <div className="flex justify-between text-sm py-1">
//       <span className="text-textSecondary">{label}</span>
//       <span className="font-medium text-textPrimary">{value}</span>
//     </div>
//   );
// }


import { User, Activity, HeartPulse, ClipboardList } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { predictRisk } from "../../../services/api";

export default function StepReview({ form }) {
  const { formData, prevStep } = form;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const displayGender = formData.gender === "1" ? "Male" : "Female";

  const yesNo = (val) => (val === "1" ? "Yes" : "No");

  const levelLabel = (val) => {
    if (val === "1") return "Normal";
    if (val === "2") return "Above Normal";
    if (val === "3") return "Well Above Normal";
    return "-";
  };

  const handlePredict = async () => {
    try {
      setLoading(true);

      // 🔒 Call backend
      const result = await predictRisk(formData);

      // 🔒 Store prediction result
      sessionStorage.setItem(
        "predictionResult",
        JSON.stringify({
          ...result,
          patientName: formData.patientName
        })
      );

      // 🔒 Store full form data (for PDF report)
      sessionStorage.setItem("formData", JSON.stringify(formData));

      // 🔒 Navigate to result page
      navigate("/result");
    } catch (error) {
      alert("Prediction failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-textPrimary mb-2">
        Review & Confirm
      </h2>

      <p className="text-sm text-textSecondary mb-6">
        Verify the entered information carefully. This data will be used by the AI
        model to estimate cardiovascular risk.
      </p>

      {/* Patient Info */}
      <Section title="Patient Information" icon={User}>
        <Row label="Patient Name" value={formData.patientName} />
        <Row label="Age" value={formData.age} />
        <Row label="Gender" value={displayGender} />
      </Section>

      {/* Body Metrics */}
      <Section title="Body Metrics" icon={Activity}>
        <Row label="Height" value={`${formData.height} cm`} />
        <Row label="Weight" value={`${formData.weight} kg`} />
        <Row label="BMI" value={formData.BMI} />
      </Section>

      {/* Vitals */}
      <Section title="Vital Signs" icon={HeartPulse}>
        <Row label="Systolic BP" value={`${formData.ap_hi} mmHg`} />
        <Row label="Diastolic BP" value={`${formData.ap_lo} mmHg`} />
      </Section>

      {/* Lifestyle */}
      <Section title="Lifestyle & Health" icon={ClipboardList}>
        <Row label="Cholesterol" value={levelLabel(formData.cholesterol)} />
        <Row label="Glucose" value={levelLabel(formData.gluc)} />
        <Row label="Smoking" value={yesNo(formData.smoke)} />
        <Row label="Alcohol" value={yesNo(formData.alco)} />
        <Row label="Physically Active" value={yesNo(formData.active)} />
      </Section>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <Button variant="secondary" onClick={prevStep}>
          Back & Edit
        </Button>

        <Button onClick={handlePredict} disabled={loading}>
          {loading ? "Analyzing..." : "Confirm & Predict"}
        </Button>
      </div>

      <p className="text-xs text-muted mt-4 leading-relaxed">
        This AI-based assessment is intended for educational and
        decision-support purposes only and does not replace professional medical
        advice.
      </p>
    </div>
  );
}

/* ---------- Helper Components ---------- */

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-primary mb-2">
        {title}
      </h3>
      <div className="space-y-1 bg-bgMain rounded-lg p-3">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-textSecondary">{label}</span>
      <span className="font-medium text-textPrimary">{value}</span>
    </div>
  );
}
