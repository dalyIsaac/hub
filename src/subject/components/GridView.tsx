import React from "react";
import { List } from "office-ui-fabric-react/lib/List";
import { IRectangle } from "office-ui-fabric-react/lib/Utilities";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { Subject } from "../model/Subject";
import SubjectComponent from "./Subject";
import { match, Redirect } from "react-router";

const ROWS_PER_PAGE = 3;
const ROW_HEIGHT = 600;
const MIN_COL_WIDTH = 400;

const theme = getTheme();
const styles = mergeStyleSets({
  list: {
    overflow: "hidden",
    position: "relative",
  },
  tile: {
    textAlign: "center",
    position: "relative",
    float: "left",
  },
  sizer: {
    paddingBottom: "100%",
  },
  padder: {
    position: "absolute",
    left: 4,
    top: 4,
    right: 4,
    bottom: 4,
  },
  contents: {
    position: "absolute",
    top: 0,
    left: 0,
    outline: "1px solid " + theme.palette.neutralTertiary,
  },
});

interface GridViewProps {
  match: match<{ id?: string }>;
}

type Items = Array<[string, Subject<"BaseSubject">]>;

export default function({ match }: GridViewProps): JSX.Element {
  const columnCount = useRef(0);
  const columnWidth = useRef(0);

  const subjects = useSelector((state: State) => state.subjects);
  const renderCell = (props?: [string, Subject]): JSX.Element | undefined => {
    if (!props) {
      return;
    }

    const [id, subject] = props;
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
        <div className={styles.sizer}>
          <div className={styles.padder}>
            <div className={styles.contents}>
              <SubjectComponent subject={subject} id={id} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getPageHeight = (): number => ROW_HEIGHT * ROWS_PER_PAGE;

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

  let items: Items = [];
  let completedItems: Items = [];

  if (match.params.id !== undefined) {
    if (!(match.params.id in subjects)) {
      return <Redirect to="/" />;
    }

    for (const childId of subjects[match.params.id].children) {
      if (subjects[childId].completed) {
        completedItems.push([childId, subjects[childId]]);
      } else {
        items.push([childId, subjects[childId]]);
      }
    }
  } else {
    for (const entry of Object.entries(subjects)) {
      if (entry[1].completed) {
        completedItems.push(entry);
      } else {
        items.push(entry);
      }
    }
  }

  return (
    <List
      className={styles.list}
      items={items.concat(completedItems)}
      getItemCountForPage={getItemCountForPage}
      getPageHeight={getPageHeight}
      renderedWindowsAhead={4}
      onRenderCell={renderCell}
    />
  );
}
