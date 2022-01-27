import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AllPlanets, SinglePlanet } from "./";
import { getPlanets, storePlanets } from "../auth";

const Main = () => {
  const [allPlanets, setAllPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentError, setCurrentError] = useState(null);

  const fetchAllPlanets = useCallback(async () => {
    try {
      setIsLoading(true);
      const localStoragePlanets = getPlanets();

      if (localStoragePlanets && localStoragePlanets.length) {
        setAllPlanets(localStoragePlanets);
        setIsLoading(false);
      } else {
        const { data } = await axios.get(`http://swapi.dev/api/planets`);

        if (!data.results) {
          setCurrentError(new Error("Failed to Load Data"));
          setIsLoading(false);
        } else {
          const sortedPlanets = data.results.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          setAllPlanets(sortedPlanets);
          storePlanets(sortedPlanets);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setCurrentError(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPlanets();
  }, []);

  return (
    <div className="main_container">
      <h1 className="main_title">The Planets of Star Wars</h1>
      <AllPlanets
        allPlanets={allPlanets}
        isLoading={isLoading}
        currentError={currentError}
      />
    </div>
  );
};

export default Main;
