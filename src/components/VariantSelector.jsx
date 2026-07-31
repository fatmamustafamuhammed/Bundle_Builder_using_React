import React from "react";

const VariantSelector = ({ variants, activeVariantId, onSelect }) => (
  <div className="flex flex-nowrap items-center gap-2 mt-2">
    {variants.map((v) => {
      const isActive = activeVariantId === v.id;
      const isLight =
        v.color && ["#f5f5f5", "#ffffff", "#e0e0e0"].includes(v.color);

      const hasImage = v.imageUrl && typeof v.imageUrl === "string";
      const showImage =
        hasImage &&
        (v.imageUrl.startsWith("/") ||
          v.imageUrl.startsWith(".") ||
          v.imageUrl.startsWith("http"));

      return (
        <button
          key={v.id}
          className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all whitespace-nowrap text-xs ${
            isActive
              ? "bg-[#1DF0BB0A] ring-1 ring-[#0AA288]"
              : "border border-gray-300"
          }`}
          onClick={() => onSelect(v.id)}
          aria-label={`Select ${v.label} variant`}
        >
          <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
            {showImage ? (
              <img
                src={v.imageUrl}
                alt={v.label}
                className="w-full h-full rounded-md object-cover"
              />
            ) : (
              <span
                className="w-full h-full rounded-full block"
                style={{
                  backgroundColor: v.color || "#e0e0e0",
                  border: isLight ? "1px solid #d0d0d0" : "none",
                }}
              />
            )}
          </div>
          <span className="font-medium text-[#1a1a2e]">{v.label}</span>
        </button>
      );
    })}
  </div>
);

export default VariantSelector;
