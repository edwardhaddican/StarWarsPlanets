import React, { useCallback } from "react";
import { Loader } from "./";

// Found this function on stack overflow: https://stackoverflow.com/questions/16637051/adding-space-between-numbers
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const AllPlanets = ({ allPlanets, isLoading, currentError }) => {
  console.log(allPlanets[0], "in all planets");

  const findPercentageOfWater = useCallback((surfaceWater, diameter) => {
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

    return numberWithSpaces(areaCoveredInWater);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (currentError) {
    return (
      <div>
        <img className="errorMessageImg" src={"/planet.jpeg"} />
        <p className="errorMessage">{currentError.message}</p>
      </div>
    );
  }

  return (
    <div className="">
      <table>
        <thead>
          <tr>
            <th>Planet</th>
            <th>Climate</th>
            <th># of Residents</th>
            <th>Terrain</th>
            <th>Population</th>
            <th>Water Cover (km<sup>2</sup>)</th>
          </tr>
        </thead>
        <tbody>
          {allPlanets && allPlanets.length
            ? allPlanets.map((planet) => {
                return (
                  <tr key={planet.url}>
                    <td>
                      <a
                        href={planet.url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {planet.name === "unknown" ? "?" : planet.name}
                      </a>
                    </td>
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
                        : numberWithSpaces(planet.population)}
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
