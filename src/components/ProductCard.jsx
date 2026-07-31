import React from "react";
import QuantityStepper from "./QuantityStepper";
import VariantSelector from "./VariantSelector";

const ProductCard = ({
  product,
  selections,
  activeVariantId,
  onSetVariant,
  onSetActive,
}) => {
  const {
    id,
    name,
    description,
    learnMoreUrl,
    badge,
    imageEmoji,
    variants,
    imageUrl: productImage,
  } = product;

  const hasVariants = variants && variants.length > 0;
  const totalQty = Object.values(selections[id] || {}).reduce(
    (sum, q) => sum + q,
    0,
  );
  const isSelected = totalQty > 0;

  let effectiveVariantId = null;
  if (hasVariants) {
    if (variants.length === 1) {
      effectiveVariantId = variants[0].id;
    } else {
      effectiveVariantId =
        isSelected && activeVariantId ? activeVariantId : null;
    }
  }

  const activeVariant =
    hasVariants && effectiveVariantId
      ? variants.find((v) => v.id === effectiveVariantId)
      : null;

  const displayVariant = activeVariant || (hasVariants ? variants[0] : null);

  const displayPrice = displayVariant ? displayVariant.price : 0;
  const comparePrice = displayVariant ? displayVariant.comparePrice : null;
  const activeQty =
    (selections[id] && effectiveVariantId
      ? selections[id][effectiveVariantId]
      : 0) || 0;

  const imageToShow = productImage || imageEmoji || "📷";

  const handleInc = () => {
    if (effectiveVariantId) {
      onSetVariant(id, effectiveVariantId, activeQty + 1);
    } else if (hasVariants && variants.length > 0) {
      const firstVariantId = variants[0].id;
      onSetVariant(id, firstVariantId, 1);
      onSetActive(id, firstVariantId);
    }
  };

  const handleDec = () => {
    if (effectiveVariantId) {
      const newQty = Math.max(0, activeQty - 1);
      onSetVariant(id, effectiveVariantId, newQty);
      if (newQty === 0 && variants.length > 1) {
        onSetActive(id, null);
      }
    }
  };

  const hasDiscount =
    comparePrice !== null &&
    comparePrice !== undefined &&
    comparePrice > displayPrice;
  const showColorSelector = hasVariants && variants.length > 1;

  const priceStyle = {
    fontFamily: "Gilroy-Regular",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "100%",
    letterSpacing: "0.6px",
    textAlign: "right",
    verticalAlign: "middle",
  };

  const strikePriceStyle = {
    ...priceStyle,
    textDecoration: "line-through",
    color: "#D8392B",
  };

  const normalPriceStyle = {
    ...priceStyle,
    color: "#575757",
  };

  const freePriceStyle = {
    ...priceStyle,
    color: "#575757",
  };

  return (
    <div
      className={`product-card relative w-full h-auto flex flex-col ${
        isSelected ? "selected" : ""
      }`}
      style={{ padding: "10px 12px 12px" }}
    >
      {badge && (
        <div className="absolute top-1.5 left-2 z-10">
          <span className="badge">{badge}</span>
        </div>
      )}

      <div className="flex-1 flex items-center gap-2 pt-1">
        <div className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
          {typeof imageToShow === "string" &&
          (imageToShow.startsWith("/") ||
            imageToShow.startsWith(".") ||
            imageToShow.startsWith("http")) ? (
            <img
              src={imageToShow}
              alt={name}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-4xl">{imageToShow}</span>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-0.5">
          <h4 className="font-semibold text-[14px] text-[#1a1a2e] leading-tight">
            {name}
          </h4>
          <p className="text-[12px] text-[#5a5a6e] leading-tight line-clamp-2">
            {description}
          </p>
          <a
            href={learnMoreUrl}
            className="text-[12px] text-[#2d7aff] font-medium hover:underline inline-block"
          >
            Learn More
          </a>

          {showColorSelector && (
            <div className="mt-0.5">
              <VariantSelector
                variants={variants}
                activeVariantId={effectiveVariantId}
                onSelect={(vid) => {
                  const currentQty = selections[id]?.[vid] || 0;
                  if (currentQty === 0) {
                    onSetVariant(id, vid, 1);
                  }
                  onSetActive(id, vid);
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-0.5">
            <div className="flex-shrink-0">
              {hasVariants ? (
                <QuantityStepper
                  quantity={activeQty}
                  onIncrement={handleInc}
                  onDecrement={handleDec}
                />
              ) : (
                <span className="text-sm text-[#a0a0b0]">—</span>
              )}
            </div>

            <div className="text-right flex flex-col items-end">
              {hasDiscount && (
                <span style={strikePriceStyle}>${comparePrice.toFixed(2)}</span>
              )}
              {displayPrice === 0 ? (
                <span style={freePriceStyle}>FREE</span>
              ) : (
                <span style={normalPriceStyle}>${displayPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
