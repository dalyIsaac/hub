import React from "react";
import GridView from "./subject/components/GridView";
import { Route } from "react-router";
import AppBar from "./AppBar";
import AppCommandBar from "./AppCommandBar";

const App: React.FC = () => {
  return (
    <div>
      <AppBar />
      <Route path="/:id?" component={AppCommandBar} />
      <Route path="/:id?" component={GridView} />
    </div>
  );
};

export default App;
