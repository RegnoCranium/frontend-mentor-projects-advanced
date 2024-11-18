import Calculator from "./components/Calculator";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  return (
    <div
      className="text-[32px] leading-none min-h-screen h-full flex items-center justify-center max-sm:px-6
    bg-t1-main-background theme-two:bg-t2-main-background theme-three:bg-t3-main-background"
    >
      <main className="w-[550px] my-12 text-t1-white theme-two:text-t2-key-text theme-three:text-t3-light-yellow">
        <div className="flex items-center justify-between mb-6">
          calc <ThemeSwitcher />
        </div>
        <Calculator />
        <div className="mt-10 text-center text-base">
          Challenge by{" "}
          <a
            className="text-t1-key-red theme-three:text-t3-key-cyan"
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
          >
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a
            className="text-t1-key-red theme-three:text-t3-key-cyan"
            href="https://github.com/RegnoCranium"
          >
            RegnoCranium
          </a>
          .
        </div>
      </main>
    </div>
  );
}

export default App;
