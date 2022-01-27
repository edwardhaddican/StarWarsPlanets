import axios from "axios";

const BASE = "http://swapi.dev/api";

export async function getAllPlanets() {
  try {
    const { data } = axios.get(`${BASE}/planets`);
    console.log(data, "all planets");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSinglePlanet(id) {
  try {
    const { data } = axios.get(`${BASE}/planets/${id}`);
    console.log(data, "single planet");
    return data;
  } catch (error) {
    throw error;
  }
}
