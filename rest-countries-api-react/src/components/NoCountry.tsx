import { Link } from "react-router-dom";

function NoCountry() {
  return (
    <div className="flex flex-col items-center justify-center mt-[20vh] text-center dark:text-white-text-elements">
      <div className="text-6xl animate-spin inline-block">:(</div>
      <h2 className="text-2xl mt-4">Country Not Found</h2>
      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-white dark:bg-dark-elements rounded shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NoCountry;
