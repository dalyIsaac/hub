import {
  CommandBarButton,
  getTheme,
  mergeStyleSets,
} from "office-ui-fabric-react";
import React, { useCallback } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { getDisplay, updateDisplay } from "../../Display";

import { BUTTON_HEIGHT } from "./Common";

const theme = getTheme();

export const commandBarStyle = {
  borderBottom: "1px solid " + theme.palette.neutralQuaternary,
  boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  height: BUTTON_HEIGHT,
  margin: 0,
  padding: 0,
  zIndex: 10,
};

const styles = mergeStyleSets({
  leftWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  rightWrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row-reverse",
  },
  wrapper: {
    ...commandBarStyle,
    alignItems: "center",
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
    position: "relative",
  },
});

interface AppCommandBarProps {
  items: JSX.Element[];
  farItems?: JSX.Element[];
}

export default withRouter(function AppCommandBar({
  items,
  farItems,
  location,
  history,
}: AppCommandBarProps & RouteComponentProps) {
  const display = getDisplay(location);

  const toggleView = useCallback((): void => {
    history.push(updateDisplay(location, display === "grid" ? "list" : "grid"));
  }, [display, history, location]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftWrapper}>{items}</div>
      <div className={styles.rightWrapper}>
        {farItems}
        <CommandBarButton
          key="toggleView"
          ariaLabel="Toggle view"
          iconProps={{
            iconName:
              display === "list" ? "BulletedListText" : "GridViewMedium",
          }}
          text={display === "list" ? "List" : "Grid"}
          styles={{
            root: { background: theme.palette.white, height: BUTTON_HEIGHT },
          }}
          menuProps={{
            directionalHintFixed: true,
            items: [
              display === "list"
                ? {
                    iconProps: { iconName: "GridViewMedium" },
                    key: "gridButton",
                    onClick: toggleView,
                    text: "Grid",
                  }
                : {
                    iconProps: { iconName: "BulletedListText" },
                    key: "listButton",
                    onClick: toggleView,
                    text: "List",
                  },
            ],
          }}
        />
      </div>
    </div>
  );
});
