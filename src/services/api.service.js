export async function fetchFlights() {
  const response = await fetch('http://localhost:3000/result');
  const data = await response.json();
  return data.flights;
}
