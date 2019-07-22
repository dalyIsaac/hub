import React from "react";
import { Route } from "react-router";
import AppBar from "./AppBar";
import AppCommandBar from "./AppCommandBar/AppCommandBar";
import ResponsiveGridView from "./subject/components/ResponsiveGridView";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <AppBar />
      <Route path="/:id?" component={AppCommandBar} />
      <Route path="/:id?" component={ResponsiveGridView} />
    </div>
  );
};

export default App;
