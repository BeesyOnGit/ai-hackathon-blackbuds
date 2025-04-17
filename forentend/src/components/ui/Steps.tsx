import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";

export type StepType = {
    title: string;
};

export function Steps({ currentStep = 1, steps }: { currentStep: number; steps: StepType[] }) {
    return (
        <div className="flex  gap-4">
            {steps.map((step, index) => {
                const isActive = index + 1 === currentStep;
                const isCompleted = index + 1 < currentStep;

                return (
                    <div key={step.title} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-6 h-6 flex items-center justify-center rounded-full border",
                                    isCompleted
                                        ? "bg-green-500 text-white border-green-500"
                                        : isActive
                                        ? "bg-primary text-white border-primary"
                                        : "bg-muted text-muted-foreground"
                                )}
                            >
                                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                            </div>
                            {index < steps.length - 1 && <div className="h-full w-px bg-border mt-1" />}
                        </div>

                        <div>
                            <div className="text-sm font-medium">{step.title}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
