import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage<number>("prefers-color-scheme", 1);

  useEffect(() => {
    const body = document.body;
    body.classList.remove("theme-two", "theme-three");

    if (theme === 2) {
      body.classList.add("theme-two");
    } else if (theme === 3) {
      body.classList.add("theme-three");
    }
  }, [theme]);

  const handleThemeChange = (themeNumber: number) => {
    setTheme(themeNumber);
  };

  return (
    <div className="flex items-center gap-6">
      <span className="text-sm tracking-widest">THEME</span>
      <div className="flex justify-center items-center gap-4 group">
        <div className="relative w-[70px] h-6 rounded-full flex items-center bg-t1-toggle-background theme-two:bg-t2-toggle-background theme-three:bg-t3-toggle-background">
          {/* Indicator circle */}
          <div
            className={`absolute w-4 h-4 rounded-full shadow-md transition-transform duration-300 bg-t1-key-red theme-two:bg-t2-key-orange theme-three:bg-t3-key-cyan group-hover:brightness-125 ${
              theme === 1
                ? "translate-x-1"
                : theme === 2
                ? "translate-x-[26px]"
                : "translate-x-[50px]"
            }`}
          />

          {/* Clickable areas with theme numbers */}
          <button
            className="absolute w-1/3 h-full left-0 cursor-pointer"
            onClick={() => handleThemeChange(1)}
          >
            <div className="absolute top-[-22px] left-1/2 transform -translate-x-1/2 text-sm pl-0.5">
              1
            </div>
            <div className="sr-only">Theme 1</div>
          </button>
          <button
            className="absolute w-1/3 h-full left-1/3 cursor-pointer"
            onClick={() => handleThemeChange(2)}
          >
            <div className="absolute top-[-22px] left-1/2 transform -translate-x-1/2 text-sm">
              2
            </div>
            <div className="sr-only">Theme 2</div>
          </button>
          <button
            className="absolute w-1/3 h-full left-2/3 cursor-pointer"
            onClick={() => handleThemeChange(3)}
          >
            <div className="absolute top-[-22px] left-1/2 transform -translate-x-1/2 text-sm pr-0.5">
              3
            </div>
            <div className="sr-only">Theme 3</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
