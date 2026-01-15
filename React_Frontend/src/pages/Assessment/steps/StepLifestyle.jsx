import { useState } from "react";
import Button from "../../../components/common/Button";

export default function StepLifestyle({ form }) {
  const { formData, updateField, nextStep, prevStep } = form;
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.cholesterol) newErrors.cholesterol = "Required";
    if (!formData.gluc) newErrors.gluc = "Required";
    if (formData.smoke === "") newErrors.smoke = "Required";
    if (formData.alco === "") newErrors.alco = "Required";
    if (formData.active === "") newErrors.active = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div className="w-full max-w-md bg-card rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-slate-800">
        Lifestyle & Health
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        These factors influence long-term cardiovascular risk
      </p>

      <div className="space-y-5">
        {/* Cholesterol */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cholesterol Level
          </label>
          <select
            value={formData.cholesterol}
            onChange={(e) =>
              updateField("cholesterol", e.target.value)
            }
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select</option>
            <option value="1">Normal</option>
            <option value="2">Above Normal</option>
            <option value="3">Well Above Normal</option>
          </select>
          {errors.cholesterol && (
            <p className="text-xs text-red-600">{errors.cholesterol}</p>
          )}
        </div>

        {/* Glucose */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Glucose Level
          </label>
          <select
            value={formData.gluc}
            onChange={(e) =>
              updateField("gluc", e.target.value)
            }
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select</option>
            <option value="1">Normal</option>
            <option value="2">Above Normal</option>
            <option value="3">Well Above Normal</option>
          </select>
          {errors.gluc && (
            <p className="text-xs text-red-600">{errors.gluc}</p>
          )}
        </div>

        {/* Smoking */}
        <CheckboxToggle
          label="Do you smoke?"
          value={formData.smoke}
          onChange={(val) => updateField("smoke", val)}
          error={errors.smoke}
        />

        {/* Alcohol */}
        <CheckboxToggle
          label="Do you consume alcohol?"
          value={formData.alco}
          onChange={(val) => updateField("alco", val)}
          error={errors.alco}
        />

        {/* Physical Activity */}
        <CheckboxToggle
          label="Are you physically active?"
          value={formData.active}
          onChange={(val) => updateField("active", val)}
          error={errors.active}
        />

        <div className="flex gap-3">
          <Button onClick={prevStep}>Back</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Checkbox Toggle Component ---------- */

function CheckboxToggle({ label, value, onChange, error }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-700 mb-2">{label}</p>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value === "1"}
            onChange={() => onChange("1")}
            className="accent-blue-600"
          />
          <span className="text-sm text-slate-700">Yes</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value === "0"}
            onChange={() => onChange("0")}
            className="accent-blue-600"
          />
          <span className="text-sm text-slate-700">No</span>
        </label>
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
