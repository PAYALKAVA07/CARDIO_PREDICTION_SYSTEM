import useAssessmentForm from "../../hooks/useAssessmentForm";

import StepPatientInfo from "./steps/StepPatientInfo";
import StepBodyMetrics from "./steps/StepBodyMetrics";
import StepVitals from "./steps/StepVitals";
import StepLifestyle from "./steps/StepLifestyle";
import StepReview from "./steps/StepReview";

import Stepper from "../../components/form/Stepper";

export default function Assessment() {
  const form = useAssessmentForm();

  return (
    <div className="min-h-screen bg-bgMain flex items-center justify-center px-4">

      <div className="w-full max-w-md">
        <Stepper currentStep={form.currentStep} />

        {/* Step container with animation */}
        <div className="transition-all duration-300 ease-in-out">
          {form.currentStep === 1 && <StepPatientInfo form={form} />}
          {form.currentStep === 2 && <StepBodyMetrics form={form} />}
          {form.currentStep === 3 && <StepVitals form={form} />}
          {form.currentStep === 4 && <StepLifestyle form={form} />}
          {form.currentStep === 5 && <StepReview form={form} />}
        </div>
      </div>
    </div>
  );
}
