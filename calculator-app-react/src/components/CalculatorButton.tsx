type CalculatorButtonProps = {
  element: string | number;
  onClick: () => void;
  styles?: string;
};

const CalculatorButton = ({
  element,
  onClick,
  styles = "",
}: CalculatorButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center py-2 text-4xl max-sm:text-3xl rounded-lg hover:brightness-125 
        bg-t1-key-background text-t1-dark-grayish-blue shadow-[0px_3px_0px_theme(colors.t1-key-light-orange-shadow)] 
        theme-two:text-inherit theme-two:shadow-[0px_3px_0px_theme(colors.t2-key-light-yellow-shadow)] 
        theme-three:text-inherit theme-three:bg-t3-key-dark-violet theme-three:shadow-[0px_3px_0px_theme(colors.t3-key-dark-magenta-shadow)] ${styles}`}
      onClick={onClick}
    >
      <span className="pt-1.5">{element}</span>
    </button>
  );
};

export default CalculatorButton;
