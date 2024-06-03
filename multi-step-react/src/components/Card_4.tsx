type Props = {
  isChecked: boolean;
  plan: { name: string; pricingMonthly: number; pricingYearly: number };
  addons: {
    service: { active: boolean; pricingMonthly: number; pricingYearly: number };
    storage: { active: boolean; pricingMonthly: number; pricingYearly: number };
    customProfile: {
      active: boolean;
      pricingMonthly: number;
      pricingYearly: number;
    };
  };
  changePlan: () => void;
};

export default function Card_4({ isChecked, addons, plan, changePlan }: Props) {
  const calculateSum = () => {
    let isYearly = isChecked ? "pricingYearly" : "pricingMonthly";
    let sum = (plan as any)[isYearly];

    for (let addon in addons) {
      if ((addons as any)[addon].active)
        sum += (addons as any)[addon][isYearly];
    }

    return sum;
  };

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold text-marine-blue mb-3">
        Finishing up
      </h1>
      <p className="text-cool-gray mb-4 lg:mb-9">
        Double-check everything looks OK before confirming.
      </p>
      <div className="bg-alabaster px-3 rounded-md py-3 text-[15px] lg:px-6">
        <div className="flex items-center justify-between border-b-light-gray border-b-[1px] pb-3 mb-3">
          <div className="flex flex-col items-start">
            <div className="font-medium text-marine-blue lg:text-base">
              {plan.name} {isChecked ? "(Yearly)" : "(Monthly)"}
            </div>
            <button onClick={changePlan} className="text-cool-gray underline">
              Change
            </button>
          </div>
          <div className="text-marine-blue font-bold text-base">
            {isChecked
              ? `$${plan.pricingYearly}/yr`
              : `$${plan.pricingMonthly}/mo`}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {addons.service.active && (
            <div className="flex items-center justify-between">
              <div className="text-cool-gray">Online service</div>
              <div className="text-marine-blue">
                {isChecked
                  ? `$${addons.service.pricingYearly}/yr`
                  : `$${addons.service.pricingMonthly}/mo`}
              </div>
            </div>
          )}
          {addons.storage.active && (
            <div className="flex items-center justify-between">
              <div className="text-cool-gray">Larger storage</div>
              <div className="text-marine-blue">
                {isChecked
                  ? `$${addons.storage.pricingYearly}/yr`
                  : `$${addons.storage.pricingMonthly}/mo`}
              </div>
            </div>
          )}
          {addons.customProfile.active && (
            <div className="flex items-center justify-between">
              <div className="text-cool-gray">Custom profile</div>
              <div className="text-marine-blue">
                {isChecked
                  ? `$${addons.customProfile.pricingYearly}/yr`
                  : `$${addons.customProfile.pricingMonthly}/mo`}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-3 flex items-center justify-between mt-6 lg:px-6">
        <div className="text-cool-gray text-[15px]">
          Total {isChecked ? "(per year)" : "(per month)"}
        </div>
        <div className="text-purplish-blue font-bold lg:text-xl">
          {isChecked ? `+$${calculateSum()}/yr` : `+$${calculateSum()}/mo`}
        </div>
      </div>
    </div>
  );
}
