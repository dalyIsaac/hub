import * as React from "react";
import { FocusZone } from "office-ui-fabric-react/lib/FocusZone";
import { List } from "office-ui-fabric-react/lib/List";
import { IRectangle } from "office-ui-fabric-react/lib/Utilities";
import { mergeStyleSets } from "@uifabric/styling";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { State } from "../reducer";
import { Subject } from "./model";

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;

const classNames = mergeStyleSets({
  list: {
    overflow: "hidden",
    position: "relative"
  },
  tile: {
    textAlign: "center",
    outline: "none",
    position: "relative",
    float: "left",
    backgroundColor: "cyan",
    selectors: {
      "&:focus": {
        outline: "none"
      },
      "&:focus:after": {
        content: '""',
        position: "absolute",
        right: 4,
        left: 4,
        top: 4,
        bottom: 4,
        border: "1px solid white",
        outline: "2px solid black"
      }
    }
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
    backgroundColor: "yellow",
    width: "100%",
    height: "100%"
  }
});

export default function(): JSX.Element {
  const columnCount = useRef(0);
  const columnWidth = useRef(0);
  const rowHeight = useRef(0);

  const subjects = useSelector((state: State) => state.subjects);

  const renderCell = (item?: Subject, index?: number): JSX.Element => (
    <div
      className={classNames.tile}
      data-is-focusable={true}
      style={{
        width: 100 / columnCount.current + "%"
      }}
    >
      <div className={classNames.sizer}>
        <div className={classNames.padder}>
          <div className={classNames.contents}>
            <p>{item!.name}</p>
            <p>{item!.description}</p>
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
      columnCount.current = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      columnWidth.current = Math.floor(surfaceRect.width / columnCount.current);
      rowHeight.current = columnWidth.current;
    }

    return columnCount.current * ROWS_PER_PAGE;
  };

  return (
    <FocusZone>
      <List
        className={classNames.list}
        items={Object.values(subjects)}
        getItemCountForPage={getItemCountForPage}
        getPageHeight={getPageHeight}
        renderedWindowsAhead={4}
        onRenderCell={renderCell}
      />
    </FocusZone>
  );
}
