import { useEffect, useState } from "react";

type Props = {
  nextCard: () => void;
  name: string;
  email: string;
  phone: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Card_1({
  nextCard,
  name,
  email,
  phone,
  handleEmailChange,
  handleNameChange,
  handlePhoneChange,
}: Props) {
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const validate = () => {
    setErrorVisible(true);
    if (!(errorEmail || errorName || errorPhone)) {
      nextCard();
    }
  };

  useEffect(() => {
    setErrorName(false);
    setErrorEmail(false);
    setErrorPhone(false);

    if (!name.trim().length || /[0-9]/g.test(name)) {
      setErrorName(true);
    }

    if (
      !email.trim().length ||
      !/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g.test(email)
    ) {
      setErrorEmail(true);
    }

    if (
      !phone.trim().length ||
      !/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/g.test(phone)
    ) {
      setErrorPhone(true);
    }
  }, [name, email, phone]);

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold text-marine-blue mb-3">
        Personal info
      </h1>
      <p className="text-cool-gray mb-4 lg:mb-9">
        Please provide your name, email address, and phone number.
      </p>
      <form
        className="flex flex-col gap-4 lg:gap-5"
        id="form-1"
        onSubmit={(e) => {
          e.preventDefault();
          validate();
        }}
      >
        <div className="flex flex-col">
          <div className="text-sm flex justify-between">
            <label htmlFor="name" className="text-marine-blue mb-1">
              Name
            </label>
            {errorName &&
              errorVisible &&
              (!name.trim().length ? (
                <span className="text-strawberry-red">
                  This field is required
                </span>
              ) : (
                <span className="text-strawberry-red">
                  Should not contain numbers
                </span>
              ))}
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={`${
              errorVisible && errorName && "border-strawberry-red"
            } border border-light-gray outline-none rounded-md py-2 pl-4 font-medium lg:py-3`}
            placeholder="e.g. Stephen King"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm flex justify-between">
            <label htmlFor="email" className="text-marine-blue mb-1">
              Email Address
            </label>
            {errorEmail &&
              errorVisible &&
              (!email.trim().length ? (
                <span className="text-strawberry-red">
                  This field is required
                </span>
              ) : (
                <span className="text-strawberry-red">Invalid email</span>
              ))}
          </div>
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            className={`${
              errorVisible && errorEmail && "border-strawberry-red"
            } border border-light-gray outline-none rounded-md py-2 pl-4 font-medium lg:py-3`}
            placeholder="e.g. stephenking@lorem.com"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm flex justify-between">
            <label htmlFor="phone" className="text-marine-blue mb-1">
              Phone Number
            </label>
            {errorPhone &&
              errorVisible &&
              (!phone.trim().length ? (
                <span className="text-strawberry-red">
                  This field is required
                </span>
              ) : (
                <span className="text-strawberry-red">
                  Invalid phone number
                </span>
              ))}
          </div>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            className={`${
              errorVisible && errorPhone && "border-strawberry-red"
            } border border-light-gray outline-none rounded-md py-2 pl-4 font-medium lg:py-3`}
            placeholder="e.g. +1 234 567 890"
          />
        </div>
      </form>
    </div>
  );
}
