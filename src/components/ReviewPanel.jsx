import QuantityStepper from "./QuantityStepper";
import SatisfactionCheckoutBlock from "./SatisfactionCheckoutBlock";
import { bundleData } from "../data/bundleData";
import { getCategoryForProduct } from "../utils/helpers";

const ReviewPanel = ({
  selections,
  setVariantQuantity,
  saveSystem,
  isTablet,
}) => {
  const items = [];

  const getProduct = (productId) => {
    for (const step of bundleData.steps) {
      if (step.type === "products") {
        const found = step.products.find((p) => p.id === productId);
        if (found) return found;
      }
    }
    return null;
  };
  const getPlan = (planId) => {
    for (const step of bundleData.steps) {
      if (step.type === "plan") {
        const found = step.options.find((o) => o.id === planId);
        if (found) return found;
      }
    }
    return null;
  };

  for (const [productId, variantMap] of Object.entries(selections)) {
    if (productId === "plan") continue;
    const product = getProduct(productId);
    if (!product) continue;
    for (const [variantId, quantity] of Object.entries(variantMap)) {
      if (quantity <= 0) continue;
      const variant = product.variants.find((v) => v.id === variantId);
      if (!variant) continue;

      let price = variant.price;
      let comparePrice = variant.comparePrice;
      if (productId === "wyze-cam-pan") {
        price = 23.99;
        comparePrice = 28.99;
      }
      if (productId === "motion-sensor") {
        price = 29.99;
      }
      if (productId === "microsd") {
        price = 20.98;
      }

      items.push({
        id: `${productId}-${variantId}`,
        productId,
        variantId,
        name: product.name,
        quantity,
        price,
        comparePrice,
        imageUrl: product.imageUrl,
        imageEmoji: product.imageEmoji || "📷",
        category: getCategoryForProduct(productId),
        isPlan: false,
      });
    }
  }

  const planSel = selections.plan || {};
  for (const [planId, qty] of Object.entries(planSel)) {
    if (qty <= 0) continue;
    const plan = getPlan(planId);
    if (plan) {
      items.push({
        id: `plan-${planId}`,
        productId: "plan",
        variantId: planId,
        name: plan.name,
        quantity: 1,
        price: plan.price,
        comparePrice: plan.comparePrice,
        imageUrl: "../assets/SVGs/planInReviewPanel.svg",
        category: "PLAN",
        isPlan: true,
      });
    }
  }

  const grouped = {};
  for (const item of items) {
    const cat = item.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }
  const categoryOrder = ["CAMERAS", "SENSORS", "ACCESSORIES", "PLAN"];

  let subtotal = 0,
    compareSubtotal = 0;
  for (const item of items) {
    subtotal += item.price * item.quantity;
    compareSubtotal += (item.comparePrice ?? item.price) * item.quantity;
  }
  const shipping = items.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;
  const compareTotal = compareSubtotal + shipping;
  const savings = compareTotal - total;
  const hasSavings = savings > 0.01;

  const handleReviewInc = (productId, variantId) => {
    const current = selections[productId]?.[variantId] || 0;
    setVariantQuantity(productId, variantId, current + 1);
  };
  const handleReviewDec = (productId, variantId) => {
    const current = selections[productId]?.[variantId] || 0;
    setVariantQuantity(productId, variantId, Math.max(0, current - 1));
  };

  return (
    <div className="bg-[#f8f9fc] rounded-none p-5">
      {isTablet ? (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 min-w-0">
            <h5 className="font-['Gilroy-Medium', 'Helvetica', 'Arial', 'sans-serif'] font-normal not-italic text-xs leading-none tracking-[1.6px] align-middle uppercase text-[#484848] mb-4">
              Review
            </h5>
            <h3 className="text-[18px] font-bold text-[#1a1a2e] mb-4">
              Your Security System
            </h3>
            <p className="text-[13px] text-[#6F7882] -mt-4 mb-4">
              Review your personalized protection system <br /> designed to keep
              what matters most safe.
            </p>
            <div className="border-b border-[#e8ecf2]"></div>
            {categoryOrder
              .filter((cat) => grouped[cat]?.length)
              .map((cat, index, array) => (
                <div key={cat} className="mb-4 mt-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#7a7a8a] mb-2">
                    {cat}
                  </h4>
                  {grouped[cat].map((item) => {
                    const displayPrice = item.price * item.quantity;
                    const displayCompare =
                      item.comparePrice !== null && item.comparePrice > 0
                        ? item.comparePrice * item.quantity
                        : null;
                    const isFree = item.price === 0;
                    if (item.isPlan) {
                      return (
                        <div
                          key={item.id}
                          className="review-item flex items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-1">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-7 h-7 object-contain -mt-1"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-[15px] -mt-3">
                                {item.name}
                                <span className="ml-1 text-[#4E2FD2] text-[12px] font-bold">
                                  Unlimited
                                </span>
                              </h4>
                            </div>
                          </div>
                          <div className="text-right">
                            {displayCompare !== null &&
                              displayCompare > 0 &&
                              displayCompare > displayPrice && (
                                <div className="text-[15px] text-[#6F7882] line-through">
                                  ${displayCompare.toFixed(2)}/mo
                                </div>
                              )}
                            <div className="font-semibold text-[15px] text-[#4E2FD2]">
                              ${displayPrice.toFixed(2)}/mo
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={item.id}
                        className="review-item flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className="thumb w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm overflow-hidden flex-shrink-0">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-contain bg-white"
                              />
                            ) : (
                              <span>{item.imageEmoji}</span>
                            )}
                          </div>
                          <div className="info min-w-0 flex-1">
                            <div className="name text-sm font-medium text-[#1a1a2e] whitespace-normal break-words">
                              {item.name}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                          <QuantityStepper
                            quantity={item.quantity}
                            onIncrement={() =>
                              handleReviewInc(item.productId, item.variantId)
                            }
                            onDecrement={() =>
                              handleReviewDec(item.productId, item.variantId)
                            }
                            size="small"
                            buttonBg="bg-white"
                          />
                          <div className="text-right flex flex-col items-end min-w-[70px]">
                            {displayCompare !== null &&
                              displayCompare > 0 &&
                              displayCompare > displayPrice && (
                                <span className="text-xs sm:text-sm text-[#6F7882] line-through">
                                  ${displayCompare.toFixed(2)}
                                </span>
                              )}
                            {isFree ? (
                              <span className="text-sm font-semibold text-[#4E2FD2]">
                                FREE
                              </span>
                            ) : (
                              <span className="text-sm font-semibold text-[#4E2FD2]">
                                ${displayPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {index < array.length - 1 && (
                    <div className="border-b border-[#e8ecf2] mt-3"></div>
                  )}
                </div>
              ))}
            {items.length > 0 && (
              <div className="flex justify-between py-1.5 border-t border-[#f0f2f5] mt-2 text-[14px]">
                <div className="flex items-center gap-2">
                  <img
                    src="../assets/SVGs/Fast_Shipping.svg"
                    alt="Fast Shipping"
                    className="w-10 h-10"
                  />
                  <span className="text-[#5a5a6e]">Fast Shipping</span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-s text-[#6F7882] line-through">
                    $5.99
                  </span>
                  <span className="text-sm font-semibold text-[#4E2FD2]">
                    FREE
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 min-w-0">
            <div className="flex items-start gap-3 mb-3">
              <img
                src="../assets/images/Satisfaction_Badge_05_1.png"
                alt="Satisfaction guarantee"
                className="w-30 h-30 object-contain flex-shrink-0"
              />
              <div
                className="text-[18px] leading-[110%] tracking-[0.6px] text-[#1a1a2e]"
                style={{
                  fontFamily: "Gilroy-SemiBold, Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                }}
              >
                30-day hassle-free returns
                <br />
                <br />
                <span className="text-sm font-normal">
                  If you're not totally in love with the product,
                  <br />
                  we will refund you 100%.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-semibold text-white bg-[#4E2FD2] px-3 py-1 rounded-md text-sm whitespace-nowrap">
                as low as $19.19/mo
              </span>
              <div className="flex items-baseline gap-2">
                {hasSavings && (
                  <span className="text-[13px] text-[#6F7882] line-through">
                    $238.81
                  </span>
                )}
                <span className="text-[20px] font-bold text-[#4E2FD2]">
                  $187.89
                </span>
              </div>
            </div>

            {hasSavings && (
              <div className="mt-1 text-[13px] text-green-600 font-medium text-center">
                Congrats! You're saving ${savings.toFixed(2)} on your security
                bundle!
              </div>
            )}

            <button className="mt-4 w-full h-[48px] rounded bg-[#4E2FD2] text-white font-bold py-[13px] px-[16px]">
              Checkout
            </button>

            <div className="mt-3 text-center">
              <a
                className="font-['Gilroy-Medium', 'Helvetica', 'Arial', 'sans-serif'] italic text-sm leading-[1.2] tracking-[-0.02px] underline"
                onClick={(e) => {
                  e.preventDefault();
                  saveSystem();
                  alert("System saved! (localStorage)");
                }}
                href="#"
              >
                Save my system for later
              </a>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h5 className="font-['Gilroy-Medium', 'Helvetica', 'Arial', 'sans-serif'] font-normal not-italic text-xs leading-none tracking-[1.6px] align-middle uppercase text-[#484848] mb-4">
            Review
          </h5>
          <h3 className="text-[18px] font-bold text-[#1a1a2e] mb-4">
            Your Security System
          </h3>
          <p className="text-[13px] text-[#6F7882] -mt-4 mb-4">
            Review your personalized protection system <br /> designed to keep
            what matters most safe.
          </p>
          <div className="border-b border-[#e8ecf2]"></div>
          {categoryOrder
            .filter((cat) => grouped[cat]?.length)
            .map((cat, index, array) => (
              <div key={cat} className="mb-4 mt-4">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#7a7a8a] mb-2">
                  {cat}
                </h4>
                {grouped[cat].map((item) => {
                  const displayPrice = item.price * item.quantity;
                  const displayCompare =
                    item.comparePrice !== null && item.comparePrice > 0
                      ? item.comparePrice * item.quantity
                      : null;
                  const isFree = item.price === 0;
                  if (item.isPlan) {
                    return (
                      <div
                        key={item.id}
                        className="review-item flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-1">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-7 h-7 object-contain -mt-1"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[15px] -mt-3">
                              {item.name}
                              <span className="ml-1 text-[#4E2FD2] text-[12px] font-bold">
                                Unlimited
                              </span>
                            </h4>
                          </div>
                        </div>
                        <div className="text-right">
                          {displayCompare !== null &&
                            displayCompare > 0 &&
                            displayCompare > displayPrice && (
                              <div className="text-[15px] text-[#6F7882] line-through">
                                ${displayCompare.toFixed(2)}/mo
                              </div>
                            )}
                          <div className="font-semibold text-[15px] text-[#4E2FD2]">
                            ${displayPrice.toFixed(2)}/mo
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={item.id}
                      className="review-item flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="thumb w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sm overflow-hidden flex-shrink-0">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-contain bg-white"
                            />
                          ) : (
                            <span>{item.imageEmoji}</span>
                          )}
                        </div>
                        <div className="info min-w-0 flex-1">
                          <div className="name text-sm max-[430px]:text-xs font-medium text-[#1a1a2e] whitespace-normal break-words">
                            {item.name}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        <QuantityStepper
                          quantity={item.quantity}
                          onIncrement={() =>
                            handleReviewInc(item.productId, item.variantId)
                          }
                          onDecrement={() =>
                            handleReviewDec(item.productId, item.variantId)
                          }
                          size="small"
                          buttonBg="bg-white"
                        />
                        <div className="text-right flex flex-col items-end min-w-[50px] sm:min-w-[70px]">
                          {displayCompare !== null &&
                            displayCompare > 0 &&
                            displayCompare > displayPrice && (
                              <span className="text-xs sm:text-sm text-[#6F7882] line-through">
                                ${displayCompare.toFixed(2)}
                              </span>
                            )}
                          {isFree ? (
                            <span className="text-sm font-semibold text-[#4E2FD2]">
                              FREE
                            </span>
                          ) : (
                            <span className="text-sm font-semibold text-[#4E2FD2]">
                              ${displayPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {index < array.length - 1 && (
                  <div className="border-b border-[#e8ecf2] mt-3"></div>
                )}
              </div>
            ))}
          {items.length > 0 && (
            <div className="flex justify-between py-1.5 border-t border-[#f0f2f5] mt-2 text-[14px]">
              <div className="flex items-center gap-2">
                <img
                  src="../assets/SVGs/Fast_Shipping.svg"
                  alt="Fast Shipping"
                  className="w-10 h-10"
                />
                <span className="text-[#5a5a6e]">Fast Shipping</span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-s text-[#6F7882] line-through">
                  $5.99
                </span>
                <span className="text-sm font-semibold text-[#4E2FD2]">
                  FREE
                </span>
              </div>
            </div>
          )}
          <SatisfactionCheckoutBlock
            hasSavings={hasSavings}
            savings={savings}
            saveSystem={saveSystem}
          />
        </>
      )}
    </div>
  );
};

export default ReviewPanel;