import React from "react";
import { getTheme, mergeStyleSets } from "office-ui-fabric-react";
import { MIN_COL_WIDTH } from "./GridView";

const theme = getTheme();
const styles = mergeStyleSets({
  sidebar: {
    border: "1px solid " + theme.palette.white,
    borderRadius: 4,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    gridColumn: "2",
    zIndex: 10,
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: `auto ${MIN_COL_WIDTH}px`,
  },
});

interface ViewWithSidebarProps {
  viewComponent: JSX.Element;
  sidebarComponent: JSX.Element;
}

export default function ViewWithSidebar({
  viewComponent,
  sidebarComponent,
}: ViewWithSidebarProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      {viewComponent}
      <div className={styles.sidebar}>{sidebarComponent}</div>
    </div>
  );
}
