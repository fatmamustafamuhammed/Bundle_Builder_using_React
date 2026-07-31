import { useState, useEffect, useCallback } from "react";
import { AppContext } from "../context/AppContext";

const defaultSelections = {
  "wyze-cam-v4": { white: 1 },
  "wyze-cam-pan": { white: 2 },
  "wyze-cam-floodlight": { white: 0, black: 0 },
  "wyze-duo-doorbell": { single: 0 },
  "wyze-battery-cam": { white: 0, black: 0 },
  "motion-sensor": { single: 2 },
  "sense-hub": { single: 1 },
  microsd: { single: 2 },
  plan: { "cam-unlimited": 1 },
};

const defaultActiveVariants = {
  "wyze-cam-v4": "white",
  "wyze-cam-pan": "white",
  "wyze-cam-floodlight": null,
  "wyze-duo-doorbell": "single",
  "wyze-battery-cam": null,
  "motion-sensor": "single",
  "sense-hub": "single",
  microsd: "single",
};

const getInitialState = () => {
  const saved = localStorage.getItem("bundle_builder_state");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        const mergedSelections = { ...defaultSelections, ...parsed.selections };
        const mergedActiveVariants = {
          ...defaultActiveVariants,
          ...parsed.activeVariants,
        };
        return {
          ...parsed,
          selections: mergedSelections,
          activeVariants: mergedActiveVariants,
        };
      }
    } catch {
      // ignore malformed saved state
    }
  }
  return {
    selections: defaultSelections,
    activeVariants: defaultActiveVariants,
    activeStep: "cameras",
    selectedPlan: "cam-unlimited",
  };
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("bundle_builder_state", JSON.stringify(state));
  }, [state]);

  const setVariantQuantity = useCallback((productId, variantId, quantity) => {
    setState((prev) => ({
      ...prev,
      selections: {
        ...prev.selections,
        [productId]: {
          ...(prev.selections[productId] || {}),
          [variantId]: Math.max(0, quantity),
        },
      },
    }));
  }, []);

  const setActiveVariant = useCallback((productId, variantId) => {
    setState((prev) => ({
      ...prev,
      activeVariants: { ...prev.activeVariants, [productId]: variantId },
    }));
  }, []);

  const setActiveStep = useCallback((stepId) => {
    setState((prev) => ({ ...prev, activeStep: stepId }));
  }, []);

  const saveSystem = useCallback(() => {}, []);

  return (
    <AppContext.Provider
      value={{
        state,
        setVariantQuantity,
        setActiveVariant,
        setActiveStep,
        saveSystem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
