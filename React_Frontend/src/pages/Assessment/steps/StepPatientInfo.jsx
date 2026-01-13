import { useState } from "react";
import InputField from "../../../components/form/InputField";
import RadioGroup from "../../../components/form/RadioGroup";
import Button from "../../../components/common/Button";

export default function StepPatientInfo({ form }) {
  const { formData, updateField, nextStep } = form;
  const [errors, setErrors] = useState({});

  const validate = () => {
  const newErrors = {};

  if (!formData.patientName.trim()) {
    newErrors.patientName = "Patient name is required";
  } else if (formData.patientName.length > 40) {
    newErrors.patientName = "Name should be under 40 characters";
  }

  if (!formData.age || formData.age < 18 || formData.age > 100) {
    newErrors.age = "Age must be between 18 and 100";
  }

  if (!formData.gender) {
    newErrors.gender = "Please select gender";
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
        Personal Information
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Patient details for assessment & reporting
      </p>

      <div className="space-y-4">
        <InputField
          label="Patient Name"
          placeholder="For report reference only"
          value={formData.patientName}
          onChange={(e) =>
            updateField("patientName", e.target.value)
          }
          helper="This will not affect prediction"
          error={errors.patientName}
        />

        <InputField
          label="Age"
          type="number"
          value={formData.age}
          onChange={(e) =>
            updateField("age", e.target.value)
          }
          error={errors.age}
        />

        <RadioGroup
          label="Gender"
          options={[
            { label: "Female", value: "0" },
            { label: "Male", value: "1" }
          ]}
          value={formData.gender}
          onChange={(value) =>
            updateField("gender", value)
          }
        />
        {errors.gender && (
          <p className="text-xs text-red-600">{errors.gender}</p>
        )}

        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
