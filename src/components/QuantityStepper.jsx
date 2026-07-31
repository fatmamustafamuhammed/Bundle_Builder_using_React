import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

const QuantityStepper = ({
  quantity,
  onIncrement,
  onDecrement,
  disabled = false,
  size = "default",
  buttonBg = "bg-[#F0F4F7]",
}) => {
  const small = size === "small";

  return (
    <div className="flex items-center gap-0">
      <button
        onClick={onDecrement}
        disabled={disabled || quantity <= 1}
        className={`border border-[#dce1e9] rounded px-1.5 py-0.5 ${small ? "text-xs" : "text-sm"} 
          ${buttonBg} disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center
          text-gray-500`}
      >
        <FaMinus className={small ? "w-2 h-2" : "w-3 h-3"} />
      </button>
      <span
        className={`mx-1.5 min-w-[16px] text-center font-semibold ${small ? "text-xs" : "text-sm"} text-gray-700`}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        disabled={disabled}
        className={`border border-[#dce1e9] rounded px-1.5 py-0.5 ${small ? "text-xs" : "text-sm"} 
          ${buttonBg} disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center
          text-gray-500`}
      >
        <FaPlus className={small ? "w-2 h-2" : "w-3 h-3"} />
      </button>
    </div>
  );
};

export default QuantityStepper;
