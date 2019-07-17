import React from "react";
import { List, IRectangle } from "office-ui-fabric-react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { Item, getItems } from "../model/Subject";
import SubjectComponent from "./Subject";
import { Redirect } from "react-router";
import { APPBAR_HEIGHT } from "../../AppBar";
import { RouteIdProps } from "../../Routing";
import { APP_COMMAND_BAR_HEIGHT } from "../../AppCommandBar";

const ROWS_PER_PAGE = 3;
const ROW_HEIGHT = 603;
const MIN_COL_WIDTH = 400;

const theme = getTheme();
const sidebarListHeight = `calc(100vh-${APPBAR_HEIGHT}px-303px-${APP_COMMAND_BAR_HEIGHT}px)`;
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
    padding: 5,
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
});

const getPageHeight = (): number => ROW_HEIGHT * ROWS_PER_PAGE;

export default function({ match }: RouteIdProps): JSX.Element {
  const columnCount = useRef(0);
  const columnWidth = useRef(0);

  const subjects = useSelector((state: State) => state.subjects);
  const renderCell = (props?: Item): JSX.Element | undefined => {
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
          width: 100 / columnCount.current + "%",
          height: ROW_HEIGHT,
        }}
      >
        <div className={styles.padding}>
          <div className={styles.contents}>
            <SubjectComponent subject={subject} id={id} listHeight={260} />
          </div>
        </div>
      </div>
    );
  };

  const getItemCountForPage = (
    itemIndex?: number,
    surfaceRect?: IRectangle,
  ): number => {
    if (itemIndex === 0 && surfaceRect) {
      columnCount.current = Math.ceil(surfaceRect.width / MIN_COL_WIDTH);
      columnWidth.current = Math.floor(surfaceRect.width / columnCount.current);
    }

    return columnCount.current * ROWS_PER_PAGE;
  };

  let items: Item[];
  try {
    items = getItems(subjects, match.params.id, {
      separateCompletedItems: true,
    });
  } catch (error) {
    return <Redirect to="/" />;
  }

  let sidebar = null;
  if (match.params.id !== undefined) {
    sidebar = (
      <div className={styles.sidebar}>
        <SubjectComponent
          subject={subjects[match.params.id]}
          id={match.params.id}
          listHeight={sidebarListHeight}
        />
      </div>
    );
  }

  const grid = (
    <List
      className={styles.grid}
      items={items}
      getItemCountForPage={getItemCountForPage}
      getPageHeight={getPageHeight}
      renderedWindowsAhead={4}
      onRenderCell={renderCell}
    />
  );

  return sidebar ? (
    <div className={styles.wrapper}>
      {grid}
      {sidebar}
    </div>
  ) : (
    grid
  );
}
