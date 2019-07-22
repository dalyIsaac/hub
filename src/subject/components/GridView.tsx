import React, { useEffect, useState, useCallback } from "react";
import { List, IRectangle, ScrollToMode } from "office-ui-fabric-react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { Item, getItems } from "../model/Subject";
import SubjectComponent from "./Subject";
import { APPBAR_HEIGHT } from "../../AppBar";
import { APP_COMMAND_BAR_HEIGHT } from "../../AppCommandBar/Common";
import { isUndefined } from "lodash";

const ROWS_PER_PAGE = 3;
const ROW_HEIGHT = 603;
export const MIN_COL_WIDTH = 400;

const theme = getTheme();
// const sidebarListHeight = `100vh - ${APPBAR_HEIGHT + 330 + APP_COMMAND_BAR_HEIGHT}px`;
const styles = mergeStyleSets({
  wrapper: {
    display: "grid",
    gridTemplateColumns: `auto ${MIN_COL_WIDTH}px`,
  },
  grid: {
    height: `calc(100vh - ${APPBAR_HEIGHT}px - ${APP_COMMAND_BAR_HEIGHT}px)`,
    overflow: "auto",
    position: "relative",
  },
  tile: {
    textAlign: "center",
    position: "relative",
    float: "left",
  },
  padding: {
    padding: 5,
  },
  contents: {
    border: "1px solid " + theme.palette.neutralTertiary,
    borderRadius: 4,
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
  },
  sidebar: {
    gridColumn: "2",
    border: "1px solid " + theme.palette.white,
    borderRadius: 4,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
});

const getPageHeight = (): number => ROW_HEIGHT * ROWS_PER_PAGE;

const getDiffIndex = (oldOrder: string[], newOrder: string[]): number => {
  for (let i = 0; i < newOrder.length; i++) {
    const newEl = newOrder[i];
    const oldEl = oldOrder[i];

    if (newEl !== oldEl) {
      return i;
    }
  }
  return 0;
};

interface GridViewProps {
  id?: string;
}

export default function GridView({ id }: GridViewProps): JSX.Element {
  const columnCount = useRef(0);
  const columnWidth = useRef(0);
  const gridRef: React.MutableRefObject<List | null> = useRef(null);

  const state = useSelector((state: State) => state.subjects);
  const { dict: subjects } = state;

  const order =
    !isUndefined(id) && id in subjects
      ? subjects[id].children.order
      : state.order.order;

  const [orderState, setOrderState] = useState(order);

  useEffect((): void => {
    if (id) {
      document.title = "hub - " + subjects[id].name;
    } else {
      document.title = "hub";
    }
  }, [id, subjects]);

  // Scrolls to newly added subjects
  useEffect((): void => {
    if (gridRef.current && orderState !== order && order.length > 0) {
      // Gets the index to scroll to
      const index = getDiffIndex(orderState, order);

      // Scroll to the index if either:
      // - the new index doesn't have a parent
      // - the new index has a parent, which matches match.param.id
      const s = subjects[order[index]];
      if (s.parents.size === 0 || s.parents.has(id!)) {
        gridRef.current.scrollToIndex(
          index,
          (): number => ROW_HEIGHT,
          ScrollToMode.top,
        );
      }

      setOrderState(order);
    }
  }, [order, orderState, id, subjects]);

  const renderCell = useCallback((props?: Item): JSX.Element | undefined => {
    if (!props) {
      return;
    }

    const { id, subject } = props;
    return (
      <div
        className={styles.tile}
        data-is-focusable={true}
        key={id}
        style={{
          height: ROW_HEIGHT,
          width: 100 / columnCount.current + "%",
        }}
      >
        <div className={styles.padding}>
          <div className={styles.contents}>
            <SubjectComponent
              subject={subject}
              id={id}
              listHeight={"260px"}
              showOpenButton={true}
            />
          </div>
        </div>
      </div>
    );
  }, []);

  const getItemCountForPage = useCallback(
    (itemIndex?: number, surfaceRect?: IRectangle): number => {
      if (itemIndex === 0 && surfaceRect) {
        const columns = surfaceRect.width / MIN_COL_WIDTH;
        columnCount.current =
          surfaceRect.width > MIN_COL_WIDTH * 1.5
            ? Math.ceil(columns)
            : Math.floor(columns);
        columnWidth.current = Math.floor(
          surfaceRect.width / columnCount.current,
        );
      }

      return columnCount.current * ROWS_PER_PAGE;
    },
    [],
  );

  const items = getItems(subjects, order, { parent: id });

  return (
    <List
      ref={gridRef}
      className={styles.grid}
      items={items}
      getItemCountForPage={getItemCountForPage}
      getPageHeight={getPageHeight}
      renderedWindowsAhead={4}
      onRenderCell={renderCell}
    />
  );
}
