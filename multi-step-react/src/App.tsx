import { useState } from "react";
import Card_1 from "./components/Card_1";
import Card_2 from "./components/Card_2";
import Card_3 from "./components/Card_3";
import Card_4 from "./components/Card_4";
import Success from "./components/Success";

const steps = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];
const plans = {
  arcade: { name: "Arcade", pricingMonthly: 9, pricingYearly: 90 },
  advanced: { name: "Advanced", pricingMonthly: 12, pricingYearly: 120 },
  pro: { name: "Pro", pricingMonthly: 15, pricingYearly: 150 },
};

function App() {
  const [card, setCard] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false); // false - monthly, true - yearly
  const [plan, setPlan] = useState(plans.arcade);
  const [addons, setAddons] = useState({
    service: { active: false, pricingMonthly: 1, pricingYearly: 10 },
    storage: { active: false, pricingMonthly: 2, pricingYearly: 20 },
    customProfile: { active: false, pricingMonthly: 2, pricingYearly: 20 },
  });

  const nextCard = () => {
    setCard((prev) => prev + 1);
  };

  const prevCard = () => {
    setCard((prev) => (prev - 1 === 0 ? 1 : prev - 1));
  };

  const renderCard = () => {
    switch (card) {
      case 1:
        return (
          <Card_1
            nextCard={nextCard}
            name={name}
            email={email}
            phone={phone}
            handleEmailChange={handleEmailChange}
            handleNameChange={handleNameChange}
            handlePhoneChange={handlePhoneChange}
          />
        );
      case 2:
        return (
          <Card_2
            plan={plan}
            plans={plans}
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
            handlePlanChange={handlePlanChange}
          />
        );
      case 3:
        return (
          <Card_3
            isChecked={isChecked}
            addons={addons}
            handleAddonsChange={handleAddonsChange}
          />
        );
      case 4:
        return (
          <Card_4
            isChecked={isChecked}
            addons={addons}
            plan={plan}
            changePlan={() => setCard(2)}
          />
        );
      case 5:
        return <Success />;
      default:
        return "No page found";
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePlanChange = (plan: {
    name: string;
    pricingMonthly: number;
    pricingYearly: number;
  }) => {
    setPlan(plan);
  };

  const handleAddonsChange = (
    addon: "service" | "storage" | "customProfile"
  ) => {
    setAddons({
      ...addons,
      [addon]: {
        ...addons[addon],
        active: !addons[addon].active,
      },
    });
  };

  return (
    <div className="text-base font-ubuntu w-full min-h-screen px-4 mb-12 lg:flex lg:items-center lg:justify-center">
      <div className="lg:hidden absolute left-0 top-0 z-[-1] w-full h-[172px] overflow-hidden">
        <img
          className="w-full"
          src="images/bg-sidebar-mobile.svg"
          alt="Background image"
        />
      </div>
      <div className="w-full pt-8 mb-4 lg:flex lg:gap-16 lg:w-[880px] lg:h-auto lg:pt-4 lg:p-4 lg:mb-0 lg:shadow-lg lg:rounded-lg lg:items-center">
        <div className="flex gap-4 font-bold justify-center text-sm text-white mb-8 lg:flex-col lg:h-[568px] lg:w-[274px] lg:m-0 lg:relative lg:justify-normal lg:items-start lg:p-7 lg:gap-8 lg:shrink-0">
          {steps.map((text, index) => (
            <div key={index} className="lg:flex gap-4">
              <div
                className={`${
                  index + 1 === card || (card === 5 && index + 1 === 4)
                    ? "bg-light-blue border-light-blue text-marine-blue"
                    : "border-white"
                } border rounded-full w-8 h-8 flex justify-center items-center`}
              >
                {index + 1}
              </div>
              <div className="hidden lg:flex flex-col gap-1">
                <span className="text-[13px] text-cool-gray font-thin leading-none">
                  STEP {index + 1}
                </span>
                <span className="uppercase text-white tracking-wider">
                  {text}
                </span>
              </div>
            </div>
          ))}
          <div className="hidden lg:block absolute left-0 top-0 z-[-1] w-full h-full">
            <img
              className="w-full h-full"
              src="images/bg-sidebar-desktop.svg"
              alt="Background image"
            />
          </div>
        </div>
        <div className="lg:flex lg:flex-col lg:h-[568px] lg:justify-between">
          <main className="bg-white px-6 py-8 rounded-lg shadow-md mb-24 lg:m-0 lg:shadow-none lg:px-4">
            {renderCard()}
          </main>
          {card !== 5 && (
            <div className="fixed lg:static bottom-0 left-0 w-full flex justify-between items-center h-[75px] lg:h-[78px] lg:w-[490px] bg-white font-medium px-4 py-4">
              {card !== 1 && (
                <button onClick={prevCard} className="text-cool-gray">
                  Go Back
                </button>
              )}
              {card === 1 ? (
                <button
                  type="submit"
                  form="form-1"
                  className="h-full ml-auto bg-marine-blue text-white flex justify-center items-center w-[110px] lg:w-[120px] rounded-md"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={nextCard}
                  className={`${
                    card === 4 ? "bg-purplish-blue" : "bg-marine-blue"
                  } h-full ml-auto text-white flex justify-center items-center w-[110px] lg:w-[120px] rounded-md`}
                >
                  {card === 4 ? "Confirm" : "Next Step"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
