import React from "react";
import { List, IRectangle } from "office-ui-fabric-react";
import { mergeStyleSets, getTheme } from "@uifabric/styling";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { State } from "../../Reducer";
import { Subject, SubjectState } from "../model/Subject";
import SubjectComponent from "./Subject";
import { Redirect } from "react-router";
import { APPBAR_HEIGHT } from "../../AppBar";
import { RouteIdMatch, RouteIdProps } from "../../Routing";
import { APP_COMMAND_BAR_HEIGHT } from "../../AppCommandBar";
import { isUndefined } from "util";

const ROWS_PER_PAGE = 3;
const ROW_HEIGHT = 603;
const MIN_COL_WIDTH = 400;

const theme = getTheme();
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

type Item = [string, Subject<"BaseSubject">];

function comparator(param: keyof Subject, desc = false) {
  const coeff = desc ? -1 : 1;
  return function(a: Item, b: Item): number {
    const aVal = a[1][param];
    const bVal = b[1][param];

    const aDefined = !isUndefined(aVal);
    const bDefined = !isUndefined(bVal);

    if (!aDefined && !bDefined) {
      return 0;
    } else if (aDefined && !bDefined) {
      return coeff * 1;
    } else if (!aDefined && bDefined) {
      return coeff * -1;
    } else if (aVal! < bVal!) {
      return coeff * -1;
    } else if (aVal! > bVal!) {
      return coeff * 1;
    }
    return 0;
  };
}

function getItems(match: RouteIdMatch, subjects: SubjectState): Item[] {
  let items: Item[] = [];
  let completedItems: Item[] = [];

  if (match.params.id !== undefined) {
    if (!(match.params.id in subjects)) {
      throw new Error("Given id is not valid");
    }

    const { id } = match.params;
    const subject = subjects[id];

    for (const childId of subject.children) {
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

  items.sort(comparator("created", true));
  completedItems.sort(comparator("created", true));
  return items.concat(completedItems);
}

const getPageHeight = (): number => ROW_HEIGHT * ROWS_PER_PAGE;

export default function({ match }: RouteIdProps): JSX.Element {
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
        <div className={styles.padding}>
          <div className={styles.contents}>
            <SubjectComponent subject={subject} id={id} listHeight={300} />
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
    items = getItems(match, subjects);
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
          listHeight={`calc(100vh-${APPBAR_HEIGHT}px-303px-${APP_COMMAND_BAR_HEIGHT}px)`}
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
