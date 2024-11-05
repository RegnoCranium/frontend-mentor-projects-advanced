import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCountryByCode, fetchCountriesByCodes } from "../api/countries";
import LoadingScreen from "../components/LoadingScreen";
import NoCountry from "../components/NoCountry";
import { CountryDetailData, BorderCountry } from "../types/types";

export default function CountryDetail() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState<CountryDetailData | null>(null);
  const [borderCountries, setBorderCountries] = useState<BorderCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (countryCode === undefined) return;
    setLoading(true);
    fetchCountryByCode(countryCode)
      .then((data) => {
        if (data && data.length > 0) {
          setCountry(data[0]);
          if (data[0].borders && data[0].borders.length > 0) {
            fetchCountriesByCodes(data[0].borders).then((borderData) => {
              setBorderCountries(borderData);
            });
          }
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching country:", error);
        setNotFound(true);
        setLoading(false);
      });
  }, [countryCode]);

  if (loading) return <LoadingScreen />;
  if (notFound) return <NoCountry />;
  if (!country) return null;

  return (
    <div className="text-base px-6 dark:text-white-text-elements lg:max-w-[1440px] lg:px-[5%] lg:pt-16 2xl:px-0 2xl:mx-auto">
      <div className="mb-14 w-fit">
        <Link to="/">
          <div className="flex items-center w-fit px-5 py-1 shadow-[0_0_5px_rgba(0,0,0,0.45)] rounded-sm bg-white dark:bg-dark-elements">
            <svg
              className="w-4 mr-2 pb-0.5 dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            Back
          </div>
        </Link>
      </div>
      <div className="lg:flex lg:gap-12 lg:justify-between">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full max-w-[310px] h-[225px] mb-10 lg:mb-0 lg:max-w-none lg:w-auto lg:h-auto lg:max-h-[350px] lg:basis-[38%]"
        />
        <div className="lg:flex lg:flex-col lg:justify-center lg:max-w-[600px]">
          <h2 className="font-extrabold text-xl mb-6 lg:text-3xl">
            {country.name.common}
          </h2>
          <div className="lg:flex lg:gap-28 lg:mb-14">
            <div className="flex flex-col gap-2 mb-8 lg:mb-0">
              <p>
                <span className="font-semibold">Native name:</span>{" "}
                {
                  country.name.nativeName[
                    Object.keys(country.name.nativeName)[0]
                  ].common
                }
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.join(", ")}
              </p>
            </div>

            <div className="flex flex-col gap-2 mb-8 lg:mb-0">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.tld?.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {Object.values(country.currencies)
                  .map((c) => c.name)
                  .join(", ")}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
            </div>
          </div>
          <div className="lg:flex">
            <h3 className="font-semibold text-lg mb-3 lg:mr-3 lg:mb-0 lg:text-nowrap">
              Border Countries:
            </h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {borderCountries.map((borderCountry) => (
                <Link
                  key={borderCountry.cca3}
                  to={`/${borderCountry.ccn3}`}
                  className="lg:h-fit px-3 py-1 border-gray-200 border rounded-sm shadow-md dark:border-transparent dark:bg-dark-elements"
                >
                  {borderCountry.name.common}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
