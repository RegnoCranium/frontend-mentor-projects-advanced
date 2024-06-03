type Props = {
  isChecked: boolean;
  plan: { name: string; pricingMonthly: number; pricingYearly: number };
  handleCheckboxChange: () => void;
  handlePlanChange: (plan: {
    name: string;
    pricingMonthly: number;
    pricingYearly: number;
  }) => void;
  plans: {
    arcade: { name: string; pricingMonthly: number; pricingYearly: number };
    advanced: { name: string; pricingMonthly: number; pricingYearly: number };
    pro: { name: string; pricingMonthly: number; pricingYearly: number };
  };
};

export default function Card_2({
  isChecked,
  plan,
  plans,
  handleCheckboxChange,
  handlePlanChange,
}: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl lg:text-3xl font-bold text-marine-blue mb-3">
        Select your plan
      </h1>
      <p className="text-cool-gray mb-4 lg:mb-9">
        You have the option of monthly or yearly billing.
      </p>
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <button
          className={`${
            plan.name === plans.arcade.name
              ? "border-marine-blue bg-alabaster"
              : ""
          } flex lg:flex-col p-4 border border-light-gray rounded-lg items-start gap-4 lg:gap-12 lg:w-full`}
          onClick={() => handlePlanChange(plans.arcade)}
        >
          <img src="./images/icon-arcade.svg" alt="Arcade icon" />
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-marine-blue w-max leading-none mb-2">
              Arcade
            </h2>
            <span className="text-sm text-cool-gray w-max mb-[6px] leading-none">
              {isChecked
                ? `$${plans.arcade.pricingYearly}/yr`
                : `$${plans.arcade.pricingMonthly}/mo`}
            </span>
            {isChecked && (
              <span className="text-marine-blue text-sm font-medium">
                2 months free
              </span>
            )}
          </div>
        </button>
        <button
          className={`${
            plan.name === plans.advanced.name
              ? "border-marine-blue bg-alabaster"
              : ""
          } flex lg:flex-col p-4 border border-light-gray rounded-lg items-start gap-4 lg:gap-12 lg:w-full`}
          onClick={() => handlePlanChange(plans.advanced)}
        >
          <img src="./images/icon-advanced.svg" alt="Advanced icon" />
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-marine-blue w-max leading-none mb-2">
              Advanced
            </h2>
            <span className="text-sm text-cool-gray w-max mb-[6px] leading-none">
              {isChecked
                ? `$${plans.advanced.pricingYearly}/yr`
                : `$${plans.advanced.pricingMonthly}/mo`}
            </span>
            {isChecked && (
              <span className="text-marine-blue text-sm font-medium">
                2 months free
              </span>
            )}
          </div>
        </button>
        <button
          className={`${
            plan.name === plans.pro.name
              ? "border-marine-blue bg-alabaster"
              : ""
          } flex lg:flex-col p-4 border border-light-gray rounded-lg items-start gap-4 lg:gap-12 lg:w-full`}
          onClick={() => handlePlanChange(plans.pro)}
        >
          <img src="./images/icon-pro.svg" alt="Pro icon" />
          <div className="flex flex-col">
            <h2 className="text-base font-bold text-marine-blue w-max leading-none mb-2">
              Pro
            </h2>
            <span className="text-sm text-cool-gray w-max mb-[6px] leading-none">
              {isChecked
                ? `$${plans.pro.pricingYearly}/yr`
                : `$${plans.pro.pricingMonthly}/mo`}
            </span>
            {isChecked && (
              <span className="text-marine-blue text-sm font-medium">
                2 months free
              </span>
            )}
          </div>
        </button>
      </div>
      <div className="w-full h-12 bg-magnolia rounded-md flex items-center justify-center gap-6">
        <span
          className={`font-medium ${
            isChecked ? "text-cool-gray" : "text-marine-blue"
          }`}
        >
          Monthly
        </span>
        <label
          htmlFor="check-1"
          className="relative w-10 h-5 bg-marine-blue rounded-xl cursor-pointer"
        >
          <input
            className="w-0 h-0 opacity-0 peer"
            type="checkbox"
            id="check-1"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="absolute top-[20%] left-[10%] w-3 h-3 bg-white rounded-full transition-all duration-300 peer-checked:left-[60%]" />
        </label>
        <span
          className={`font-medium ${
            isChecked ? "text-marine-blue" : "text-cool-gray"
          }`}
        >
          Yearly
        </span>
      </div>
    </div>
  );
}
