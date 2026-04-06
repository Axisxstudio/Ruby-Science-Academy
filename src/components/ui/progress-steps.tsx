import { cn } from "@/lib/utils";

interface ProgressStepsProps {
  labels: string[];
  currentStep: number;
}

export function ProgressSteps({ labels, currentStep }: ProgressStepsProps) {
  return (
    <div className="relative flex items-center justify-between gap-4">
      {/* Connecting Line Background */}
      <div className="absolute left-0 top-[18px] h-0.5 w-full bg-border-soft" aria-hidden="true" />
      
      {/* Active Connecting Line */}
      <div 
        className="absolute left-0 top-[18px] h-0.5 bg-primary transition-all duration-300 ease-in-out" 
        style={{ width: `${(currentStep / (labels.length - 1)) * 100}%` }}
        aria-hidden="true" 
      />

      {labels.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={label} className="relative z-10 flex flex-col items-center gap-3">
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-full border-2 transition-all duration-300",
                isActive && "border-primary bg-primary text-white shadow-[0_0_15px_rgba(15,76,129,0.3)]",
                isCompleted && "border-primary bg-primary text-white",
                !isActive && !isCompleted && "border-border-soft bg-white text-muted",
              )}
            >
              {isCompleted ? (
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-sm font-bold">{index + 1}</span>
              )}
            </div>
            
            <div className="text-center">
              <p className={cn(
                "text-[10px] font-bold uppercase tracking-[0.15em]",
                isActive || isCompleted ? "text-primary" : "text-muted"
              )}>
                Step {index + 1}
              </p>
              <p className={cn(
                "mt-0.5 text-xs font-extrabold",
                isActive || isCompleted ? "text-primary-deep" : "text-muted"
              )}>
                {label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
