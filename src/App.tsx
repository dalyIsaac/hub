import React from "react";
import { Route, Switch, Redirect } from "react-router";
import AppBar from "./AppBar";
import AppCommandBar from "./AppCommandBar/AppCommandBar";
import SubjectView from "./subject/components/SubjectView";
import { AllPaths, Paths } from "./Routing";
import SearchResults from "./Search/SearchResults";
import { mergeStyleSets } from "@uifabric/styling";
import ViewsNav from "./views/components/ViewsNav";
import { subjectBase } from "./subject/Routing";
import View from "./views/components/View";

const styles = mergeStyleSets({
  main: {
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
      <Route path={AllPaths} component={AppCommandBar} />
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
