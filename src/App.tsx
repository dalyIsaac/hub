import React from "react";
import GridView from "./subject/components/GridView";
import { Route } from "react-router";
import AppBar from "./AppBar";

const App: React.FC = () => {
  return (
    <div>
      <Route path="/:id?" component={AppBar} />
      <Route path="/:id?" component={GridView} />
    </div>
  );
};

export default App;
