import LazyLoadImage from "./LazyLoadImage";
import { CountryCardProps } from "../types/types";

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="overflow-hidden rounded-lg dark:shadow-md h-[330px] dark:bg-dark-elements dark:text-white-text-elements">
      <LazyLoadImage
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        className="w-full h-36 object-fill"
      />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3">{country.name.common}</h2>
        <p className="mb-1">
          <span className="font-bold">Population</span>:{" "}
          {country.population.toLocaleString()}
        </p>
        <p className="mb-1">
          <span className="font-bold">Region</span>: {country.region}
        </p>
        <p className="mb-1">
          <span className="font-bold">Capital</span>:{" "}
          {country.capital?.join(", ")}
        </p>
      </div>
    </div>
  );
}
