import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllCountries } from "../api/countries";
import CountryCard from "../components/CountryCard";
import useLocalStorage from "../hooks/useLocalStorage";
import LoadingScreen from "../components/LoadingScreen";
import { CountryHome } from "../types/types";

const COUNTRIES_STORAGE_KEY = "countries-data-v1";

function Home() {
  const [countries, setCountries] = useLocalStorage<CountryHome[]>(
    COUNTRIES_STORAGE_KEY,
    []
  );
  const [filteredCountries, setFilteredCountries] = useState<CountryHome[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (countries.length === 0) {
      fetchAllCountries().then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      });
    } else {
      setFilteredCountries(countries);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filtered = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRegion === "" || country.region === selectedRegion)
    );
    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setIsDropdownOpen(false);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="px-4 lg:px-[5%]">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-10 mb-8">
        <div className="flex gap-4 py-3 px-6 rounded outline-none lg:w-1/4 dark:bg-dark-elements">
          <svg
            className="h-full w-4 fill-gray-400 dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={handleSearch}
            className="outline-none bg-transparent w-full dark:text-white-text-elements"
          />
        </div>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative py-3 px-6 rounded w-44 dark:bg-dark-elements dark:text-white-text-elements"
        >
          <div className="flex items-center justify-between gap-5">
            {selectedRegion || "Filter by Region"}
            <svg
              className="w-[10px] h-[10px] dark:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              {/*<!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
          {isDropdownOpen && (
            <ul className="absolute left-0 mt-4 w-full bg-white rounded shadow-md px-4 py-2 text-left dark:bg-dark-elements dark:text-white-text-elements">
              {["Africa", "Americas", "Asia", "Europe", "Oceania"].map(
                (region) => (
                  <li
                    key={region}
                    onClick={() => handleRegionSelect(region)}
                    className="p-1 cursor-pointer"
                  >
                    {region}
                  </li>
                )
              )}
            </ul>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,265px)] gap-y-8 gap-x-8 justify-between">
        {filteredCountries.map((country) => (
          <Link
            className="w-[265px] mx-auto sm:mx-0"
            key={country.cca3}
            to={`/${country.ccn3}`}
          >
            <CountryCard country={country} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
