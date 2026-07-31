const SatisfactionCheckoutBlock = ({ hasSavings, savings, saveSystem }) => (
  <>
    <div className="flex justify-between items-center py-1 mt-2">
      <div className="flex items-center gap-2">
        <img
          src="../assets/images/Satisfaction_Badge_05_1.png"
          alt="Satisfaction guarantee"
          className="w-30 h-30 object-contain"
        />
      </div>
      <div className="flex flex-col items-end">
        <span className="font-semibold text-white bg-[#4E2FD2] px-3 py-1 rounded-md text-sm">
          as low as $19.19/mo
        </span>
        <div className="text-right">
          {hasSavings && (
            <span className="text-[13px] text-[#a0a0b0] line-through mr-2">
              $238.81
            </span>
          )}
          <span className="text-[20px] font-bold text-[#1a1a2e]">
            $187.89
          </span>
        </div>
      </div>
    </div>
    {hasSavings && (
      <div className="mt-1 text-[13px] sm:text-[13px] max-[430px]:text-[11px] text-green-600 font-medium text-center whitespace-nowrap">
        Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
      </div>
    )}
    <button className="mt-1 w-full h-[48px] rounded bg-[#4E2FD2] text-white font-bold py-[13px] px-[16px]">
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
  </>
);

export default SatisfactionCheckoutBlock;