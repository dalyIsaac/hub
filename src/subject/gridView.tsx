import * as React from "react";
import { FocusZone } from "office-ui-fabric-react/lib/FocusZone";
import { List } from "office-ui-fabric-react/lib/List";
import { IRectangle } from "office-ui-fabric-react/lib/Utilities";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { State } from "../reducer";
import { Subject } from "./model";
import SubjectComponent from "./subject";

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;
const MIN_COL_WIDTH = 400;

const theme = getTheme();
const styles = mergeStyleSets({
  list: {
    overflow: "hidden",
    position: "relative"
  },
  tile: {
    textAlign: "center",
    outline: "2px solid " + theme.palette.neutralLighterAlt,
    position: "relative",
    float: "left"
  },
  sizer: {
    paddingBottom: "100%"
  },
  padder: {
    position: "absolute",
    left: 4,
    top: 4,
    right: 4,
    bottom: 4
  },
  contents: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: theme.palette.white,
    width: "100%",
    height: "100%"
  }
});

export default function(): JSX.Element {
  const columnCount = useRef(0);
  const columnWidth = useRef(0);
  const rowHeight = useRef(0);

  const subjects = useSelector((state: State) => state.subjects);

  const renderCell = (subject?: Subject, index?: number): JSX.Element => (
    <div
      className={styles.tile}
      data-is-focusable={true}
      style={{
        width: 100 / columnCount.current + "%"
      }}
    >
      <div className={styles.sizer}>
        <div className={styles.padder}>
          <div className={styles.contents}>
            <SubjectComponent subject={subject!} />
          </div>
        </div>
      </div>
    </div>
  );

  const getPageHeight = (): number => rowHeight.current * ROWS_PER_PAGE;

  const getItemCountForPage = (
    itemIndex?: number,
    surfaceRect?: IRectangle
  ): number => {
    if (itemIndex === 0 && surfaceRect) {
      columnCount.current = Math.ceil(surfaceRect.width / MIN_COL_WIDTH);
      columnWidth.current = Math.floor(surfaceRect.width / columnCount.current);
      rowHeight.current = columnWidth.current;
    }

    return columnCount.current * ROWS_PER_PAGE;
  };

  return (
    <List
      className={styles.list}
      items={Object.values(subjects)}
      getItemCountForPage={getItemCountForPage}
      getPageHeight={getPageHeight}
      renderedWindowsAhead={4}
      onRenderCell={renderCell}
    />
  );
}
