import React from "react";
import GridView from "./subject/components/GridView";
import { Route } from "react-router";

const App: React.FC = () => {
  return (
    <div>
      <Route path="/:id?" component={GridView} />
    </div>
  );
};

export default App;
