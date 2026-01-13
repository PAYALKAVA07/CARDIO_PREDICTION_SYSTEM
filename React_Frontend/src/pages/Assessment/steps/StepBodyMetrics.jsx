import { useState } from "react";
import InputField from "../../../components/form/InputField";
import Button from "../../../components/common/Button";

export default function StepBodyMetrics({ form }) {
  const { formData, updateField, nextStep, prevStep } = form;
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.height || formData.height < 120 || formData.height > 220) {
      newErrors.height = "Height must be between 120–220 cm";
    }

    if (!formData.weight || formData.weight < 30 || formData.weight > 200) {
      newErrors.weight = "Weight must be between 30–200 kg";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
   <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-slate-800">
        Body Measurements
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Used to calculate Body Mass Index (BMI)
      </p>

      <div className="space-y-4">
        <InputField
          label="Height (cm)"
          type="number"
          value={formData.height}
          onChange={(e) =>
            updateField("height", e.target.value)
          }
          error={errors.height}
        />

        <InputField
          label="Weight (kg)"
          type="number"
          value={formData.weight}
          onChange={(e) =>
            updateField("weight", e.target.value)
          }
          error={errors.weight}
        />

        {formData.BMI && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-xs text-blue-600 uppercase tracking-wide">
              Calculated BMI
            </p>
            <p className="text-3xl font-bold text-blue-700">
              {formData.BMI}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={prevStep}>Back</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
}
