import React, { useState } from "react";
import {
  getTheme,
  mergeStyleSets,
  Icon,
  Text,
  Panel,
} from "office-ui-fabric-react";
import ListView from "./ListView";
import AppendChildrenListItem from "./ListItem/AppendChildrenListItem";

export const AppendChildrenHeight = 32;
const panelHeaderHeight = 115;

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

interface AppendChildrenProps {
  parent: string;
}

export default function({ parent }: AppendChildrenProps): JSX.Element {
  const [panelVisible, setPanelVisible] = useState(false);
  const hidePanel = () => setPanelVisible(false);
  const showPanel = () => setPanelVisible(true);

  // TODO: filter out items already included in the parent

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
        <ListView
          subjectId={parent}
          maxHeight={`calc(100vh-${panelHeaderHeight})`}
          onRenderCell={AppendChildrenListItem}
        />
      </Panel>
    </React.Fragment>
  );
}
