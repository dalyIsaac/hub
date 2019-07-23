import React from "react";
import { Route } from "react-router";
import AppBar from "./AppBar";
import AppCommandBar from "./AppCommandBar/AppCommandBar";
import ResponsiveGridView from "./subject/components/ResponsiveGridView";
import Home from "./Home";
import { homeComponentURLs, gridComponentURLs } from "./Routes";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <AppBar />
      <Route component={AppCommandBar} />
      <Route path={homeComponentURLs} component={Home} />
      <Route path={gridComponentURLs} component={ResponsiveGridView} />
    </div>
  );
};

export default App;
