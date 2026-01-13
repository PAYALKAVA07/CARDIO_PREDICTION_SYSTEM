// import { ShieldCheck, AlertTriangle, HeartPulse } from "lucide-react";
// import { generatePatientReport } from "../../utils/generateReport";

// const colorMap = {
//   success: {
//     bg: "bg-success/10",
//     text: "text-success",
//   },
//   warning: {
//     bg: "bg-warning/10",
//     text: "text-warning",
//   },
//   danger: {
//     bg: "bg-danger/10",
//     text: "text-danger",
//   },
// };

// export default function Result() {
//   const stored = sessionStorage.getItem("predictionResult");
//   const result = stored ? JSON.parse(stored) : null;

//   if (!result || !result.risk_level) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-textSecondary">No prediction result available.</p>
//       </div>
//     );
//   }

//   const riskMeta = {
//     "Low Risk": {
//       color: "success",
//       icon: ShieldCheck,
//       message:
//         "Your cardiovascular risk is currently low. Maintaining a healthy lifestyle is recommended.",
//     },
//     "Medium Risk": {
//       color: "warning",
//       icon: AlertTriangle,
//       message:
//         "You have a moderate cardiovascular risk. Lifestyle improvements and regular monitoring are advised.",
//     },
//     "High Risk": {
//       color: "danger",
//       icon: HeartPulse,
//       message:
//         "Your cardiovascular risk is high. Medical consultation and preventive care are strongly recommended.",
//     },
//   };

//   const meta = riskMeta[result.risk_level];
//   const Icon = meta.icon;

//   return (
//     <div className="min-h-screen bg-bgMain flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6">
//         {/* Header */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold text-textPrimary">
//             Cardiovascular Risk Assessment
//           </h2>
//           <p className="text-sm text-textSecondary">
//             Patient: <span className="font-medium">{result.patientName}</span>
//           </p>
//         </div>

//         {/* Risk Indicator */}
//         <div className={`rounded-xl p-4 mb-6 ${colorMap[meta.color].bg}`}>
//           <div className="flex items-center gap-3 mb-2">
//             <Icon className={colorMap[meta.color].text} />
//             <h3
//               className={`text-lg font-semibold ${colorMap[meta.color].text}`}
//             >
//               {result.risk_level}
//             </h3>
//           </div>

//           <p className="text-sm text-textSecondary mb-2">
//             Estimated Risk Score
//           </p>

//           <p className={`text-4xl font-bold ${colorMap[meta.color].text}`}>
//             {result.risk_percentage}%
//           </p>
//         </div>

//         {/* Interpretation */}
//         <div className="mb-6">
//           <h4 className="text-sm font-semibold text-primary mb-2">
//             Interpretation
//           </h4>
//           <p className="text-sm text-textSecondary leading-relaxed">
//             {meta.message}
//           </p>
//         </div>

//         {/* Recommendations */}
//         <div className="mb-6">
//           <h4 className="text-sm font-semibold text-primary mb-2">
//             Recommended Next Steps
//           </h4>
//           <ul className="text-sm text-textSecondary list-disc list-inside space-y-1">
//             <li>Monitor blood pressure regularly</li>
//             <li>Maintain a balanced diet</li>
//             <li>Engage in regular physical activity</li>
//             <li>Avoid smoking and excessive alcohol consumption</li>
//             <li>Consult a healthcare professional if needed</li>
//           </ul>
//         </div>
//         {/* Generate Report Button */}
//         <div className="mt-6">
//           <button
//             onClick={() =>
//               generatePatientReport({
//                 ...result,
//                 age: Number(sessionStorage.getItem("age")) || "",
//                 gender: Number(sessionStorage.getItem("gender")) || "",
//                 BMI: Number(sessionStorage.getItem("BMI")) || "",
//                 ap_hi: Number(sessionStorage.getItem("ap_hi")) || "",
//                 ap_lo: Number(sessionStorage.getItem("ap_lo")) || "",
//                 cholesterol:
//                   Number(sessionStorage.getItem("cholesterol")) || "",
//                 gluc: Number(sessionStorage.getItem("gluc")) || "",
//                 smoke: Number(sessionStorage.getItem("smoke")) || "",
//                 alco: Number(sessionStorage.getItem("alco")) || "",
//                 active: Number(sessionStorage.getItem("active")) || "",
//               })
//             }
//             className="w-full mt-4 py-2 rounded-md bg-primary text-white hover:bg-indigo-700"
//           >
//             Download Patient Report (PDF)
//           </button>
//         </div>

//         {/* Disclaimer */}
//         <p className="text-xs text-muted leading-relaxed">
//           This AI-generated assessment is intended for informational and
//           decision-support purposes only. It does not constitute a medical
//           diagnosis.
//         </p>
//       </div>
//     </div>
//   );
// }



import { ShieldCheck, AlertTriangle, HeartPulse } from "lucide-react";
import { generatePatientReport } from "../../utils/generateReport";

export default function Result() {
  const storedResult = sessionStorage.getItem("predictionResult");
  const storedForm = sessionStorage.getItem("formData");

  const prediction = storedResult ? JSON.parse(storedResult) : null;
  const formData = storedForm ? JSON.parse(storedForm) : null;

  if (!prediction || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-textSecondary">
          No prediction data available.
        </p>
      </div>
    );
  }

  const riskMeta = {
    "Low Risk": {
      color: "success",
      icon: ShieldCheck,
      message:
        "Your cardiovascular risk is currently low. Maintaining a healthy lifestyle is recommended."
    },
    "Medium Risk": {
      color: "warning",
      icon: AlertTriangle,
      message:
        "You have a moderate cardiovascular risk. Lifestyle improvements and regular monitoring are advised."
    },
    "High Risk": {
      color: "danger",
      icon: HeartPulse,
      message:
        "Your cardiovascular risk is high. Medical consultation and preventive care are strongly recommended."
    }
  };

  const colorMap = {
    success: {
      bg: "bg-success/10",
      text: "text-success"
    },
    warning: {
      bg: "bg-warning/10",
      text: "text-warning"
    },
    danger: {
      bg: "bg-danger/10",
      text: "text-danger"
    }
  };

  const meta = riskMeta[prediction.risk_level];
  const Icon = meta.icon;

  return (
    <div className="min-h-screen bg-bgMain flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-semibold text-textPrimary mb-1">
          Cardiovascular Risk Assessment
        </h2>

        <p className="text-sm text-textSecondary mb-6">
          Patient: <span className="font-medium">{prediction.patientName}</span>
        </p>

        <div className={`rounded-xl p-4 mb-6 ${colorMap[meta.color].bg}`}>
          <div className="flex items-center gap-3 mb-2">
            <Icon className={colorMap[meta.color].text} />
            <h3 className={`text-lg font-semibold ${colorMap[meta.color].text}`}>
              {prediction.risk_level}
            </h3>
          </div>

          <p className="text-sm text-textSecondary mb-2">
            Estimated Risk Score
          </p>

          <p className={`text-4xl font-bold ${colorMap[meta.color].text}`}>
            {prediction.risk_percentage}%
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-primary mb-2">
            Interpretation
          </h4>
          <p className="text-sm text-textSecondary leading-relaxed">
            {meta.message}
          </p>
        </div>

        <button
          onClick={() => generatePatientReport(formData, prediction)}
          className="w-full py-2 rounded-md bg-primary text-white hover:bg-indigo-700"
        >
          Download Patient Report (PDF)
        </button>

        <p className="text-xs text-muted mt-4 leading-relaxed">
          This AI-generated assessment is for informational purposes only and does
          not replace professional medical advice.
        </p>
      </div>
    </div>
  );
}
