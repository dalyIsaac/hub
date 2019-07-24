import React from "react";
import { Route, Switch, Redirect } from "react-router";
import AppBar from "./AppBar";
import AppCommandBar from "./AppCommandBar/AppCommandBar";
import ResponsiveGridView from "./subject/components/ResponsiveGridView";
import { subjectPath, subjectBase, searchPath } from "./Routing";
import SearchResults from "./Search/SearchResults";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <AppBar />
      <Route path={subjectPath} component={AppCommandBar} />
      <Switch>
        <Route path={subjectPath} component={ResponsiveGridView} />
        <Route path={searchPath} component={SearchResults} />
        <Redirect to={subjectBase} />
      </Switch>
    </div>
  );
};

export default App;
