import React from 'react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  name: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OrderProgressIndicatorProps {
  steps: Step[];
  className?: string;
}

const OrderProgressIndicator: React.FC<OrderProgressIndicatorProps> = ({ steps, className }) => {
  console.log("Rendering OrderProgressIndicator with steps:", steps.length);

  if (!steps || steps.length === 0) {
    return <p className="text-sm text-gray-500">Order status not available.</p>;
  }

  return (
    <nav aria-label="Progress" className={cn("py-2", className)}>
      <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn("flex-1", stepIdx !== steps.length -1 ? "pr-2 sm:pr-4" : "")}>
            {step.isCompleted ? (
              <div className="group flex flex-col items-start border-l-4 border-orange-600 py-2 pl-4 hover:border-orange-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-xs font-medium uppercase tracking-wide text-orange-600">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : step.isCurrent ? (
              <div
                className="flex flex-col items-start border-l-4 border-orange-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-orange-600">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div className="group flex flex-col items-start border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500 group-hover:text-gray-700">{step.id}</span>
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{step.name}</span>
              </div>
            )}
             {/* Connector line for horizontal layout on larger screens, simplified */}
            {stepIdx !== steps.length - 1 && (
              <div className="hidden md:block absolute top-5 left-full w-full h-0.5 bg-transparent" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Example usage for OrderProgressIndicator (can be placed in a page component)
// const exampleSteps: Step[] = [
//   { id: 'Step 1', name: 'Order Placed', isCompleted: true, isCurrent: false },
//   { id: 'Step 2', name: 'Preparing', isCompleted: true, isCurrent: false },
//   { id: 'Step 3', name: 'Out for Delivery', isCompleted: false, isCurrent: true },
//   { id: 'Step 4', name: 'Delivered', isCompleted: false, isCurrent: false },
// ];
// <OrderProgressIndicator steps={exampleSteps} />

export default OrderProgressIndicator;