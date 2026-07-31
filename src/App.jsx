import { useEffect, useState } from "react";
import { useApp } from "./hook/useApp.js";
import { bundleData } from "./data/bundleData";
import Step from "./components/Step";
import ProductCard from "./components/ProductCard";
import PlanSelector from "./components/PlanSelector";
import ReviewPanel from "./components/ReviewPanel";

function App() {
  const {
    state,
    setVariantQuantity,
    setActiveVariant,
    setActiveStep,
    saveSystem,
  } = useApp();
  const { selections, activeVariants, activeStep } = state;

  const handleStepToggle = (stepId) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 430px)");
    if (mq.matches) {
      setActiveStep(null);
    }
  }, [setActiveStep]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 430px)");
    const handler = (e) => {
      if (e.matches) {
        setActiveStep(null);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [setActiveStep]);

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w >= 431 && w <= 1024) {
        setIsTablet(true);
      } else if (w === 1440 && h >= 1600) {
        setIsTablet(true);
      } else {
        setIsTablet(false);
      }
    };

    checkTablet();
    window.addEventListener("resize", checkTablet);
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  useEffect(() => {
    if (isTablet) {
      setActiveStep("cameras");
    }
  }, [isTablet, setActiveStep]);

  return (
    <div className="min-h-screen bg-white px-0 md:px-6 pt-6 md:pt-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`two-col flex ${
            isTablet ? "flex-col" : ""
          } gap-6 items-start`}
        >
          <div
            className={`left ${isTablet ? "w-full" : "w-[70%]"} min-w-0 mt-0`}
          >
            <h1 className="block md:hidden text-2xl font-bold text-[#1a1a2e] text-center px-4 pt-2 pb-2">
              Let's get started!
            </h1>
            <div className="p-0 md:p-4 pt-2 md:pt-0">
              {bundleData.steps.map((step) => {
                const isOpen = activeStep === step.id;
                let content = null;

                if (step.type === "products") {
                  const containerClass =
                    step.id === "cameras" && isTablet
                      ? "flex flex-nowrap justify-between items-stretch gap-4 mx-2"
                      : "flex flex-wrap justify-center items-stretch gap-4 mx-2";

                  content = (
                    <div className={containerClass}>
                      {step.products.map((product) => {
                        const activeVid = activeVariants[product.id] ?? null;
                        const cardClass =
                          step.id === "cameras" && isTablet
                            ? "flex-1 min-w-0 flex"
                            : "w-[calc(50%-8px)] min-w-[280px] max-w-[400px] flex";

                        return (
                          <div key={product.id} className={cardClass}>
                            <ProductCard
                              product={product}
                              selections={selections}
                              activeVariantId={activeVid}
                              onSetVariant={setVariantQuantity}
                              onSetActive={setActiveVariant}
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                } else if (step.type === "plan") {
                  content = (
                    <PlanSelector
                      options={step.options}
                      selections={selections}
                      setVariantQuantity={setVariantQuantity}
                    />
                  );
                }

                return (
                  <Step
                    key={step.id}
                    step={step}
                    isOpen={isOpen}
                    onToggle={() => handleStepToggle(step.id)}
                    selections={selections}
                    activeVariants={activeVariants}
                    setVariantQuantity={setVariantQuantity}
                    setActiveVariant={setActiveVariant}
                  >
                    {content}
                  </Step>
                );
              })}
            </div>
          </div>

          <div className={`right ${isTablet ? "w-full" : "w-[38%]"} min-w-0`}>
            <ReviewPanel
              selections={selections}
              activeVariants={activeVariants}
              setVariantQuantity={setVariantQuantity}
              setActiveVariant={setActiveVariant}
              saveSystem={saveSystem}
              isTablet={isTablet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;