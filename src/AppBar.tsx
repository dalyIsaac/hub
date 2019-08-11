import { AllRouteComponentProps, Paths } from "./Routing";
import React, { useEffect } from "react";
import { getSearchMatch, searchBase } from "./model/Search/Routing";
import { getTheme, mergeStyleSets } from "@uifabric/styling";
import { gotoSubject, subjectBase } from "./model/Subject/Routing";

import { APPBAR_HEIGHT } from "./Common";
import { Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import { State } from "./Reducer";
import { Text } from "office-ui-fabric-react";
import { getDisplay } from "./Display";
import { useSelector } from "react-redux";

const theme = getTheme();
const styles = mergeStyleSets({
  appBar: {
    alignItems: "center",
    backgroundColor: theme.palette.themePrimary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: "grid",
    gridTemplateColumns: "150px minmax(200px, auto) 150px",
    height: APPBAR_HEIGHT,
  },
  link: {
    color: theme.palette.black,
    textDecoration: "none",
    selectors: {
      "&:hover": {
        color: theme.palette.neutralLighter,
        textDecoration: "none",
      },
    },
  },
  searchDropdown: {
    width: 150,
  },
  title: {
    paddingLeft: 24,
  },
});

export default function AppBar(props: AllRouteComponentProps): JSX.Element {
  const display = getDisplay(props.location);

  const { match } = props;
  const { parentId, viewId } = match.params;

  const isSubjects = match.path === Paths.subject || match.path === subjectBase;
  const isSearch = match.path === Paths.search || match.path === searchBase;
  const isViews = match.path === Paths.view && viewId;

  const { subjects, views } = useSelector((state: State) => state);

  // Responsive page title
  useEffect((): void => {
    let path: string | null = null;
    let titleChild: string | null = null;
    if (isSubjects) {
      path = "subjects";
      if (parentId) {
        titleChild = subjects.dict[parentId].name;
      }
    } else if (isSearch) {
      const [param, query] = getSearchMatch(match);
      path = "search/" + param;
      titleChild = query;
    } else if (isViews) {
      if (viewId) {
        path = "views";
        titleChild = views.dict[viewId].name;
      }
    }

    if (path) {
      if (titleChild) {
        document.title = `hub/${path}: ${titleChild}`;
      } else {
        document.title = `hub/${path}`;
      }
    } else {
      document.title = `hub`;
    }
  }, [
    isSubjects,
    parentId,
    subjects.dict,
    isSearch,
    match,
    isViews,
    viewId,
    views.dict,
  ]);

  return (
    <div className={styles.appBar}>
      <Link to={gotoSubject(display)} className={styles.link}>
        <Text className={styles.title} variant="xLarge">
          hub
        </Text>
      </Link>

      <SearchBar {...props} />

      <div></div>
    </div>
  );
}
