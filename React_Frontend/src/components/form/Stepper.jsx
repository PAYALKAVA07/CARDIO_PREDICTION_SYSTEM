export default function Stepper({ currentStep }) {
  const steps = ["Personal", "Body", "Vitals", "Lifestyle"];

  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((label, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={label} className="flex-1 text-center">
            <div
              className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${
                  isCompleted
                    ? "bg-primary text-white"
                    : isActive
                    ? "bg-primaryLight text-primary border border-primary"
                    : "bg-borderSubtle text-textSecondary"
                }`}
            >
              {step}
            </div>
            <p className="text-xs mt-1 text-textSecondary">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
