import { useEffect, useState } from "react";

type countryData = {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  region: string;
  subregion: string;
  population: number;
  capital: string[];
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  borders: string[];
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<countryData[]>([]);
  const [link, setLink] = useState(
    "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,subregion,currencies,tld,languages,borders"
  );
  const [isFilterOpen, setIsfilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isDetailCardOpen, setIsDetailCardOpen] = useState(false);
  const [detailCardInfo, setDetailCardInfo] = useState(data[0]);
  const [cache, setCache] = useState<{ [key: string]: countryData }>({});

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDarkTheme) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    return () => {
      htmlElement.classList.remove("dark");
    };
  }, [isDarkTheme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(link);
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        throw new Error("Error fetching data: " + error);
      }
    };

    fetchData();
  }, [link]);

  useEffect(() => {
    if (detailCardInfo === undefined || !detailCardInfo.borders.length) return;
    const fetchSubData = async () => {
      try {
        setIsLoading(true);
        if (!Object.keys(cache).includes(detailCardInfo.name.common)) {
          const response = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${detailCardInfo.borders.reduce(
              (a, b) => a + "," + b
            )}&fields=name`
          );
          const jsonData = await response.json();
          let i = 0;
          for (let country in jsonData) {
            detailCardInfo.borders[i] = jsonData[country].name.common;
            i++;
          }
          setCache((prev) => {
            const keyD = detailCardInfo.name.common;
            const newCache = {
              ...prev,
              [keyD]: detailCardInfo,
            };
            return newCache;
          });
        } else {
          setDetailCardInfo(cache[detailCardInfo.name.common]);
        }
        setIsLoading(false);
      } catch (error) {
        throw new Error("Error fetching subData: " + error);
      }
    };

    fetchSubData();
  }, [detailCardInfo]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = searchTerm
    ? data.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      )
    : data;

  return (
    <div className="font-nunitoSans mb-10">
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center md:text-3xl text-xl gap-5">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-300 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <div className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            The information is loading...
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col text-sm">
          <header className="flex justify-between items-center dark:shadow-sm mb-6 px-4 lg:px-14 py-8 dark:bg-dark-blue-dark-mode-elements">
            <h1 className="font-extrabold text-base leading-none lg:text-xl">
              Where in the world?
            </h1>
            <button
              onClick={() => setIsDarkTheme((prev) => !prev)}
              className="flex gap-2 items-end"
            >
              <svg
                className="w-5 h-5"
                fill={isDarkTheme ? "#ffffff" : ""}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                {/*Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
              </svg>
              Dark Mode
            </button>
          </header>
          <main>
            {isDetailCardOpen ? (
              <div className="text-base px-7 mx-auto max-w-max lg:mx-0 lg:w-auto lg:px-14">
                <button
                  className="mb-14 mt-2 flex gap-2 items-center dark:bg-dark-blue-dark-mode-elements text-sm rounded-sm shadow-[0_0_10px_0px_rgba(0,0,0,0.5)] font-light px-6 py-1"
                  onClick={() => setIsDetailCardOpen(false)}
                >
                  <svg
                    className="w-3"
                    fill={isDarkTheme ? "#FFFFFF" : ""}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    {/*<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                  Back
                </button>
                <div className="lg:flex gap-28 items-center">
                  <div className="mb-10 lg:shrink-0 lg:mb-0">
                    <img
                      className="w-full max-w-[320px] h-[210px] lg:max-w-[450px] lg:h-[350px]"
                      src={detailCardInfo.flags.png}
                      alt={detailCardInfo.flags.alt}
                    />
                  </div>
                  <div className="flex flex-col lg:w-full">
                    <div className="flex flex-col gap-3 items-start font-light mb-10 lg:flex-row lg:gap-32">
                      <div className="lg:flex flex-col gap-3">
                        <h2 className="text-xl font-extrabold mb-3">
                          {detailCardInfo.name.common}
                        </h2>
                        <div>
                          <span className="font-semibold">Native Name: </span>
                          {
                            detailCardInfo.name.nativeName[
                              Object.keys(detailCardInfo.name.nativeName)[0]
                            ].common
                          }
                        </div>
                        <div>
                          <span className="font-semibold">Population: </span>
                          {String(detailCardInfo.population).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                        </div>
                        <div>
                          <span className="font-semibold">Region: </span>
                          {detailCardInfo.region}
                        </div>
                        <div>
                          <span className="font-semibold">Sub Region: </span>
                          {detailCardInfo.subregion}
                        </div>
                        <div className="mb-8 lg:mb-0">
                          <span className="font-semibold">Capital: </span>
                          {detailCardInfo.capital}
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 lg:pt-[47px]">
                        <div>
                          <span className="font-semibold">
                            Top Level Domain:{" "}
                          </span>
                          {detailCardInfo.tld}
                        </div>
                        <div>
                          <span className="font-semibold">Currencies: </span>
                          {
                            detailCardInfo.currencies[
                              Object.keys(detailCardInfo.currencies)[0]
                            ].name
                          }
                        </div>
                        <div>
                          <span className="font-semibold">Languages: </span>
                          {Object.values(detailCardInfo.languages).reduce(
                            (a, b) => a + ", " + b
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 lg:flex-row">
                      <div className="text-lg font-semibold lg:shrink-0">
                        Border Countries:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {detailCardInfo.borders.map((country) => (
                          <span
                            key={country}
                            className="px-6 py-1 dark:bg-dark-blue-dark-mode-elements rounded-sm shadow-md text-sm"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col px-4 lg:px-14">
                <div className="lg:flex justify-between">
                  <div className="dark:bg-dark-blue-dark-mode-elements dark:shadow-md lg:shrink-0 lg:w-[35%] mb-10 px-10 py-4 flex gap-6 rounded-md">
                    <svg
                      className="w-5 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isDarkTheme ? "#FFFFFF" : "#bababa"}
                      viewBox="0 0 512 512"
                    >
                      {/*<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                    <input
                      className="dark:text-white bg-transparent w-full outline-none dark:placeholder-white"
                      type="text"
                      placeholder="Search for a country..."
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <div className="relative h-max w-max mb-8">
                    <button
                      onClick={() => setIsfilterOpen((prev) => !prev)}
                      className="dark:bg-dark-blue-dark-mode-elements flex justify-between items-center dark:shadow-md px-7 py-5 w-[225px] rounded-md"
                    >
                      {link.includes("all?") ? (
                        "Filter by Region"
                      ) : (
                        <span className="capitalize">
                          {link.match(/\/([^\/?]+)\?/)?.[1] ||
                            "Filter by Region"}
                        </span>
                      )}
                      <svg
                        className="w-[10px] h-[10px]"
                        fill={isDarkTheme ? "#ffffff" : ""}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        {/*<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </button>
                    {isFilterOpen && (
                      <div className="absolute flex flex-col gap-2 w-full px-7 py-5 rounded-md left-0 top-16 z-50 bg-white dark:bg-dark-blue-dark-mode-elements">
                        {!link.includes("all?") && (
                          <button
                            onClick={() => {
                              setLink(
                                "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,subregion,currencies,tld,languages,borders"
                              );
                              setIsfilterOpen(false);
                            }}
                            className="w-full flex items-start"
                          >
                            All
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setLink(
                              "https://restcountries.com/v3.1/region/africa?fields=name,flags,region,population,capital,subregion,currencies,tld,languages,borders"
                            );
                            setIsfilterOpen(false);
                          }}
                          className="w-full flex items-start"
                        >
                          Africa
                        </button>
                        <button
                          onClick={() => {
                            setLink(
                              "https://restcountries.com/v3.1/region/americas?fields=name,flags,region,population,capital,subregion,currencies,tld,languages,borders"
                            );
                            setIsfilterOpen(false);
                          }}
                          className="w-full flex items-start"
                        >
                          America
                        </button>
                        <button
                          onClick={() => {
                            setLink(
                              "https://restcountries.com/v3.1/region/asia?fields=name,flags,region,population,capital,subregion,currencies,tld,languages,borders"
                            );
                            setIsfilterOpen(false);
                          }}
                          className="w-full flex items-start"
                        >
                          Asia
                        </button>
                        <button
                          onClick={() => {
                            setLink(
                              "https://restcountries.com/v3.1/region/europe?fields=name,flags,region,population,capital,subregion,currencies,tld,languages,borders"
                            );
                            setIsfilterOpen(false);
                          }}
                          className="w-full flex items-start"
                        >
                          Europe
                        </button>
                        <button
                          onClick={() => {
                            setLink(
                              "https://restcountries.com/v3.1/region/oceania?fields=name,flags,region,population,capital,subregion,currencies,tld,languages,borders"
                            );
                            setIsfilterOpen(false);
                          }}
                          className="w-full flex items-start"
                        >
                          Oceania
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-10 items-center lg:flex-row lg:flex-wrap lg:justify-between lg:gap-16">
                  {filteredData.map((countryData, i) => (
                    <div
                      key={i}
                      className="hover:cursor-pointer w-[260px] h-[320px] flex flex-col lg:shrink-0 overflow-hidden rounded-md dark:bg-dark-blue-dark-mode-elements dark:shadow-sm"
                      onClick={() => {
                        setDetailCardInfo(countryData);
                        setIsDetailCardOpen(true);
                      }}
                    >
                      <img
                        className="w-full h-[160px]"
                        src={countryData.flags.png}
                        alt={countryData.flags.alt}
                      />
                      <div className="px-6 pt-6 pb-8">
                        <h2 className="text-[17px] font-extrabold mb-4">
                          {countryData.name.common}
                        </h2>
                        <div className="flex flex-col gap-1 font-light">
                          <div>
                            <span className="font-semibold">Population:</span>{" "}
                            {String(countryData.population).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                          </div>
                          <div>
                            <span className="font-semibold">Region:</span>{" "}
                            {countryData.region}
                          </div>
                          <div>
                            <span className="font-semibold">Capital:</span>{" "}
                            {countryData.capital.map((capital, i) => {
                              if (i === countryData.capital.length - 1) {
                                return capital;
                              } else {
                                return capital + ", ";
                              }
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
