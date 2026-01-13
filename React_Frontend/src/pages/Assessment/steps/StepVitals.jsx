import { useState } from "react";
import InputField from "../../../components/form/InputField";
import Button from "../../../components/common/Button";

export default function StepVitals({ form }) {
  const { formData, updateField, nextStep, prevStep } = form;
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.ap_hi || formData.ap_hi < 90 || formData.ap_hi > 200) {
      newErrors.ap_hi = "Systolic BP must be between 90–200 mmHg";
    }

    if (!formData.ap_lo || formData.ap_lo < 60 || formData.ap_lo > 130) {
      newErrors.ap_lo = "Diastolic BP must be between 60–130 mmHg";
    }

    if (
      formData.ap_hi &&
      formData.ap_lo &&
      Number(formData.ap_hi) <= Number(formData.ap_lo)
    ) {
      newErrors.ap_hi = "Systolic BP must be higher than Diastolic BP";
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
        Vital Signs
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Blood pressure values are important for cardiovascular risk assessment
      </p>

      <div className="space-y-4">
        <InputField
          label="Systolic Blood Pressure (mmHg)"
          type="number"
          placeholder="e.g. 120"
          value={formData.ap_hi}
          onChange={(e) =>
            updateField("ap_hi", e.target.value)
          }
          error={errors.ap_hi}
          helper="Top number in BP reading"
        />

        <InputField
          label="Diastolic Blood Pressure (mmHg)"
          type="number"
          placeholder="e.g. 80"
          value={formData.ap_lo}
          onChange={(e) =>
            updateField("ap_lo", e.target.value)
          }
          error={errors.ap_lo}
          helper="Bottom number in BP reading"
        />

        <div className="flex gap-3">
          <Button onClick={prevStep}>Back</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
}
