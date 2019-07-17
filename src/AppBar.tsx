import React from "react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { Text } from "office-ui-fabric-react";
import { Link } from "react-router-dom";

export const APPBAR_HEIGHT = 48;

const theme = getTheme();
const styles = mergeStyleSets({
  appBar: {
    backgroundColor: theme.palette.themePrimary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    height: APPBAR_HEIGHT,
    display: "grid",
    alignItems: "center",
  },
  link: {
    color: theme.palette.black,
    textDecoration: "none",
    selectors: {
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.neutralLighter,
      },
    },
  },
  title: {
    paddingLeft: 24,
  },
});

export default function(): JSX.Element {
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
