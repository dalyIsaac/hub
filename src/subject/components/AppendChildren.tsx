import React, { useState, useRef, useCallback } from "react";
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
import SimpleListView from "./SimpleListView";
import AppendChildrenListItem from "./ListItem/AppendChildrenListItem";
import { useDispatch } from "react-redux";
import { createSubject } from "../model/Create";
import { border, gridTemplateColumns } from "./ListItem/ListItemBase";

export const AppendChildrenHeight = 32;
const panelHeaderHeight = 115;

const theme = getTheme();
const styles = mergeStyleSets({
  wrapper: {
    border,
    borderRadius: 2,
    display: "grid",
    gridTemplateColumns,
    marginBottom: 1,
    marginTop: 1,
  },
  button: {
    alignItems: "center",
    background: theme.palette.white,
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    height: AppendChildrenHeight,
    outline: "none",
    padding: 0,
    selectors: {
      "&:active": {
        filter: "brightness(80%)",
        outline: "none",
      },
      "&:hover": {
        filter: "brightness(90%)",
        outline: "none",
      },
    },
  },
  divider: {
    background: theme.palette.neutralTertiary,
    gridColumn: "2",
    marginBottom: 8,
    marginTop: 8,
    width: 1,
  },
  icon: {
    fontSize: 12,
    margin: 8,
    paddingLeft: 4,
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

  const dispatch = useDispatch();
  const [panelVisible, setPanelVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const hidePanel = useCallback((): void => setPanelVisible(false), []);
  const showPanel = useCallback((): void => setPanelVisible(true), []);
  const toggleMenu = useCallback((): void => setMenuVisible(!menuVisible), [
    menuVisible,
  ]);
  const hideMenu = useCallback((): void => setMenuVisible(false), []);

  const addChild = useCallback((): void => {
    dispatch(createSubject({ parent }));
  }, [dispatch, parent]);

  const contextMenuItems: IContextualMenuItem[] = [
    {
      iconProps: {
        iconName: "ChildOf",
      },
      key: "appendChildren",
      onClick: showPanel,
      text: "Append child subject",
    },
  ];

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <button
          className={styles.button}
          style={{ gridColumn: 1 }}
          onClick={addChild}
        >
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
        <SimpleListView
          subjectId={parent}
          notifyNoChildren={true}
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
