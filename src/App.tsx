import { AllPaths, Paths } from "./Routing";
import { Redirect, Route, Switch } from "react-router";

import AppBar from "./AppBar";
import React from "react";
import SearchResults from "./Search/SearchResults";
import SubjectView from "./subject/components/SubjectView";
import View from "./views/components/View";
import ViewsNav from "./views/components/ViewsNav";
import { mergeStyleSets } from "@uifabric/styling";
import { subjectBase } from "./subject/Routing";

const styles = mergeStyleSets({
  main: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
  },
});

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Route path={AllPaths} component={AppBar} />
      <div className={styles.wrapper}>
        <Route path={AllPaths} component={ViewsNav} />
        <div className={styles.main}>
          <Switch>
            <Route path={Paths.subject} component={SubjectView} />
            <Route path={Paths.search} component={SearchResults} />
            <Route path={Paths.view} component={View} />
            <Redirect to={subjectBase} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
