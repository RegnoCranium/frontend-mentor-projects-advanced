function Success() {
  return (
    <div className="flex flex-col items-center lg:w-auto">
      <img
        className="scale-[70%] mt-6 mb-3 lg:scale-100 lg:mt-32 lg:mb-6"
        src="images/icon-thank-you.svg"
        alt="Thank you icon"
      />
      <h1 className="text-2xl lg:text-3xl font-bold text-marine-blue mb-3 lg:mb-4">
        Thank you!
      </h1>
      <p className="text-cool-gray mb-4 text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}

export default Success;
