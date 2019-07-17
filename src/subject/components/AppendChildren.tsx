import React, { useState } from "react";
import {
  getTheme,
  mergeStyleSets,
  Icon,
  Text,
  Panel,
} from "office-ui-fabric-react";

export const AppendChildrenHeight = 32;

const theme = getTheme();
const styles = mergeStyleSets({
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    background: theme.palette.white,
    border: "1px solid " + theme.palette.neutralTertiary,
    borderRadius: 2,
    marginTop: 1,
    marginBottom: 1,
    padding: 0,
    height: AppendChildrenHeight,
    width: "100%",
    cursor: "pointer",
    outline: "none",
    selectors: {
      "&:hover": {
        filter: "brightness(90%)",
        outline: "none",
      },
      "&:active": {
        filter: "brightness(80%)",
        outline: "none",
      },
    },
  },
  icon: {
    paddingLeft: 4,
    margin: 8,
  },
  text: {
    display: "flex",
    flexGrow: 2,
    paddingLeft: 4,
    paddingRight: 8,
  },
});

export default function(): JSX.Element {
  const [panelVisible, setPanelVisible] = useState(false);
  const hidePanel = () => setPanelVisible(false);
  const showPanel = () => setPanelVisible(true);

  return (
    <React.Fragment>
      <button className={styles.button} onClick={showPanel}>
        <Icon iconName="Add" className={styles.icon} />
        <Text className={styles.text}>Append children</Text>
      </button>
      <Panel
        isOpen={panelVisible}
        isLightDismiss={true}
        headerText="Append Children"
        onDismiss={hidePanel}
      >
        <span>
          Light Dismiss usage is meant for the Contextual Menu on mobile sized
          breakpoints.
        </span>
      </Panel>
    </React.Fragment>
  );
}
