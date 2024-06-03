type Props = {
  isChecked: boolean;
  addons: {
    service: { active: boolean; pricingMonthly: number; pricingYearly: number };
    storage: { active: boolean; pricingMonthly: number; pricingYearly: number };
    customProfile: {
      active: boolean;
      pricingMonthly: number;
      pricingYearly: number;
    };
  };
  handleAddonsChange: (addon: "service" | "storage" | "customProfile") => void;
};

export default function Card_3({
  isChecked,
  addons,
  handleAddonsChange,
}: Props) {
  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold text-marine-blue mb-3">
        Pick add-ons
      </h1>
      <p className="text-cool-gray mb-4 lg:mb-9">
        Add-ons help enhance your gaming experience.
      </p>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleAddonsChange("service")}
          className={`${
            addons.service.active
              ? "border-marine-blue bg-alabaster"
              : "border-light-gray"
          } flex w-full p-4 border rounded-lg items-center lg:p-5`}
        >
          <span
            className={`${
              addons.service.active
                ? "bg-purplish-blue border-purplish-blue"
                : "border-light-gray"
            } w-5 h-5 flex border rounded-md items-center justify-center mr-3 lg:mr-5 p-[1px] shrink-0`}
          >
            {addons.service.active && (
              <img src="images/icon-checkmark.svg" alt="Checkmark" />
            )}
          </span>
          <div className="flex flex-col items-start">
            <h2 className="text-marine-blue font-medium">Online service</h2>
            <span className="text-xs text-cool-gray lg:text-sm">
              Access to multiplayer games
            </span>
          </div>
          <span className="text-[13px] ml-auto text-purplish-blue shrink-0 lg:text-sm">
            {isChecked ? "+$10/yr" : "+$1/mo"}
          </span>
        </button>
        <button
          onClick={() => handleAddonsChange("storage")}
          className={`${
            addons.storage.active
              ? "border-marine-blue bg-alabaster"
              : "border-light-gray"
          } flex w-full p-4 border rounded-lg items-center lg:p-5`}
        >
          <span
            className={`${
              addons.storage.active
                ? "bg-purplish-blue border-purplish-blue"
                : "border-light-gray"
            } w-5 h-5 flex border rounded-md items-center justify-center mr-3 lg:mr-5 p-[1px]`}
          >
            {addons.storage.active && (
              <img src="images/icon-checkmark.svg" alt="Checkmark" />
            )}
          </span>
          <div className="flex flex-col items-start">
            <h2 className="text-marine-blue font-medium">Larger storage</h2>
            <span className="text-xs text-cool-gray lg:text-sm">
              Extra 1TB of cloud save
            </span>
          </div>
          <span className="text-[13px] ml-auto text-purplish-blue shrink-0 lg:text-sm">
            {isChecked ? "+$20/yr" : "+$2/mo"}
          </span>
        </button>
        <button
          onClick={() => handleAddonsChange("customProfile")}
          className={`${
            addons.customProfile.active
              ? "border-marine-blue bg-alabaster"
              : "border-light-gray"
          } flex w-full p-4 border rounded-lg items-center lg:p-5`}
        >
          <span
            className={`${
              addons.customProfile.active
                ? "bg-purplish-blue border-purplish-blue"
                : "border-light-gray"
            } w-5 h-5 flex border rounded-md items-center justify-center mr-3 lg:mr-5 p-[1px]`}
          >
            {addons.customProfile.active && (
              <img src="images/icon-checkmark.svg" alt="Checkmark" />
            )}
          </span>
          <div className="flex flex-col items-start">
            <h2 className="text-marine-blue font-medium">
              Customizable profile
            </h2>
            <span className="text-xs text-cool-gray lg:text-sm">
              Custom theme on your profile
            </span>
          </div>
          <span className="text-[13px] ml-auto text-purplish-blue shrink-0 lg:text-sm">
            {isChecked ? "+$20/yr" : "+$2/mo"}
          </span>
        </button>
      </div>
    </div>
  );
}
