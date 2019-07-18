import React, { useState, useRef } from "react";
import {
  getTheme,
  mergeStyleSets,
  Icon,
  Text,
  Panel,
  ContextualMenu,
  DirectionalHint,
  IContextualMenuItem,
} from "office-ui-fabric-react";
import ListView from "./ListView";
import AppendChildrenListItem from "./ListItem/AppendChildrenListItem";

export const AppendChildrenHeight = 32;
const panelHeaderHeight = 115;

const theme = getTheme();
const styles = mergeStyleSets({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "auto 1px 32px",
    border: "1px solid " + theme.palette.neutralTertiary,
    borderRadius: 2,
    marginTop: 1,
    marginBottom: 1,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "none",
    background: theme.palette.white,
    padding: 0,
    height: AppendChildrenHeight,
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
  divider: {
    gridColumn: "2",
    background: theme.palette.neutralTertiary,
    width: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  icon: {
    paddingLeft: 4,
    margin: 8,
    fontSize: 12,
    textAlign: "center",
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
  const target = useRef(null);

  const [panelVisible, setPanelVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const hidePanel = () => setPanelVisible(false);
  const showPanel = () => setPanelVisible(true);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const hideMenu = () => setMenuVisible(false);

  const contextMenuItems: IContextualMenuItem[] = [
    {
      key: "appendChildren",
      iconProps: {
        iconName: "ChildOf",
      },
      text: "Append child subject",
      onClick: showPanel,
    },
  ];

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <button className={styles.button} style={{ gridColumn: 1 }}>
          <Icon iconName="Add" className={styles.icon} />
          <Text className={styles.text}>Add child</Text>
        </button>
        <span className={styles.divider} />
        <button
          className={styles.button}
          onClick={toggleMenu}
          ref={target}
          style={{ gridColumn: 3 }}
        >
          <Icon iconName="ChevronDown" style={{ width: "100%" }} />
        </button>
      </div>

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

      {menuVisible ? (
        <ContextualMenu
          isBeakVisible={false}
          onDismiss={hideMenu}
          target={target}
          directionalHint={DirectionalHint.bottomRightEdge}
          items={contextMenuItems}
        />
      ) : null}
    </React.Fragment>
  );
}
