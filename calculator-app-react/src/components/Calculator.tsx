import { useState } from "react";
import CalculatorButton from "./CalculatorButton";

type CalculatorState = {
  display: string;
  operation: string | null;
  value: number | null;
  newNumber: boolean;
};

const Calculator = () => {
  const [data, setData] = useState<CalculatorState>({
    display: "0",
    operation: null,
    value: null,
    newNumber: true,
  });

  const handleNumber = (num: number) => {
    setData((prev) => ({
      ...prev,
      display: prev.newNumber ? num.toString() : prev.display + num.toString(),
      newNumber: false,
    }));
  };

  const handleDot = () => {
    if (!data.display.includes(".")) {
      setData((prev) => ({
        ...prev,
        display: prev.display + ".",
        newNumber: false,
      }));
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(data.display);

    if (data.value !== null && !data.newNumber) {
      // If we already have a value and operation, perform the calculation
      const result = calculateResult(data.value, currentValue, data.operation!);
      setData({
        display: result.toString(),
        operation: op,
        value: result,
        newNumber: true,
      });
    } else {
      // First operation or consecutive operations
      setData({
        display: data.display,
        operation: op,
        value: currentValue,
        newNumber: true,
      });
    }
  };

  const calculateResult = (a: number, b: number, operation: string): number => {
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "x":
        return a * b;
      case "/":
        return b === 0 ? 0 : a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (data.operation && data.value !== null && !data.newNumber) {
      const currentValue = parseFloat(data.display);
      const result = calculateResult(data.value, currentValue, data.operation);

      setData({
        display: result.toString(),
        operation: null,
        value: null,
        newNumber: true,
      });
    }
  };

  const handleDelete = () => {
    if (data.display.length > 1 && !data.newNumber) {
      setData((prev) => ({
        ...prev,
        display: prev.display.slice(0, -1),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        display: "0",
        newNumber: true,
      }));
    }
  };

  const handleReset = () => {
    setData({
      display: "0",
      operation: null,
      value: null,
      newNumber: true,
    });
  };

  return (
    <div>
      <div
        className="flex items-center justify-end px-6 py-7 rounded-lg text-right text-5xl leading-none mb-5
      text-inherit bg-t1-screen-background theme-two:bg-t2-screen-background theme-three:bg-t3-screen-background"
      >
        <span className="h-[40px] inline-block max-w-[70vw] overflow-x-scroll overflow-y-hidden scrollbar-hide">
          {data.display}
        </span>
      </div>
      <div
        className="grid grid-cols-4 gap-5 p-8 rounded-lg max-sm:gap-3 max-sm:gap-y-4 max-sm:p-6
      bg-t1-toggle-background theme-two:bg-t2-toggle-background theme-three:bg-t3-screen-background"
      >
        <CalculatorButton element={7} onClick={() => handleNumber(7)} />
        <CalculatorButton element={8} onClick={() => handleNumber(8)} />
        <CalculatorButton element={9} onClick={() => handleNumber(9)} />
        <CalculatorButton
          element="DEL"
          onClick={handleDelete}
          styles="!text-[32px] max-sm:!text-[22px] !text-t1-white bg-t1-key-background-sp
          !shadow-[0px_3px_0px_theme(colors.t1-key-shadow)] theme-two:bg-t2-key-background theme-two:!shadow-[0px_3px_0px_theme(colors.t2-key-shadow)] 
          theme-three:bg-t3-key-background theme-three:!shadow-[0px_3px_0px_theme(colors.t3-key-shadow)]"
        />

        <CalculatorButton element={4} onClick={() => handleNumber(4)} />
        <CalculatorButton element={5} onClick={() => handleNumber(5)} />
        <CalculatorButton element={6} onClick={() => handleNumber(6)} />
        <CalculatorButton element="+" onClick={() => handleOperation("+")} />

        <CalculatorButton element={1} onClick={() => handleNumber(1)} />
        <CalculatorButton element={2} onClick={() => handleNumber(2)} />
        <CalculatorButton element={3} onClick={() => handleNumber(3)} />
        <CalculatorButton element="-" onClick={() => handleOperation("-")} />

        <CalculatorButton element="." onClick={handleDot} />
        <CalculatorButton element={0} onClick={() => handleNumber(0)} />
        <CalculatorButton element="/" onClick={() => handleOperation("/")} />
        <CalculatorButton element="x" onClick={() => handleOperation("x")} />

        <CalculatorButton
          element="RESET"
          onClick={handleReset}
          styles="col-span-2 !text-[32px] max-sm:!text-[22px] !text-t1-white bg-t1-key-background-sp 
          !shadow-[0px_3px_0px_theme(colors.t1-key-shadow)] theme-two:bg-t2-key-background theme-two:!shadow-[0px_3px_0px_theme(colors.t2-key-shadow)] 
          theme-three:bg-t3-key-background theme-three:!shadow-[0px_3px_0px_theme(colors.t3-key-shadow)]"
        />
        <CalculatorButton
          element="="
          onClick={handleEquals}
          styles="col-span-2 !text-t1-white bg-t1-key-red max-sm:!text-[22px]
          !shadow-[0px_3px_0px_theme(colors.t1-key-red-shadow)] theme-two:bg-t2-key-orange theme-two:!shadow-[0px_3px_0px_theme(colors.t2-key-orange-shadow)] 
          theme-three:!text-t3-very-dark-blue theme-three:!bg-t3-key-cyan theme-three:!shadow-[0px_3px_0px_theme(colors.t3-key-cyan-shadow)]"
        />
      </div>
    </div>
  );
};

export default Calculator;
