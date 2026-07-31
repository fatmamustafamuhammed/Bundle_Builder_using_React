import { bundleData } from "../data/bundleData";

export const getCategoryForProduct = (productId) => {
  for (const step of bundleData.steps) {
    if (step.type === "products") {
      const found = step.products.find((p) => p.id === productId);
      if (found) {
        if (step.id === "cameras") return "CAMERAS";
        if (step.id === "sensors") return "SENSORS";
        if (step.id === "extra") return "ACCESSORIES";
        return step.title.toUpperCase();
      }
    }
  }
  return "PRODUCTS";
};
