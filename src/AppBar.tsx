import React from "react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import {
  Text,
  SearchBox,
  Dropdown,
  IDropdownOption,
} from "office-ui-fabric-react";
import { Link } from "react-router-dom";

export const APPBAR_HEIGHT = 48;

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

export default function AppBar(): JSX.Element {
  const options: IDropdownOption[] = [
    { key: "name", text: "Name" },
    { key: "description", text: "Description" },
    { key: "childName", text: "Child name" },
    { key: "childDescription", text: "Child description" },
  ];

  return (
    <div className={styles.appBar}>
      <Link to={"/"} className={styles.link}>
        <Text className={styles.title} variant="xLarge">
          hub
        </Text>
      </Link>

      <div className={styles.search}>
        <Dropdown
          options={options}
          defaultSelectedKey="name"
          className={styles.searchDropdown}
        />
        <SearchBox placeholder="Search" />
      </div>

      <div></div>
    </div>
  );
}
