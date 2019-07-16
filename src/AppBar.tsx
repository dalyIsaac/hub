import React from "react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { Text } from "office-ui-fabric-react";

export const APPBAR_HEIGHT = 48;

const theme = getTheme();
const styles = mergeStyleSets({
  appBar: {
    backgroundColor: theme.palette.themePrimary,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    height: APPBAR_HEIGHT,
    color: theme.palette.neutralLighter,
    display: "grid",
    alignItems: "center",
  },
  title: {
    paddingLeft: 24,
  },
});

export default function(): JSX.Element {
  return (
    <div className={styles.appBar}>
      <Text className={styles.title} variant="xLarge">
        hub
      </Text>
    </div>
  );
}
