import { useState, useEffect } from "react";

export default function useAssessmentForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
  patientName: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  BMI: "",
  ap_hi: "",
  ap_lo: "",
  cholesterol: "",
  gluc: "",
  smoke: "",
  alco: "",
  active: ""
});



  // Auto-calculate BMI
  useEffect(() => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmi =
        formData.weight / (heightInMeters * heightInMeters);
      setFormData((prev) => ({
        ...prev,
        BMI: bmi.toFixed(2)
      }));
    }
  }, [formData.height, formData.weight]);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => setCurrentStep((s) => s + 1);
  const prevStep = () => setCurrentStep((s) => s - 1);

  return {
    currentStep,
    formData,
    updateField,
    nextStep,
    prevStep
  };
}
