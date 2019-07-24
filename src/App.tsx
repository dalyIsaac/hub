import React from "react";
import { Route, Switch, Redirect } from "react-router";
import AppBar from "./AppBar";
import AppCommandBar from "./AppCommandBar/AppCommandBar";
import ResponsiveGridView from "./subject/components/ResponsiveGridView";
import { AllPaths, subjectBase, Paths } from "./Routing";
import SearchResults from "./Search/SearchResults";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Route path={AllPaths} component={AppBar} />
      <Route path={Paths.subject} component={AppCommandBar} />
      <Switch>
        <Route path={Paths.subject} component={ResponsiveGridView} />
        <Route path={Paths.search} component={SearchResults} />
        <Redirect to={subjectBase} />
      </Switch>
    </div>
  );
};

export default App;
