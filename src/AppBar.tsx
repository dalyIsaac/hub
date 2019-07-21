import React from "react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { Text } from "office-ui-fabric-react";
import { Link } from "react-router-dom";

export const APPBAR_HEIGHT = 48;

const theme = getTheme();
const styles = mergeStyleSets({
  appBar: {
    alignItems: "center",
    backgroundColor: theme.palette.themePrimary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: "grid",
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
  title: {
    paddingLeft: 24,
  },
});

export default function AppBar(): JSX.Element {
  return (
    <div className={styles.appBar}>
      <Link to={"/"} className={styles.link}>
        <Text className={styles.title} variant="xLarge">
          hub
        </Text>
      </Link>
    </div>
  );
}
