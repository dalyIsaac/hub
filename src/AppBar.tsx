import React from "react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { Text } from "office-ui-fabric-react";
import { Link, RouteComponentProps } from "react-router-dom";
import SearchBar from "./Search/SearchBar";
import { SearchRouteProps, Paths } from "./Routing";
import { APPBAR_HEIGHT } from "./Common";

const theme = getTheme();
const styles = mergeStyleSets({
  appBar: {
    alignItems: "center",
    backgroundColor: theme.palette.themePrimary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: "flex",
    height: APPBAR_HEIGHT,
    justifyContent: "space-between",
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
  search: {
    display: "flex",
    flexDirection: "row",
    width: "calc(100vw / 3)",
  },
  searchDropdown: {
    width: 150,
  },
  title: {
    paddingLeft: 24,
  },
});

export default function AppBar(
  props: RouteComponentProps<SearchRouteProps>,
): JSX.Element {
  return (
    <div className={styles.appBar}>
      <Link to={Paths.base} className={styles.link}>
        <Text className={styles.title} variant="xLarge">
          hub
        </Text>
      </Link>

      <div className={styles.search}>
        <SearchBar {...props} />
      </div>

      <div />
    </div>
  );
}
