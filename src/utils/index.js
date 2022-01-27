export function storePlanets(planets) {
  localStorage.setItem("planets", JSON.stringify(planets));
}

export function getPlanets() {
  const allPlanets = JSON.parse(localStorage.getItem("planets"));
  return allPlanets;
}

// Found this function on stack overflow: https://stackoverflow.com/questions/16637051/adding-space-between-numbers
export function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
