const PlanSelector = ({ options, selections, setVariantQuantity }) => {
  const planSel = selections.plan || {};

  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const selected = planSel[opt.id] > 0;
        return (
          <div
            key={opt.id}
            className={`product-card ${selected ? "selected" : ""} cursor-pointer`}
            onClick={() => {
              if (selected) {
                setVariantQuantity("plan", opt.id, 0);
              } else {
                options.forEach((o) => {
                  setVariantQuantity("plan", o.id, o.id === opt.id ? 1 : 0);
                });
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl">
                <img src="../assets/images/plan.png" alt="" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[15px]">{opt.name}</h4>
                <p className="text-[12px] text-[#5a5a6e]">
                  {opt.description || ""}
                </p>
              </div>
              <div className="text-right">
                {opt.comparePrice && (
                  <div className="text-[13px] text-[#a0a0b0] line-through">
                    ${opt.comparePrice.toFixed(2)}/mo
                  </div>
                )}
                <div className="font-semibold text-[15px] text-[#4E2FD2]">
                  ${opt.price.toFixed(2)}/mo
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlanSelector;
