import React from "react";
import { Route } from "react-router";
import AppBar from "./AppBar";
import AppCommandBar from "./AppCommandBar/AppCommandBar";
import ResponsiveGridView from "./subject/components/ResponsiveGridView";
import { subjectPath } from "./Routing";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <AppBar />
      <Route path={subjectPath} component={AppCommandBar} />
      <Route path={subjectPath} component={ResponsiveGridView} />
    </div>
  );
};

export default App;
