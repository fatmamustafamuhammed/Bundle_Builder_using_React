import { bundleData } from "../data/bundleData";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const Step = ({ step, isOpen, onToggle, selections, children }) => {
  const { id, title, type } = step;
  let selectedCount = 0;

  if (type === "products") {
    for (const p of step.products || []) {
      const sel = selections[p.id] || {};
      if (Object.values(sel).some((q) => q > 0)) selectedCount++;
    }
  } else if (type === "plan") {
    if (Object.values(selections.plan || {}).some((q) => q > 0))
      selectedCount = 1;
  }

  const stepNumber = bundleData.steps.findIndex((s) => s.id === id) + 1;
  const totalSteps = bundleData.steps.length;

  const stepIcons = {
    cameras: "../assets/icons/camera.svg",
    plan: "../assets/icons/plan.svg",
    sensors: "../assets/icons/sensor.svg",
    extra: "../assets/icons/protection.svg",
  };

  return (
    <div
      className={`last:border-0 p-0 ${isOpen ? "" : "border-b border-[#1F1F1F] "} overflow-hidden ${isOpen ? "bg-[#EDF4FF] rounded-xl" : ""}`}
    >
      <div
        className={`cursor-pointer select-none transition-colors px-0 md:px-0`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between py-2 ml-4 md:ml-2 md:p-2">
          <span className="font-['Gilroy-Medium', 'Helvetica', 'Arial', 'sans-serif'] text-[12px] font-normal leading-none tracking-[1.6px] uppercase text-[#484848]">
            STEP {stepNumber} OF {totalSteps}
          </span>
        </div>

        <div className="border-b border-[#1F1F1F] mx-0"></div>

        <div className="flex items-center justify-between py-4 ml-4 md:ml-2 md:p-2">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0">
            <img
              src={stepIcons[step.id]}
              alt={title}
              className="w-[26px] h-[26px] object-contain flex-shrink-0"
            />
            <span className="font-['Gilroy-SemiBold','Arial'] text-[16px] sm:text-[20px] font-bold leading-none tracking-tight text-[#0B0D10] -mt-0.5 truncate">
              {title}
            </span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 mr-2 md:mr-0">
            <span className="font-['Gilroy-Medium','Helvetica','Arial','sans-serif'] font-normal text-[14px] leading-[16px] text-center text-[#4E2FD2] whitespace-nowrap">
              {selectedCount > 0 ? `${selectedCount} selected` : "0 selected"}
            </span>
            {isOpen ? (
              <FaCaretUp className="w-[12px] h-[15px] text-[#4E2FD2] mt-0.5" />
            ) : (
              <FaCaretDown className="w-[12px] h-[15px] text-[#4E2FD2]" />
            )}
          </div>
        </div>
      </div>

      <div className={`step-content ${isOpen ? "open" : ""}`}>
        <div className="space-y-4 md:p-2">
          {children}
          {isOpen && stepNumber < totalSteps && (
            <div className="pt-2 pb-1 flex justify-center">
              <button
                className="w-[270px] h-[39px] rounded-[7px] text-[#4E2FD2] 
               text-center text-[18px] leading-[24px] font-normal
               px-6 py-[5px] flex items-center justify-center gap-2 transition-colors 
               border-2 border-[#4E2FD2] hover:bg-[#4E2FD2] hover:text-white"
                style={{
                  fontFamily: "Gilroy-SemiBold, sans-serif",
                  fontWeight: "400",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(bundleData.steps[stepNumber].id);
                }}
              >
                Next: {bundleData.steps[stepNumber].title}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step;
