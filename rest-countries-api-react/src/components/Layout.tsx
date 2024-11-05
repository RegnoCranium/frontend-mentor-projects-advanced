import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <div className="mx-auto font-nunito-sans font-light text-sm dark:bg-dark-bg mb-12">
      <Header />
      <main>
        <Outlet />
      </main>
      <div className="mt-10 px-1 text-center text-sm dark:text-white-text-elements">
        Challenge by{" "}
        <a
          className="text-purple-600"
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a className="text-purple-600" href="https://github.com/RegnoCranium">
          RegnoCranium
        </a>
        .
      </div>
    </div>
  );
}

export default Layout;
