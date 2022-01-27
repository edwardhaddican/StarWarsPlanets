import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { AllPlanets, SinglePlanet } from "./index";
import { getPlanets, storePlanets } from "../auth";

const Main = () => {
  const [allPlanets, setAllPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAllPlanets() {
    try {
      setIsLoading(true);
      const localStoragePlanets = getPlanets();

      if (localStoragePlanets && localStoragePlanets.length) {
        setAllPlanets(localStoragePlanets);
        setIsLoading(false);
      } else {
        
        const { data } = await axios.get(`http://swapi.dev/api/planets`);

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
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchAllPlanets();
  }, []);

  return (
    <div className="main_container">
      <h1 className="main_title">The Planets of Starwars</h1>
      <Switch>
        <Route
          path="/:id"
          render={() => {
            return <SinglePlanet />;
          }}
        />
        <Route
          path="/"
          render={() => {
            return <AllPlanets allPlanets={allPlanets} isLoading={isLoading} />;
          }}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Main;
