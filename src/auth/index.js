export function storePlanets(planets) {
  localStorage.setItem('planets', JSON.stringify(planets));
}

export function getPlanets() {
  const allPlanets = JSON.parse(localStorage.getItem('planets'));
  return allPlanets;
}

