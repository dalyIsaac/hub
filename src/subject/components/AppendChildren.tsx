import {
  ContextualMenu,
  DirectionalHint,
  IContextualMenuItem,
  Icon,
  Panel,
  Text,
  getTheme,
  mergeStyleSets,
} from "office-ui-fabric-react";
import React, { useCallback, useRef, useState } from "react";
import { border, gridTemplateColumns } from "./ListItem/ListItemBase";
import { useDispatch, useSelector } from "react-redux";

import AppendChildrenListItem from "./ListItem/AppendChildrenListItem";
import { PANEL_HEADER_HEIGHT } from "../../Common";
import SimpleListView from "./SimpleListView";
import { State } from "../../Reducer";
import { createSubject } from "../model/CreateSubject";

export const AppendChildrenHeight = 32;

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
      "&:focus": {
        outline: "1px solid " + theme.palette.themePrimary,
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
    dispatch(createSubject({ parentId: parent }));
  }, [dispatch, parent]);

  const { subjects } = useSelector((state: State) => state);

  const contextMenuItems: IContextualMenuItem[] = [
    {
      iconProps: {
        iconName: "RowsChild",
      },
      key: "appendChildren",
      onClick: showPanel,
      text: "Append child subjects",
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
          parentId={parent}
          illegalIds={
            new Set(subjects.dict[parent].children.order.concat(parent))
          }
          order={subjects.order.order}
          notifyNoChildren={true}
          maxHeight={`calc(100vh-${PANEL_HEADER_HEIGHT})`}
          onRenderCell={AppendChildrenListItem}
        />
      </Panel>

      <ContextualMenu
        hidden={!menuVisible}
        isBeakVisible={false}
        onDismiss={hideMenu}
        target={target}
        directionalHint={DirectionalHint.bottomRightEdge}
        items={contextMenuItems}
      />
    </React.Fragment>
  );
}
