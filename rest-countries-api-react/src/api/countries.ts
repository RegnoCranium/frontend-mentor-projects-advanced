const API_BASE_URL = "https://restcountries.com/v3.1";

export async function fetchAllCountries() {
  const response = await fetch(
    `${API_BASE_URL}/all?fields=name,population,region,capital,flags,cca3,ccn3`
  );
  return response.json();
}

export async function fetchCountryByCode(code: string) {
  const response = await fetch(`${API_BASE_URL}/alpha?codes=${code}`);
  return response.json();
}

export async function fetchCountriesByCodes(codes: string[]) {
  const response = await fetch(
    `${API_BASE_URL}/alpha?codes=${codes.join(",")}&fields=name,cca3,ccn3`
  );
  return response.json();
}
