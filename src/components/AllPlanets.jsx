import React from "react";
import { Loading } from "./";

const AllPlanets = ({ allPlanets, isLoading }) => {
  console.log(allPlanets[0], "in all planets");

  function findPercentageOfWater(surfaceWater, diameter) {
    // console.log(surfaceWater, diameter, 'water')
    const percentOfSurfaceWater = surfaceWater / 100;
    // console.log(percentOfSurfaceWater, "percent");
    const radius = diameter / 2;
    // console.log(diameter, radius, "rad");
    const totalAreaOfPlanet = 4 * Math.PI * Math.pow(radius, 2);

    // console.log(totalAreaOfPlanet, "total area");
    const areaCoveredInWater = Math.round(
      totalAreaOfPlanet * percentOfSurfaceWater
    );
    // console.log(areaCoveredInWater, "areaCoveredInWater");

    if (areaCoveredInWater == NaN) {
      return "?";
    } else {
      return areaCoveredInWater;
    }
  }

  return (
    <div className="">
      {isLoading ? <Loading /> : null}
      <table>
        <thead>
          <tr>
            <th>Planet</th>
            <th>Climate</th>
            <th># of Residents</th>
            <th>Terrain</th>
            <th>Population</th>
            <th>Water Cover</th>
          </tr>
        </thead>
        <tbody>
          {allPlanets && allPlanets.length
            ? allPlanets.map((planet) => {
                return (
                  <tr key={planet.url}>
                    <td>{planet.name}</td>
                    <td>
                      {planet.climate === "unknown" ? "?" : planet.climate}
                    </td>

                    <td>
                      {planet.residents === "unknown"
                        ? "?"
                        : planet.residents.length}
                    </td>

                    <td>
                      {planet.terrain === "unknown" ? "?" : planet.terrain}
                    </td>
                    <td>
                      {planet.population === "unknown"
                        ? "?"
                        : planet.population}
                    </td>
                    <td>
                      {planet.surface_water === "unknown" ||
                      planet.diameter === "unknown"
                        ? "?"
                        : findPercentageOfWater(
                            planet.surface_water,
                            planet.diameter
                          )}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default AllPlanets;
